import { mockProductRepository } from '../repositories/mock/MockProductRepository';
import type { Product, ProductInput } from '../types/product';

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    return mockProductRepository.getAll();
  },

  async getPublishedProducts(): Promise<Product[]> {
    return mockProductRepository.getPublished();
  },

  async getProductById(id: number): Promise<Product | null> {
    return mockProductRepository.getById(id);
  },

  async createProduct(input: ProductInput): Promise<Product> {
    if (!input.name.trim()) throw new Error('Product name is required.');
    if (input.price <= 0) throw new Error('Price must be greater than 0.');
    return mockProductRepository.create(input);
  },

  async updateProduct(id: number, input: Partial<Product>): Promise<Product> {
    return mockProductRepository.update(id, input);
  },

  async toggleProductStatus(id: number, currentStatus?: string): Promise<Product> {
    const nextStatus = currentStatus === 'draft' ? 'published' : 'draft';
    return mockProductRepository.update(id, { status: nextStatus });
  },

  async deleteProduct(id: number): Promise<boolean> {
    return mockProductRepository.delete(id);
  },

  async resetCatalog(): Promise<Product[]> {
    return mockProductRepository.resetToSeed();
  },
};

