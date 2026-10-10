import { mockSettingsRepository } from '../repositories/mock/MockSettingsRepository';
import type { ShopSettings } from '../types/shopSettings';

export const settingsService = {
  async getSettings(): Promise<ShopSettings> {
    return mockSettingsRepository.get();
  },

  async updateSettings(updates: Partial<ShopSettings>): Promise<ShopSettings> {
    return mockSettingsRepository.update(updates);
  },

  async resetSettings(): Promise<ShopSettings> {
    return mockSettingsRepository.resetToDefault();
  },
};

