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
        className="fixed inset-0 bg-espresso/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-warm-border flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-warm-border flex items-center justify-between bg-ivory">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-surface-soft text-antique-gold flex items-center justify-center">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h2 id="cart-drawer-title" className="font-serif text-lg font-bold text-espresso">
                  Your Shopping Cart
                </h2>
                <p className="text-xs text-muted-taupe font-mono">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs text-muted-taupe hover:text-error transition-colors p-1"
                  title="Clear Cart"
                >
                  Clear all
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                aria-label="Close Cart"
                className="w-8 h-8 rounded-full bg-surface-soft hover:bg-surface-secondary/50 text-mocha flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Delivery Progress Banner */}
          <div className="px-5 py-2.5 bg-surface-soft/80 border-b border-warm-border text-xs">
            {amountNeededForFreeDelivery > 0 ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-mocha">
                  <span className="flex items-center gap-1 font-medium">
                    <Truck className="w-3.5 h-3.5 text-antique-gold" />
                    Add {formatPKR(amountNeededForFreeDelivery)} for Free Delivery
                  </span>
                  <span className="font-mono text-[11px] text-muted-taupe">{freeDeliveryProgress}%</span>
                </div>
                <div className="w-full bg-warm-border rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-antique-gold h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${freeDeliveryProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-success font-medium">
                <Check className="w-4 h-4 text-success" />
                <span>You qualify for FREE Nationwide Delivery!</span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-surface-soft flex items-center justify-center text-antique-gold">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-bold text-espresso">Your cart is empty</h3>
                <p className="text-xs text-muted-taupe max-w-xs mx-auto">
                  Explore our luxury skincare, perfumes, and cosmetics to begin building your curated order.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-espresso text-white text-xs font-semibold shadow-sm hover:bg-mocha transition-all"
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
                    className="flex gap-3.5 p-3 rounded-2xl border border-warm-border bg-white hover:border-champagne-gold transition-colors shadow-xs"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      width={70}
                      height={70}
                      className="w-16 h-16 rounded-xl object-cover object-center shrink-0 bg-ivory border border-warm-border"
                    />

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="text-xs font-semibold text-espresso truncate">
                          {item.product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id)}
                          aria-label={`Remove ${item.product.name}`}
                          className="text-muted-taupe hover:text-error transition-colors p-0.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-muted-taupe font-mono">
                        {item.product.brand} {item.product.shade ? `• ${item.product.shade}` : ''}
                      </p>

                      <div className="flex items-center justify-between pt-1">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-warm-border rounded-full bg-ivory p-0.5">
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="w-5 h-5 rounded-full flex items-center justify-center text-mocha hover:text-espresso transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold text-espresso font-mono">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                            className="w-5 h-5 rounded-full flex items-center justify-center text-mocha hover:text-espresso transition-colors disabled:opacity-30"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right font-mono">
                          <p className="text-xs font-bold text-mocha">{formatPKR(itemTotal)}</p>
                          <p className="text-[10px] text-muted-taupe">
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
              <div className="pt-2 border-t border-warm-border space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-espresso font-mono">
                  Shipping Information
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label htmlFor="customerFullName" className="text-[11px] text-muted-taupe block mb-0.5">Full Name</label>
                    <input
                      id="customerFullName"
                      type="text"
                      placeholder="e.g. Sana Ahmed"
                      value={customer.name}
                      onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-warm-border text-xs focus:outline-none focus:ring-1 focus:ring-antique-gold"
                    />
                  </div>
                  <div>
                    <label htmlFor="customerPhone" className="text-[11px] text-muted-taupe block mb-0.5">Phone Number</label>
                    <input
                      id="customerPhone"
                      type="tel"
                      placeholder="e.g. 0300-1234567"
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-warm-border text-xs focus:outline-none focus:ring-1 focus:ring-antique-gold"
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="customerAddress" className="text-[11px] text-muted-taupe block mb-0.5">City &amp; Delivery Address</label>
                    <input
                      id="customerAddress"
                      type="text"
                      placeholder="e.g. House 12, Street 4, DHA Phase 5, Lahore"
                      value={customer.address}
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-warm-border text-xs focus:outline-none focus:ring-1 focus:ring-antique-gold"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Summary & WhatsApp Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-warm-border bg-ivory space-y-3">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-2.5 text-muted-taupe" />
                  <input
                    type="text"
                    placeholder="Enter Coupon (e.g. GLOW20)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-white border border-warm-border rounded-lg text-xs uppercase font-mono tracking-wider focus:outline-none focus:ring-1 focus:ring-antique-gold"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-espresso hover:bg-mocha text-white rounded-lg text-xs font-semibold"
                >
                  Apply
                </button>
              </form>

              {appliedCoupon && (
                <div className="flex items-center justify-between px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-success">
                  <span className="font-mono font-bold">
                    Code: {appliedCoupon.code} ({appliedCoupon.discountPercentage}% OFF)
                  </span>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-xs text-error hover:underline ml-2"
                  >
                    Remove
                  </button>
                </div>
              )}

              {couponFeedback && !appliedCoupon && (
                <p className="text-[11px] text-error">{couponFeedback.message}</p>
              )}

              {/* Financial Calculation Breakdown */}
              <div className="space-y-1.5 pt-2 text-xs font-mono text-muted-taupe border-t border-warm-border">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-espresso font-semibold">{formatPKR(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount ({appliedCoupon?.code}):</span>
                    <span>-{formatPKR(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Fee:</span>
                  <span>{deliveryFee === 0 ? 'FREE' : formatPKR(deliveryFee)}</span>
                </div>

                <div className="flex justify-between pt-1 border-t border-warm-border text-sm font-bold text-espresso">
                  <span>Total Payable:</span>
                  <span className="text-mocha text-base font-serif">{formatPKR(totalPayable)}</span>
                </div>
              </div>

              {/* WhatsApp Consolidated Order Button */}
              <button
                type="button"
                onClick={handleWhatsAppCheckout}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-whatsapp hover:bg-[#08885D] active:scale-[0.98] text-white font-semibold text-sm shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>Place Order on WhatsApp ({formatPKR(totalPayable)})</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-muted-taupe">
                <ShieldCheck className="w-3.5 h-3.5 text-success" />
                <span>One-tap WhatsApp checkout &bull; Cash on Delivery available</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

