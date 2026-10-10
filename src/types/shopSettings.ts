export interface HeroSettings {
  badgeText: string;
  headline: string;
  subheadline: string;
  promoCode: string;
  promoDiscountPercent: number;
  heroImageUrl: string;
}

export interface StorePolicySettings {
  authenticityNotice: string;
  deliveryPromise: string;
  exchangePolicy: string;
}

export interface SocialMediaSettings {
  instagram: string;
  facebook: string;
  tiktok: string;
}

export interface ShopSettings {
  shopName: string;
  tagline: string;
  whatsappNumber: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  freeDeliveryThreshold: number;
  standardDeliveryFee: number;
  hero: HeroSettings;
  policies: StorePolicySettings;
  socials: SocialMediaSettings;
}
