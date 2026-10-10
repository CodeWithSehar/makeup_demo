import React, { useState, useEffect, useMemo } from 'react';
import type { CartItem, Product, Promotion } from '../types';
import { useAppData } from './useAppData';
import { promotionService } from '../services/promotionService';
import { CartContext } from './cartContextInstance';

const CART_STORAGE_KEY = 'gg_cart_session_v3';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { settings, products } = useAppData();

  const [rawCart, setRawCart] = useState<CartItem[]>(() => {
    try {
      const data = localStorage.getItem(CART_STORAGE_KEY);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Promotion | null>(null);

  // Derive cart items with latest product details, clamped stock, and active status
  const syncedCart = useMemo(() => {
    if (products.length === 0) return rawCart;
    return rawCart.map((item) => {
      const latest = products.find((p) => p.id === item.product.id);
      if (latest) {
        return {
          product: latest,
          quantity: Math.min(item.quantity, latest.stock),
        };
      }
      return item;
    });
  }, [rawCart, products]);

  // Sync back to storage whenever syncedCart changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(syncedCart));
    } catch {
      // fallback
    }
  }, [syncedCart]);

  const addToCart = (product: Product, quantity = 1) => {
    if (product.stock <= 0) {
      return { success: false, message: `${product.name} is out of stock.` };
    }

    setRawCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        const nextQty = Math.min(product.stock, existing.quantity + quantity);
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: nextQty } : item
        );
      }
      return [...prev, { product, quantity: Math.min(product.stock, quantity) }];
    });

    return { success: true, message: `Added ${product.name} to cart.` };
  };

  const removeFromCart = (productId: number) => {
    setRawCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setRawCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const clamped = Math.min(item.product.stock, Math.min(20, quantity));
          return { ...item, quantity: clamped };
        }
        return item;
      })
    );
  };

  const clearCart = () => setRawCart([]);

  const subtotal = useMemo(() => {
    return syncedCart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [syncedCart]);

  const applyCoupon = async (code: string) => {
    const res = await promotionService.validateCoupon(code, subtotal);
    if (!res.valid) {
      return { success: false, message: res.message };
    }
    const promo = await promotionService.getAllPromotions();
    const found = promo.find((p) => p.code.toUpperCase() === code.trim().toUpperCase());
    if (found) {
      setAppliedCoupon(found);
    }
    return { success: true, message: res.message };
  };

  const removeCoupon = () => setAppliedCoupon(null);

  const discount = useMemo(() => {
    if (!appliedCoupon) return 0;
    return Math.round((subtotal * appliedCoupon.discountPercentage) / 100);
  }, [subtotal, appliedCoupon]);

  const deliveryFee = useMemo(() => {
    if (syncedCart.length === 0) return 0;
    const threshold = settings.freeDeliveryThreshold || 5000;
    const standardFee = settings.standardDeliveryFee || 250;
    return subtotal >= threshold ? 0 : standardFee;
  }, [subtotal, syncedCart.length, settings]);

  const totalPayable = useMemo(() => {
    if (syncedCart.length === 0) return 0;
    return Math.max(0, subtotal - discount + deliveryFee);
  }, [subtotal, discount, deliveryFee, syncedCart.length]);

  const cartCount = useMemo(() => {
    return syncedCart.reduce((total, item) => total + item.quantity, 0);
  }, [syncedCart]);

  return (
    <CartContext.Provider
      value={{
        cart: syncedCart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        cartCount,
        subtotal,
        discount,
        deliveryFee,
        totalPayable,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
