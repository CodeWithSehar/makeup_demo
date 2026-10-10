import { mockPromotionRepository } from '../repositories/mock/MockPromotionRepository';
import type { Promotion } from '../types/promotion';

export const promotionService = {
  async getAllPromotions(): Promise<Promotion[]> {
    return mockPromotionRepository.getAll();
  },

  async getActivePromotions(): Promise<Promotion[]> {
    return mockPromotionRepository.getActive();
  },

  async validateCoupon(code: string, orderAmount: number): Promise<{ valid: boolean; discountPercent: number; message: string }> {
    const promo = await mockPromotionRepository.getByCode(code);
    if (!promo || promo.status !== 'active') {
      return { valid: false, discountPercent: 0, message: 'Invalid or expired coupon code.' };
    }

    if (promo.minOrderAmount && orderAmount < promo.minOrderAmount) {
      return {
        valid: false,
        discountPercent: 0,
        message: `Coupon requires minimum order of Rs. ${promo.minOrderAmount.toLocaleString()}.`,
      };
    }

    return {
      valid: true,
      discountPercent: promo.discountPercentage,
      message: `Coupon ${promo.code} applied (${promo.discountPercentage}% OFF)!`,
    };
  },

  async createPromotion(input: Omit<Promotion, 'id'>): Promise<Promotion> {
    return mockPromotionRepository.create(input);
  },

  async updatePromotion(id: string, input: Partial<Promotion>): Promise<Promotion> {
    return mockPromotionRepository.update(id, input);
  },

  async deletePromotion(id: string): Promise<boolean> {
    return mockPromotionRepository.delete(id);
  },
};

