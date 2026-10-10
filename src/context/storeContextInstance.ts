import { createContext, useContext } from 'react';
import type { Product, CartItem, HeroConfig } from '../types';
import type { Coupon } from './coupons';

export interface StoreContextType {
  products: Product[];
  heroConfig: HeroConfig;
  cart: CartItem[];
  isCartOpen: boolean;
  isAdminOpen: boolean;
  appliedCoupon: Coupon | null;
  setIsCartOpen: (open: boolean) => void;
  setIsAdminOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number) => { success: boolean; message: string };
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  cartCount: number;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  totalPayable: number;
  updateProduct: (updated: Product) => void;
  updateProductStock: (productId: number, newStock: number) => void;
  updateHeroConfig: (newConfig: HeroConfig) => void;
  resetToDefaultCatalog: () => void;
}

export const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
