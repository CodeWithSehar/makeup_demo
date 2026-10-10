import { formatPKR } from './formatCurrency';
import type { CartItem, CustomerInfo } from '../types';

export const SHOP_WHATSAPP_NUMBER: string =
  (import.meta.env.VITE_SHOP_WHATSAPP_NUMBER as string | undefined) || "923434113012";
export { formatPKR };

export function generateWhatsAppOrderUrl(
  productName: string,
  price: number,
  quantity: number,
  sku?: string,
  whatsappNumber: string = SHOP_WHATSAPP_NUMBER
): string {
  const total = price * quantity;
  const skuLine = sku ? `SKU: ${sku}\n` : '';
  const message = 
    `Hello! I would like to order:\n` +
    `Product: ${productName}\n` +
    skuLine +
    `Unit Price: ${formatPKR(price)}\n` +
    `Quantity: ${quantity}\n` +
    `Total: ${formatPKR(total)}\n` +
    `Please confirm availability and dispatch schedule.`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function generateWhatsAppGeneralUrl(
  inquiry: string = "Hello Glow & Grace! I'd like to ask a question about your cosmetic products.",
  whatsappNumber: string = SHOP_WHATSAPP_NUMBER
): string {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(inquiry)}`;
}

export function generateWhatsAppCartOrderUrl(
  items: CartItem[],
  customer: CustomerInfo,
  subtotal: number,
  discount: number,
  deliveryFee: number,
  total: number,
  couponCode?: string,
  whatsappNumber: string = SHOP_WHATSAPP_NUMBER
): string {
  let message = `*Glow & Grace Luxury Cosmetics - New Order*\n\n`;
  message += `*Items Ordered (${items.length}):*\n`;
  
  items.forEach((item, index) => {
    const itemTotal = item.product.price * item.quantity;
    const shadeInfo = item.product.shade ? ` (${item.product.shade})` : '';
    message += `${index + 1}. ${item.product.name}${shadeInfo}\n`;
    message += `   Qty: ${item.quantity} x ${formatPKR(item.product.price)} = ${formatPKR(itemTotal)}\n`;
  });

  message += `\n*Order Financial Summary:*\n`;
  message += `Subtotal: ${formatPKR(subtotal)}\n`;
  if (discount > 0 && couponCode) {
    message += `Coupon (${couponCode}): -${formatPKR(discount)}\n`;
  }
  message += `Delivery Fee: ${deliveryFee === 0 ? 'FREE (Nationwide)' : formatPKR(deliveryFee)}\n`;
  message += `*Total Payable: ${formatPKR(total)}*\n\n`;

  message += `*Shipping Details:*\n`;
  message += `Name: ${customer.name || 'Not provided'}\n`;
  message += `Phone: ${customer.phone || 'Not provided'}\n`;
  message += `City: ${customer.city || 'Not provided'}\n`;
  if (customer.address) {
    message += `Address: ${customer.address}\n`;
  }
  if (customer.note) {
    message += `Special Note: ${customer.note}\n`;
  }

  message += `\nPlease confirm availability and dispatch schedule. Thank you!`;

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
