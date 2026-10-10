import type { StockMovement, StockAdjustmentInput } from '../../types/inventory';

export interface InventoryRepository {
  getMovements(): Promise<StockMovement[]>;
  recordAdjustment(input: StockAdjustmentInput, productName: string, previousStock: number): Promise<StockMovement>;
}

