export type StockMovementType = 'restock' | 'sale' | 'adjustment' | 'return';

export interface StockMovement {
  id: string;
  productId: number;
  productName: string;
  quantityChange: number; // positive or negative
  previousStock: number;
  newStock: number;
  reason: string;
  timestamp: string;
}

export interface StockAdjustmentInput {
  productId: number;
  quantityChange: number;
  reason: string;
}

