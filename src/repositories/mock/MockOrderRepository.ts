import type { Order, OrderStatus } from '../../types/order';
import type { OrderRepository } from '../interfaces/OrderRepository';
import { mockOrders } from '../../data/mockOrders';

const STORAGE_KEY = 'gg_mock_orders_v3';

export class MockOrderRepository implements OrderRepository {
  private load(): Order[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Failed to load mock orders:', e);
    }
    this.save(mockOrders);
    return mockOrders;
  }

  private save(orders: Order[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.warn('Failed to save mock orders:', e);
    }
  }

  async getAll(): Promise<Order[]> {
    return this.load();
  }

  async getById(id: string): Promise<Order | null> {
    const list = this.load();
    return list.find((o) => o.id === id) || null;
  }

  async create(orderInput: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    const list = this.load();
    const newOrder: Order = {
      ...orderInput,
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [newOrder, ...list];
    this.save(updated);
    return newOrder;
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    const list = this.load();
    const index = list.findIndex((o) => o.id === id);
    if (index === -1) {
      throw new Error(`Order ${id} not found.`);
    }
    const updatedOrder = { ...list[index], status };
    list[index] = updatedOrder;
    this.save(list);
    return updatedOrder;
  }
}

export const mockOrderRepository = new MockOrderRepository();

