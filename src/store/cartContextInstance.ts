import { createContext } from 'react';
import type { CartItem, Product, Promotion } from '../types';

export interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number) => { success: boolean; message: string };
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  appliedCoupon: Promotion | null;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  cartCount: number;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  totalPayable: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

