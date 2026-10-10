export interface ShopConfig {
  name: string;
  tagline: string;
  whatsappNumber: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  operatingHours: {
    weekdays: string;
    sunday: string;
  };
  deliveryFee: number;
  freeDeliveryThreshold: number;
  currency: string;
}

export const shopConfig: ShopConfig = {
  name: 'Glow & Grace',
  tagline: 'Luxury Cosmetics Boutique',
  whatsappNumber: (import.meta.env.VITE_SHOP_WHATSAPP_NUMBER as string | undefined) || '923434113012',
  phone: (import.meta.env.VITE_SHOP_PHONE as string | undefined) || '0343-4113012',
  email: (import.meta.env.VITE_SHOP_EMAIL as string | undefined) || 'concierge@glowandgrace.pk',
  address: 'Building 44-B, MM Alam Road, Gulberg III',
  city: 'Lahore, Pakistan',
  operatingHours: {
    weekdays: 'Mon – Sat: 10:00 AM – 9:00 PM (PKT)',
    sunday: 'Sun: 2:00 PM – 8:00 PM (WhatsApp Concierge)',
  },
  deliveryFee: 250,
  freeDeliveryThreshold: 5000,
  currency: 'Rs.',
};

