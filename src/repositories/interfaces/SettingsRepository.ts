import type { ShopSettings } from '../../types/shopSettings';

export interface SettingsRepository {
  get(): Promise<ShopSettings>;
  update(settings: Partial<ShopSettings>): Promise<ShopSettings>;
  resetToDefault(): Promise<ShopSettings>;
}

