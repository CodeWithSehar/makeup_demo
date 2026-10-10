import type { Promotion } from '../../types/promotion';
import type { PromotionRepository } from '../interfaces/PromotionRepository';
import { mockPromotions } from '../../data/mockPromotions';

const STORAGE_KEY = 'gg_mock_promotions_v3';

export class MockPromotionRepository implements PromotionRepository {
  private load(): Promotion[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Failed to load promotions:', e);
    }
    this.save(mockPromotions);
    return mockPromotions;
  }

  private save(promos: Promotion[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(promos));
    } catch (e) {
      console.warn('Failed to save promotions:', e);
    }
  }

  async getAll(): Promise<Promotion[]> {
    return this.load();
  }

  async getActive(): Promise<Promotion[]> {
    const list = this.load();
    return list.filter((p) => p.status === 'active');
  }

  async getByCode(code: string): Promise<Promotion | null> {
    const list = this.load();
    const clean = code.trim().toUpperCase();
    return list.find((p) => p.code.toUpperCase() === clean) || null;
  }

  async create(promoInput: Omit<Promotion, 'id'>): Promise<Promotion> {
    const list = this.load();
    const newPromo: Promotion = {
      ...promoInput,
      id: `promo-${Date.now()}`,
      code: promoInput.code.trim().toUpperCase(),
    };
    const updated = [newPromo, ...list];
    this.save(updated);
    return newPromo;
  }

  async update(id: string, promoUpdate: Partial<Promotion>): Promise<Promotion> {
    const list = this.load();
    const index = list.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Promotion ${id} not found.`);
    }
    const updatedPromo = { ...list[index], ...promoUpdate };
    list[index] = updatedPromo;
    this.save(list);
    return updatedPromo;
  }

  async delete(id: string): Promise<boolean> {
    const list = this.load();
    const filtered = list.filter((p) => p.id !== id);
    if (filtered.length === list.length) {
      return false;
    }
    this.save(filtered);
    return true;
  }
}

export const mockPromotionRepository = new MockPromotionRepository();

