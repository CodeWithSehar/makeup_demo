import type { StockMovement, StockAdjustmentInput } from '../../types/inventory';
import type { InventoryRepository } from '../interfaces/InventoryRepository';
import { mockStockMovements } from '../../data/mockInventory';

const STORAGE_KEY = 'gg_mock_movements_v3';

export class MockInventoryRepository implements InventoryRepository {
  private load(): StockMovement[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Failed to load inventory movements:', e);
    }
    this.save(mockStockMovements);
    return mockStockMovements;
  }

  private save(list: StockMovement[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn('Failed to save inventory movements:', e);
    }
  }

  async getMovements(): Promise<StockMovement[]> {
    return this.load();
  }

  async recordAdjustment(
    input: StockAdjustmentInput,
    productName: string,
    previousStock: number
  ): Promise<StockMovement> {
    const list = this.load();
    const movement: StockMovement = {
      id: `mov-${Date.now()}`,
      productId: input.productId,
      productName,
      quantityChange: input.quantityChange,
      previousStock,
      newStock: Math.max(0, previousStock + input.quantityChange),
      reason: input.reason,
      timestamp: new Date().toISOString(),
    };
    const updated = [movement, ...list];
    this.save(updated);
    return movement;
  }
}

export const mockInventoryRepository = new MockInventoryRepository();

