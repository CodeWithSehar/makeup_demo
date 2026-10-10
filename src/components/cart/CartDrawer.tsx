import React, { useState, useEffect } from 'react';
import { X, Trash2, MessageCircle, Tag, Truck, ShieldCheck, ArrowRight, ShoppingCart, Plus, Minus, Check } from 'lucide-react';
import { useStore } from '../../context/useStore';
import { useAppData } from '../../store/useAppData';
import { formatPKR } from '../../utils/formatCurrency';
import { generateWhatsAppCartOrderUrl } from '../../utils/whatsapp';
import type { CustomerInfo } from '../../types';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    subtotal,
    discount,
    deliveryFee,
    totalPayable,
  } = useStore();

  const { settings } = useAppData();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  // Customer shipping info
  const [customer, setCustomer] = useState<CustomerInfo>({
    name: '',
    phone: '',
    city: 'Lahore',
    address: '',
    note: '',
  });

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  // Lock scroll when open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = await applyCoupon(couponInput);
    setCouponFeedback(res);
    if (res.success) {
      setCouponInput('');
    }
  };

  const handleWhatsAppCheckout = () => {
    const url = generateWhatsAppCartOrderUrl(
      cart,
      customer,
      subtotal,
      discount,
      deliveryFee,
      totalPayable,
      appliedCoupon?.code,
      settings.whatsappNumber || '923434113012'
    );
    window.open(url, '_blank');
  };

  const freeDeliveryThreshold = settings.freeDeliveryThreshold || 5000;
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-rose-100 flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-rose-100 flex items-center justify-between bg-stone-50/70">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h2 id="cart-drawer-title" className="font-serif text-lg font-bold text-stone-900">
                  Your Shopping Cart
                </h2>
                <p className="text-xs text-stone-500 font-mono">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs text-stone-500 hover:text-rose-600 transition-colors p-1"
                  title="Clear Cart"
                >
                  Clear all
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                aria-label="Close Cart"
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Delivery Progress Banner */}
          <div className="px-5 py-2.5 bg-rose-50/70 border-b border-rose-100/80 text-xs">
            {amountNeededForFreeDelivery > 0 ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-stone-700">
                  <span className="flex items-center gap-1 font-medium">
                    <Truck className="w-3.5 h-3.5 text-primary" />
                    Add {formatPKR(amountNeededForFreeDelivery)} for Free Delivery
                  </span>
                  <span className="font-mono text-[11px] text-stone-500">{freeDeliveryProgress}%</span>
                </div>
                <div className="w-full bg-rose-200/80 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-primary h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${freeDeliveryProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>You qualify for FREE Nationwide Delivery!</span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-rose-50 flex items-center justify-center text-rose-400">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900">Your cart is empty</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Explore our luxury skincare, perfumes, and cosmetics to begin building your curated order.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary text-white text-xs font-semibold shadow-sm hover:bg-primary-dark transition-all"
                >
                  <span>Start Shopping</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemTotal = item.product.price * item.quantity;
                return (
                  <div
                    key={item.product.id}
                    className="flex gap-3.5 p-3 rounded-2xl border border-rose-100/90 bg-white hover:border-rose-200 transition-colors shadow-xs"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      width={70}
                      height={70}
                      className="w-16 h-16 rounded-xl object-cover object-center shrink-0 bg-stone-100 border border-stone-100"
                    />

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="text-xs font-semibold text-stone-900 truncate">
                          {item.product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id)}
                          aria-label={`Remove ${item.product.name}`}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-0.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-stone-500 font-mono">
                        {item.product.brand} {item.product.shade ? `• ${item.product.shade}` : ''}
                      </p>

                      <div className="flex items-center justify-between pt-1">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-rose-200 rounded-full bg-stone-50 p-0.5">
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="w-5 h-5 rounded-full flex items-center justify-center text-stone-600 hover:text-primary transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold text-stone-900 font-mono">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                            className="w-5 h-5 rounded-full flex items-center justify-center text-stone-600 hover:text-primary transition-colors disabled:opacity-30"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right font-mono">
                          <p className="text-xs font-bold text-primary">{formatPKR(itemTotal)}</p>
                          <p className="text-[10px] text-stone-400">
                            {formatPKR(item.product.price)} each
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Customer Details Form (Only when cart has items) */}
            {cart.length > 0 && (
              <div className="pt-2 border-t border-rose-100 space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 font-mono">
                  Shipping Information
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label htmlFor="customerFullName" className="text-[11px] text-stone-600 block mb-0.5">Full Name</label>
                    <input
                      id="customerFullName"
                      type="text"
                      placeholder="e.g. Sana Ahmed"
                      value={customer.name}
                      onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="customerPhone" className="text-[11px] text-stone-600 block mb-0.5">Phone Number</label>
                    <input
                      id="customerPhone"
                      type="tel"
                      placeholder="e.g. 0300-1234567"
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="customerAddress" className="text-[11px] text-stone-600 block mb-0.5">City &amp; Delivery Address</label>
                    <input
                      id="customerAddress"
                      type="text"
                      placeholder="e.g. House 12, Street 4, DHA Phase 5, Lahore"
                      value={customer.address}
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Summary & WhatsApp Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-rose-100 bg-stone-50/80 space-y-3">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Enter Coupon (e.g. GLOW20)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-white border border-rose-200 rounded-lg text-xs uppercase font-mono tracking-wider focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-900 text-white rounded-lg text-xs font-semibold"
                >
                  Apply
                </button>
              </form>

              {appliedCoupon && (
                <div className="flex items-center justify-between px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                  <span className="font-mono font-bold">
                    Code: {appliedCoupon.code} ({appliedCoupon.discountPercentage}% OFF)
                  </span>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-xs text-rose-600 hover:underline ml-2"
                  >
                    Remove
                  </button>
                </div>
              )}

              {couponFeedback && !appliedCoupon && (
                <p className="text-[11px] text-rose-600">{couponFeedback.message}</p>
              )}

              {/* Financial Calculation Breakdown */}
              <div className="space-y-1.5 pt-2 text-xs font-mono text-stone-600 border-t border-rose-100">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-stone-900 font-semibold">{formatPKR(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount ({appliedCoupon?.code}):</span>
                    <span>-{formatPKR(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Fee:</span>
                  <span>{deliveryFee === 0 ? 'FREE' : formatPKR(deliveryFee)}</span>
                </div>

                <div className="flex justify-between pt-1 border-t border-stone-200 text-sm font-bold text-stone-900">
                  <span>Total Payable:</span>
                  <span className="text-primary text-base font-serif">{formatPKR(totalPayable)}</span>
                </div>
              </div>

              {/* WhatsApp Consolidated Order Button */}
              <button
                type="button"
                onClick={handleWhatsAppCheckout}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-[#128C7E] active:scale-[0.98] text-white font-semibold text-sm shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>Place Order on WhatsApp ({formatPKR(totalPayable)})</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>One-tap WhatsApp checkout &bull; Cash on Delivery available</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

