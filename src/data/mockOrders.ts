import type { Order } from '../types/order';
import { seedProducts } from './seedProducts';

export const mockOrders: Order[] = [
  {
    id: "ORD-8491",
    items: [
      { product: seedProducts[0], quantity: 2 },
      { product: seedProducts[4], quantity: 1 }
    ],
    customer: {
      name: "Ayesha Malik",
      phone: "0300-4567890",
      city: "Lahore",
      address: "House 24, Street 7, Cavalry Ground",
      note: "Please call before delivery"
    },
    subtotal: 11110,
    discount: 2222,
    couponCode: "GLOW20",
    deliveryFee: 0,
    total: 8888,
    status: 'delivered',
    createdAt: "2026-10-08T14:30:00Z",
    channel: 'whatsapp'
  },
  {
    id: "ORD-8492",
    items: [
      { product: seedProducts[9], quantity: 1 },
      { product: seedProducts[11], quantity: 1 }
    ],
    customer: {
      name: "Bilal Hussain",
      phone: "0321-8899112",
      city: "Karachi",
      address: "Apartment 4B, Clifton Block 5",
      note: "Gift packing requested"
    },
    subtotal: 19040,
    discount: 3808,
    couponCode: "GLOW20",
    deliveryFee: 0,
    total: 15232,
    status: 'dispatched',
    createdAt: "2026-10-09T10:15:00Z",
    channel: 'whatsapp'
  },
  {
    id: "ORD-8493",
    items: [
      { product: seedProducts[15], quantity: 1 }
    ],
    customer: {
      name: "Zainab Tariq",
      phone: "0333-2211445",
      city: "Islamabad",
      address: "Sector F-7/2, Street 18",
    },
    subtotal: 8800,
    discount: 880,
    couponCode: "EID10",
    deliveryFee: 0,
    total: 7920,
    status: 'confirmed',
    createdAt: "2026-10-09T18:45:00Z",
    channel: 'whatsapp'
  },
  {
    id: "ORD-8494",
    items: [
      { product: seedProducts[2], quantity: 2 },
      { product: seedProducts[13], quantity: 1 }
    ],
    customer: {
      name: "Fatima Noor",
      phone: "0345-6677889",
      city: "Faisalabad",
      address: "D-Ground, Peoples Colony",
    },
    subtotal: 7300,
    discount: 0,
    deliveryFee: 0,
    total: 7300,
    status: 'pending',
    createdAt: "2026-10-10T00:10:00Z",
    channel: 'whatsapp'
  }
];

