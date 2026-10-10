import React, { useState } from 'react';
import type { Product, HeroConfig } from '../types';
import type { Coupon } from './coupons';
import { StoreContext } from './storeContextInstance';
import { useAppData } from '../store/useAppData';
import { useCart } from '../store/useCart';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const appData = useAppData();
  const cartCtx = useCart();
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const heroConfig: HeroConfig = {
    badgeText: appData.settings.hero.badgeText,
    headline: appData.settings.hero.headline,
    subheadline: appData.settings.hero.subheadline,
    promoCode: appData.settings.hero.promoCode,
    promoDiscountPercent: appData.settings.hero.promoDiscountPercent,
    heroImageUrl: appData.settings.hero.heroImageUrl,
  };

  const appliedCoupon: Coupon | null = cartCtx.appliedCoupon
    ? {
        code: cartCtx.appliedCoupon.code,
        discountPercentage: cartCtx.appliedCoupon.discountPercentage,
        description: cartCtx.appliedCoupon.description,
        minOrder: cartCtx.appliedCoupon.minOrderAmount,
      }
    : null;

  const updateProduct = (updated: Product) => {
    appData.updateProduct(updated.id, updated);
  };

  const updateProductStock = (productId: number, newStock: number) => {
    const existing = appData.products.find((p) => p.id === productId);
    const diff = existing ? newStock - existing.stock : newStock;
    appData.adjustStock(productId, diff, 'Stock level manual update');
  };

  const updateHeroConfig = (newConfig: HeroConfig) => {
    appData.updateSettings({
      hero: {
        ...appData.settings.hero,
        ...newConfig,
      },
    });
  };

  const resetToDefaultCatalog = () => {
    appData.resetCatalog();
  };

  return (
    <StoreContext.Provider
      value={{
        products: appData.publishedProducts,
        heroConfig,
        cart: cartCtx.cart,
        isCartOpen: cartCtx.isCartOpen,
        isAdminOpen,
        appliedCoupon,
        setIsCartOpen: cartCtx.setIsCartOpen,
        setIsAdminOpen,
        addToCart: cartCtx.addToCart,
        removeFromCart: cartCtx.removeFromCart,
        updateCartQuantity: cartCtx.updateQuantity,
        clearCart: cartCtx.clearCart,
        applyCoupon: async (code: string) => {
          return await cartCtx.applyCoupon(code);
        },
        removeCoupon: cartCtx.removeCoupon,
        cartCount: cartCtx.cartCount,
        subtotal: cartCtx.subtotal,
        discount: cartCtx.discount,
        deliveryFee: cartCtx.deliveryFee,
        totalPayable: cartCtx.totalPayable,
        updateProduct,
        updateProductStock,
        updateHeroConfig,
        resetToDefaultCatalog,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
