import type { Order, OrderStatus } from '../../types/order';

export interface OrderRepository {
  getAll(): Promise<Order[]>;
  getById(id: string): Promise<Order | null>;
  create(order: Omit<Order, 'id' | 'createdAt'>): Promise<Order>;
  updateStatus(id: string, status: OrderStatus): Promise<Order>;
}

