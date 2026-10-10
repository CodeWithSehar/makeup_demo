export interface Coupon {
  code: string;
  discountPercentage: number;
  description: string;
  minOrder?: number;
}

export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'GLOW20',
    discountPercentage: 20,
    description: '20% OFF Autumn Luxury Promo (No min order)',
  },
  {
    code: 'EID10',
    discountPercentage: 10,
    description: '10% OFF Festive Celebration Special',
  },
  {
    code: 'VIP15',
    discountPercentage: 15,
    description: '15% OFF VIP Beauty Club Member discount',
  },
];

