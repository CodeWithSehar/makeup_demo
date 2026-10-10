import type { Promotion } from '../types/promotion';

export const mockPromotions: Promotion[] = [
  {
    id: 'promo-1',
    code: 'GLOW20',
    discountPercentage: 20,
    description: '20% OFF Autumn Luxury Promo Storewide',
    status: 'active',
    startDate: '2026-10-01',
    endDate: '2026-10-31',
  },
  {
    id: 'promo-2',
    code: 'EID10',
    discountPercentage: 10,
    description: '10% OFF Festive Celebration Special',
    status: 'active',
    startDate: '2026-10-05',
    endDate: '2026-10-25',
  },
  {
    id: 'promo-3',
    code: 'VIP15',
    discountPercentage: 15,
    description: '15% OFF VIP Beauty Club Member discount',
    status: 'active',
    minOrderAmount: 8000,
  },
  {
    id: 'promo-4',
    code: 'WINTER25',
    discountPercentage: 25,
    description: '25% OFF Upcoming Winter Velvet Collection',
    status: 'scheduled',
    startDate: '2026-11-15',
    endDate: '2026-12-05',
  },
];

