export type PromotionStatus = 'active' | 'scheduled' | 'expired';

export interface Promotion {
  id: string;
  code: string;
  discountPercentage: number;
  description: string;
  minOrderAmount?: number;
  status: PromotionStatus;
  startDate?: string;
  endDate?: string;
}

