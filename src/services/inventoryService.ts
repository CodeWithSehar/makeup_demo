import { mockProductRepository } from '../repositories/mock/MockProductRepository';
import { mockInventoryRepository } from '../repositories/mock/MockInventoryRepository';
import type { StockMovement, StockAdjustmentInput } from '../types/inventory';

export const inventoryService = {
  async getMovements(): Promise<StockMovement[]> {
    return mockInventoryRepository.getMovements();
  },

  async adjustStock(input: StockAdjustmentInput): Promise<{ newStock: number; movement: StockMovement }> {
    const product = await mockProductRepository.getById(input.productId);
    if (!product) {
      throw new Error(`Product ${input.productId} not found.`);
    }

    const previousStock = product.stock;
    const newStock = Math.max(0, previousStock + input.quantityChange);

    // Update product stock
    await mockProductRepository.update(product.id, {
      stock: newStock,
      inStock: newStock > 0,
    });

    // Record audit movement log
    const movement = await mockInventoryRepository.recordAdjustment(
      input,
      product.name,
      previousStock
    );

    return { newStock, movement };
  },

  async getLowStockAlerts(threshold = 3) {
    const products = await mockProductRepository.getAll();
    return products.filter((p) => p.stock <= threshold);
  },
};

