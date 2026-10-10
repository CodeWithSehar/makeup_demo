import { useAppData } from '../store/useAppData';

export const usePromotions = () => {
  const { promotions, createPromotion, updatePromotion, deletePromotion } = useAppData();

  const activePromotions = promotions.filter((p) => p.status === 'active');

  return {
    promotions,
    activePromotions,
    createPromotion,
    updatePromotion,
    deletePromotion,
  };
};
