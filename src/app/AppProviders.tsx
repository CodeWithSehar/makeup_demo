import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppDataProvider } from '../store/AppDataContext';
import { CartProvider } from '../store/CartContext';
import { StoreProvider } from '../context/StoreContext';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <BrowserRouter>
      <AppDataProvider>
        <CartProvider>
          <StoreProvider>{children}</StoreProvider>
        </CartProvider>
      </AppDataProvider>
    </BrowserRouter>
  );
};

