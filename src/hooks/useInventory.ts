import { useAppData } from '../store/useAppData';

export const useInventory = () => {
  const { products, stockMovements, adjustStock } = useAppData();

  const lowStockProducts = products.filter((p) => p.stock > 0 && p.stock <= 3);
  const outOfStockProducts = products.filter((p) => p.stock === 0);
  const totalStockUnits = products.reduce((acc, p) => acc + p.stock, 0);

  return {
    products,
    stockMovements,
    lowStockProducts,
    outOfStockProducts,
    totalStockUnits,
    adjustStock,
  };
};
