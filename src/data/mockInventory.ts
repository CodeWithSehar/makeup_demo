import type { StockMovement } from '../types/inventory';

export const mockStockMovements: StockMovement[] = [
  {
    id: "mov-101",
    productId: 1,
    productName: "Velvet Silk Luminous Foundation",
    quantityChange: 15,
    previousStock: 4,
    newStock: 19,
    reason: "Autumn laboratory shipment received",
    timestamp: "2026-10-05T09:30:00Z"
  },
  {
    id: "mov-102",
    productId: 2,
    productName: "Golden Hour Eyeshadow Palette",
    quantityChange: -3,
    previousStock: 5,
    newStock: 2,
    reason: "WhatsApp boutique orders fulfilled",
    timestamp: "2026-10-07T16:15:00Z"
  },
  {
    id: "mov-103",
    productId: 4,
    productName: "Rose Gold Shimmer Highlighter",
    quantityChange: -8,
    previousStock: 8,
    newStock: 0,
    reason: "Stock depleted by customer bulk orders",
    timestamp: "2026-10-08T11:45:00Z"
  },
  {
    id: "mov-104",
    productId: 10,
    productName: "Jasmine Oud Eau De Parfum",
    quantityChange: 10,
    previousStock: 2,
    newStock: 12,
    reason: "Restock from Grasse distributor",
    timestamp: "2026-10-09T14:00:00Z"
  }
];

