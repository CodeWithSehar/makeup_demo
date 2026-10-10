import { createContext } from 'react';
import type { Product, ProductInput } from '../types/product';
import type { Order, OrderStatus } from '../types/order';
import type { Promotion } from '../types/promotion';
import type { ShopSettings } from '../types/shopSettings';
import type { StockMovement } from '../types/inventory';

export interface AppDataContextType {
  products: Product[];
  publishedProducts: Product[];
  orders: Order[];
  promotions: Promotion[];
  settings: ShopSettings;
  stockMovements: StockMovement[];
  isLoading: boolean;
  refreshData: () => Promise<void>;
  createProduct: (input: ProductInput) => Promise<Product>;
  updateProduct: (id: number, input: Partial<Product>) => Promise<Product>;
  deleteProduct: (id: number) => Promise<boolean>;
  adjustStock: (productId: number, quantityChange: number, reason: string) => Promise<void>;
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<void>;
  updateSettings: (updates: Partial<ShopSettings>) => Promise<void>;
  createPromotion: (promo: Omit<Promotion, 'id'>) => Promise<Promotion>;
  updatePromotion: (id: string, updates: Partial<Promotion>) => Promise<Promotion>;
  deletePromotion: (id: string) => Promise<boolean>;
  resetCatalog: () => Promise<void>;
}

export const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

