import { mockOrderRepository } from '../repositories/mock/MockOrderRepository';
import type { Order, OrderStatus } from '../types/order';

export const orderService = {
  async getAllOrders(): Promise<Order[]> {
    return mockOrderRepository.getAll();
  },

  async getOrderById(id: string): Promise<Order | null> {
    return mockOrderRepository.getById(id);
  },

  async createOrder(orderData: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    return mockOrderRepository.create(orderData);
  },

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    return mockOrderRepository.updateStatus(id, status);
  },
};

