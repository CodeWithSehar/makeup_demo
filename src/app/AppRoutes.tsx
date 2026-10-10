import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../features/storefront/pages/HomePage';
import { AdminLayout } from '../features/admin/layouts/AdminLayout';
import { AdminLoginPage } from '../features/admin/pages/AdminLoginPage';
import { DashboardPage } from '../features/admin/pages/DashboardPage';
import { ProductsPage } from '../features/admin/pages/ProductsPage';
import { ProductCreatePage } from '../features/admin/pages/ProductCreatePage';
import { ProductEditPage } from '../features/admin/pages/ProductEditPage';
import { InventoryPage } from '../features/admin/pages/InventoryPage';
import { OrdersPage } from '../features/admin/pages/OrdersPage';
import { PromotionsPage } from '../features/admin/pages/PromotionsPage';
import { SettingsPage } from '../features/admin/pages/SettingsPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Customer Storefront */}
      <Route path="/" element={<HomePage />} />

      {/* Admin Auth */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Admin Portal Protected Area */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/new" element={<ProductCreatePage />} />
        <Route path="products/:id/edit" element={<ProductEditPage />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="promotions" element={<PromotionsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Catch-all Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

