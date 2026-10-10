import type { Promotion } from '../../types/promotion';

export interface PromotionRepository {
  getAll(): Promise<Promotion[]>;
  getActive(): Promise<Promotion[]>;
  getByCode(code: string): Promise<Promotion | null>;
  create(promo: Omit<Promotion, 'id'>): Promise<Promotion>;
  update(id: string, promo: Partial<Promotion>): Promise<Promotion>;
  delete(id: string): Promise<boolean>;
}

