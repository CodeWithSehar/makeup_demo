import React from 'react';
import { Tag, Sparkles, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/useStore';
import { useAppData } from '../../store/useAppData';
import { formatPKR } from '../../utils/formatCurrency';

export const SpecialOffer: React.FC = () => {
  const { heroConfig } = useStore();
  const { settings } = useAppData();

  const code = heroConfig.promoCode || 'GLOW20';
  const discountPercent = heroConfig.promoDiscountPercent || 20;

  return (
    <section className="py-12 bg-gradient-to-r from-rose-900 via-primary-dark to-stone-900 text-white relative overflow-hidden">
      {/* Decorative Blur elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 p-6 sm:p-10 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
          
          {/* Left Text */}
          <div className="space-y-4 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-200 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Limited Time Exclusive Deal</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Enjoy Up to {discountPercent}% OFF Across All Luxury Categories
            </h2>

            <p className="text-sm sm:text-base text-rose-100/90 leading-relaxed">
              Unlock exclusive savings on high-pigment palettes, royal Jasmine Oud, and rose gold mesh timepieces. Enter promo code or claim instantly on WhatsApp.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs text-rose-200">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-rose-300" />
                <span>Valid through this season</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Free Delivery above {formatPKR(settings.freeDeliveryThreshold || 5000)}</span>
              </div>
            </div>
          </div>

          {/* Right Action & Promo Code */}
          <div className="flex flex-col items-center gap-4 shrink-0 w-full sm:w-auto">
            {/* Promo Code Box */}
            <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md">
              <Tag className="w-5 h-5 text-rose-300" />
              <div className="text-left">
                <p className="text-[10px] text-rose-200 uppercase font-mono tracking-wider">Use Promo Code</p>
                <p className="font-mono text-xl font-bold tracking-widest text-white">{code}</p>
              </div>
            </div>

            {/* Shop With Promo Code CTA */}
            <a
              href="#shop"
              className="flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-white text-stone-900 hover:bg-rose-50 active:scale-95 font-semibold text-sm shadow-lg shadow-black/20 hover:shadow-xl transition-all w-full sm:w-auto"
            >
              <span>Apply Code in Bag</span>
              <ArrowRight className="w-4 h-4 text-primary" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

