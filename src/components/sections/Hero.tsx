import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Star, ShoppingBag } from 'lucide-react';
import { useStore } from '../../context/useStore';

export const Hero: React.FC = () => {
  const { heroConfig } = useStore();

  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-rose-50/60 via-white to-stone-50/50">
      {/* Decorative ambient glow circles */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-rose-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-24 right-10 w-72 h-72 bg-pink-300/20 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-rose-200/90 shadow-sm text-xs font-semibold text-primary uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-primary animate-spin" style={{ animationDuration: '6s' }} />
              <span>{heroConfig.badgeText}</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.15]">
              {heroConfig.headline}
            </h1>

            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {heroConfig.subheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-primary hover:bg-primary-dark text-white font-semibold text-sm shadow-md shadow-rose-300/40 hover:shadow-lg hover:shadow-rose-400/30 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none"
              >
                <span>Explore Boutique</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-white hover:bg-rose-50/70 text-stone-800 border border-rose-200/90 font-semibold text-sm shadow-xs hover:shadow-md transition-all duration-200 focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none"
              >
                <span>Contact &amp; Store Location</span>
              </a>
            </div>

            {/* Trust Micro-Pillars */}
            <div className="pt-8 border-t border-rose-100/80 grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-rose-100/70 flex items-center justify-center text-primary shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-900">100% Genuine</p>
                  <p className="text-[11px] text-stone-500">Authorized importer</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-rose-100/70 flex items-center justify-center text-primary shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-900">Fast Delivery</p>
                  <p className="text-[11px] text-stone-500">All over Pakistan</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-rose-100/70 flex items-center justify-center text-primary shrink-0">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-900">Curated Quality</p>
                  <p className="text-[11px] text-stone-500">Dermatologist approved</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual - LCP Candidate with fetchpriority="high" */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-3xl p-2 bg-gradient-to-tr from-rose-200 via-rose-100 to-amber-100 shadow-2xl shadow-rose-900/10">
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-stone-100">
                  <img
                    src={heroConfig.heroImageUrl}
                    alt={heroConfig.headline}
                    width={800}
                    height={1000}
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating badge over image */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl backdrop-blur-md bg-white/90 border border-white/60 shadow-lg flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-bold">Featured Spotlight</span>
                      <h4 className="font-serif text-sm font-semibold text-stone-900">Velvet Silk Radiance Series</h4>
                    </div>
                    <span className="text-xs font-bold text-stone-900 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                      From Rs. 1,850
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating feature card */}
              <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white rounded-2xl p-3.5 shadow-xl border border-rose-100/80 items-center gap-3 max-w-xs transition-transform hover:-translate-y-1">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-stone-800">Easy Cart Ordering</p>
                  <p className="text-[11px] text-stone-500">Add favorites &amp; confirm in one tap</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
