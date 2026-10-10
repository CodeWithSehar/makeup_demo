import { useAppData } from '../store/useAppData';

export const useProducts = () => {
  const {
    products,
    publishedProducts,
    isLoading,
    createProduct,
    updateProduct,
    deleteProduct,
    resetCatalog,
  } = useAppData();

  return {
    products,
    publishedProducts,
    isLoading,
    createProduct,
    updateProduct,
    deleteProduct,
    resetCatalog,
  };
};
