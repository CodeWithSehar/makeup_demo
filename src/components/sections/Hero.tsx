import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Star, ShoppingBag } from 'lucide-react';
import { useStore } from '../../context/useStore';

export const Hero: React.FC = () => {
  const { heroConfig } = useStore();

  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-surface-soft/70 via-ivory to-ivory">
      {/* Decorative ambient glow circles */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-surface-secondary/35 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-24 right-10 w-72 h-72 bg-champagne-gold/20 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-warm-border shadow-sm text-xs font-semibold text-antique-gold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-antique-gold animate-spin" style={{ animationDuration: '6s' }} />
              <span>{heroConfig.badgeText}</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-espresso leading-[1.15]">
              {heroConfig.headline}
            </h1>

            <p className="text-base sm:text-lg text-muted-taupe max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {heroConfig.subheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-espresso hover:bg-mocha text-white font-semibold text-sm shadow-md shadow-stone-900/15 hover:shadow-lg hover:shadow-stone-900/25 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-antique-gold focus-visible:outline-none"
              >
                <span>Explore Boutique</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-white hover:bg-surface-soft text-mocha border border-warm-border font-semibold text-sm shadow-xs hover:shadow-md transition-all duration-200 focus-visible:ring-2 focus-visible:ring-antique-gold focus-visible:outline-none"
              >
                <span>Contact &amp; Store Location</span>
              </a>
            </div>

            {/* Trust Micro-Pillars */}
            <div className="pt-8 border-t border-warm-border grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-surface-soft flex items-center justify-center text-antique-gold shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-espresso">100% Genuine</p>
                  <p className="text-[11px] text-muted-taupe">Authorized importer</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-surface-soft flex items-center justify-center text-antique-gold shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-espresso">Fast Delivery</p>
                  <p className="text-[11px] text-muted-taupe">All over Pakistan</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-surface-soft flex items-center justify-center text-antique-gold shrink-0">
                  <Star className="w-4 h-4 fill-champagne-gold text-champagne-gold" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-espresso">Curated Quality</p>
                  <p className="text-[11px] text-muted-taupe">Dermatologist approved</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual - LCP Candidate with fetchpriority="high" */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-3xl p-2 bg-gradient-to-tr from-surface-secondary via-surface-soft to-champagne-gold/40 shadow-2xl shadow-stone-900/10">
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-ivory">
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
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl backdrop-blur-md bg-white/90 border border-warm-border/70 shadow-lg flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-antique-gold font-bold">Featured Spotlight</span>
                      <h4 className="font-serif text-sm font-semibold text-espresso">Velvet Silk Radiance Series</h4>
                    </div>
                    <span className="text-xs font-bold text-espresso bg-surface-soft px-2.5 py-1 rounded-full border border-warm-border">
                      From Rs. 1,850
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating feature card */}
              <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white rounded-2xl p-3.5 shadow-xl border border-warm-border items-center gap-3 max-w-xs transition-transform hover:-translate-y-1">
                <div className="w-10 h-10 rounded-full bg-surface-soft flex items-center justify-center text-antique-gold font-bold text-xs shrink-0">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-espresso">Easy Cart Ordering</p>
                  <p className="text-[11px] text-muted-taupe">Add favorites &amp; confirm in one tap</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
