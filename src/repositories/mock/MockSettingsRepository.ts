import type { ShopSettings } from '../../types/shopSettings';
import type { SettingsRepository } from '../interfaces/SettingsRepository';
import { shopConfig } from '../../config/shopConfig';

const STORAGE_KEY = 'gg_mock_settings_v3';

export const defaultSettings: ShopSettings = {
  shopName: shopConfig.name,
  tagline: shopConfig.tagline,
  whatsappNumber: shopConfig.whatsappNumber,
  phone: shopConfig.phone,
  email: shopConfig.email,
  address: shopConfig.address,
  city: shopConfig.city,
  freeDeliveryThreshold: shopConfig.freeDeliveryThreshold,
  standardDeliveryFee: shopConfig.deliveryFee,
  hero: {
    badgeText: 'Autumn Luxury Collection 2026',
    headline: 'Radiate Timeless Elegance with Pure Luxury Formulas',
    subheadline: 'Indulge in dermatologist-crafted skincare, silk-finish pigments, and artisanal fragrances formulated to nourish your natural glow. Effortlessly order directly via WhatsApp.',
    promoCode: 'GLOW20',
    promoDiscountPercent: 20,
    heroImageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85',
  },
  policies: {
    authenticityNotice: 'Direct importer and authorized boutique. Every batch carries verifiable origin barcodes. Zero counterfeit policy guaranteed.',
    deliveryPromise: 'Express insured dispatch within 24–48 hours across Lahore, Karachi, Islamabad, and all cities in Pakistan.',
    exchangePolicy: '7-day hassle-free replacement on unopened items in original packaging via WhatsApp concierge.',
  },
  socials: {
    instagram: '@glowandgrace.pk',
    facebook: 'glowandgracecosmetics',
    tiktok: '@glowandgrace',
  },
};

export class MockSettingsRepository implements SettingsRepository {
  private load(): ShopSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Failed to load settings:', e);
    }
    this.save(defaultSettings);
    return defaultSettings;
  }

  private save(settings: ShopSettings): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save settings:', e);
    }
  }

  async get(): Promise<ShopSettings> {
    return this.load();
  }

  async update(updatePayload: Partial<ShopSettings>): Promise<ShopSettings> {
    const current = this.load();
    const updated: ShopSettings = {
      ...current,
      ...updatePayload,
      hero: { ...current.hero, ...(updatePayload.hero || {}) },
      policies: { ...current.policies, ...(updatePayload.policies || {}) },
      socials: { ...(current.socials || defaultSettings.socials), ...(updatePayload.socials || {}) },
    };
    this.save(updated);
    return updated;
  }

  async resetToDefault(): Promise<ShopSettings> {
    this.save(defaultSettings);
    return defaultSettings;
  }
}

export const mockSettingsRepository = new MockSettingsRepository();

