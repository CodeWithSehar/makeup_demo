import React, { useState, useEffect, useCallback } from 'react';
import type { Product, ProductInput } from '../types/product';
import type { Order, OrderStatus } from '../types/order';
import type { Promotion } from '../types/promotion';
import type { ShopSettings } from '../types/shopSettings';
import type { StockMovement } from '../types/inventory';
import { productService } from '../services/productService';
import { inventoryService } from '../services/inventoryService';
import { orderService } from '../services/orderService';
import { promotionService } from '../services/promotionService';
import { settingsService } from '../services/settingsService';
import { AppDataContext } from './appDataContextInstance';

export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);
  const [settings, setSettings] = useState<ShopSettings>({
    shopName: 'Glow & Grace',
    tagline: 'Luxury Cosmetics Boutique',
    whatsappNumber: '923434113012',
    phone: '0343-4113012',
    email: 'concierge@glowandgrace.pk',
    address: 'MM Alam Road, Gulberg III',
    city: 'Lahore, Pakistan',
    freeDeliveryThreshold: 5000,
    standardDeliveryFee: 250,
    hero: {
      badgeText: 'Autumn Luxury Collection 2026',
      headline: 'Radiate Timeless Elegance with Pure Luxury Formulas',
      subheadline: 'Indulge in dermatologist-crafted skincare, silk-finish pigments, and artisanal fragrances formulated to nourish your natural glow.',
      promoCode: 'GLOW20',
      promoDiscountPercent: 20,
      heroImageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85',
    },
    policies: {
      authenticityNotice: '100% Genuine, directly imported.',
      deliveryPromise: '24–48h express nationwide delivery.',
      exchangePolicy: '7-day hassle-free replacement on unopened items.',
    },
    socials: {
      instagram: '@glowandgrace.pk',
      facebook: 'glowandgracecosmetics',
      tiktok: '@glowandgrace',
    },
  });
  const [isLoading, setIsLoading] = useState(true);

  const refreshData = useCallback(async () => {
    try {
      const [prods, ords, promos, sets, movs] = await Promise.all([
        productService.getAllProducts(),
        orderService.getAllOrders(),
        promotionService.getAllPromotions(),
        settingsService.getSettings(),
        inventoryService.getMovements(),
      ]);
      setProducts(prods);
      setOrders(ords);
      setPromotions(promos);
      setSettings(sets);
      setStockMovements(movs);
    } catch (e) {
      console.error('Failed to load app data:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    const initialize = async () => {
      try {
        const [prods, ords, promos, sets, movs] = await Promise.all([
          productService.getAllProducts(),
          orderService.getAllOrders(),
          promotionService.getAllPromotions(),
          settingsService.getSettings(),
          inventoryService.getMovements(),
        ]);
        if (mounted) {
          setProducts(prods);
          setOrders(ords);
          setPromotions(promos);
          setSettings(sets);
          setStockMovements(movs);
        }
      } catch (e) {
        console.error('Failed to load app data:', e);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };
    void initialize();
    return () => {
      mounted = false;
    };
  }, []);

  const publishedProducts = products.filter((p) => p.status !== 'draft');

  const createProduct = async (input: ProductInput) => {
    const created = await productService.createProduct(input);
    await refreshData();
    return created;
  };

  const updateProduct = async (id: number, input: Partial<Product>) => {
    const updated = await productService.updateProduct(id, input);
    await refreshData();
    return updated;
  };

  const deleteProduct = async (id: number) => {
    const ok = await productService.deleteProduct(id);
    await refreshData();
    return ok;
  };

  const adjustStock = async (productId: number, quantityChange: number, reason: string) => {
    await inventoryService.adjustStock({ productId, quantityChange, reason });
    await refreshData();
  };

  const updateOrderStatus = async (id: string, status: OrderStatus) => {
    await orderService.updateOrderStatus(id, status);
    await refreshData();
  };

  const updateSettings = async (updates: Partial<ShopSettings>) => {
    await settingsService.updateSettings(updates);
    await refreshData();
  };

  const createPromotion = async (promo: Omit<Promotion, 'id'>) => {
    const res = await promotionService.createPromotion(promo);
    await refreshData();
    return res;
  };

  const updatePromotion = async (id: string, updates: Partial<Promotion>) => {
    const res = await promotionService.updatePromotion(id, updates);
    await refreshData();
    return res;
  };

  const deletePromotion = async (id: string) => {
    const res = await promotionService.deletePromotion(id);
    await refreshData();
    return res;
  };

  const resetCatalog = async () => {
    await productService.resetCatalog();
    await settingsService.resetSettings();
    await refreshData();
  };

  return (
    <AppDataContext.Provider
      value={{
        products,
        publishedProducts,
        orders,
        promotions,
        settings,
        stockMovements,
        isLoading,
        refreshData,
        createProduct,
        updateProduct,
        deleteProduct,
        adjustStock,
        updateOrderStatus,
        updateSettings,
        createPromotion,
        updatePromotion,
        deletePromotion,
        resetCatalog,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};
