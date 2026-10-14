import React from 'react';
import { ShieldCheck, Truck, MessageCircle, Sparkles, Award, CheckCircle, MapPin, Store, Clock } from 'lucide-react';
import { useAppData } from '../../store/useAppData';

export const About: React.FC = () => {
  const { settings } = useAppData();
  const fullAddress = `${settings.address}, ${settings.city}`;

  const trustPillars = [
    {
      icon: ShieldCheck,
      title: "100% Genuine Products",
      description: "Directly sourced from verified global laboratories and official beauty distributors. Zero counterfeit policy guaranteed.",
      highlight: "Lab Certified"
    },
    {
      icon: Truck,
      title: "Fast Nationwide Delivery",
      description: "Express insured dispatch to Lahore, Karachi, Islamabad, and across Pakistan within 24 to 48 hours.",
      highlight: "Safe Transit"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Order Support",
      description: "Skip complex checkout forms. Chat directly with our personal beauty consultants and confirm your order in seconds.",
      highlight: "Instant Assistance"
    },
    {
      icon: Award,
      title: "Premium Dermatological Quality",
      description: "Hypoallergenic formulas, non-comedogenic ingredients, and cruelty-free practices crafted for sensitive South Asian skin.",
      highlight: "Cruelty Free"
    }
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-white border-y border-warm-border content-visibility-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-soft border border-warm-border text-xs font-semibold text-antique-gold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The {settings.shopName} Heritage</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-espresso">
            About Us &amp; Our Physical Boutique
          </h2>
          <p className="text-base text-muted-taupe leading-relaxed">
            Founded with a passion for clean luxury, {settings.shopName} curates world-class cosmetics, perfumes, timepieces, and accessories so every customer in Pakistan can enjoy genuine elegance with zero hassle.
          </p>
        </div>

        {/* Physical Store Photo & Introduction Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-20 bg-ivory rounded-3xl p-6 sm:p-10 border border-warm-border">
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1555529771-835f59fc5efe?auto=format&fit=crop&w=1000&q=80"
              alt={`${settings.shopName} Flagship Physical Boutique on MM Alam Road Lahore`}
              width={800}
              height={600}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl backdrop-blur-md bg-white/90 border border-warm-border/70 shadow-md flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Store className="w-5 h-5 text-antique-gold shrink-0" />
                <div>
                  <h4 className="font-serif text-sm font-bold text-espresso">Flagship Boutique &amp; Vanity Lounge</h4>
                  <p className="text-xs text-muted-taupe">{fullAddress}</p>
                </div>
              </div>
              <span className="text-[11px] font-mono font-semibold px-2.5 py-1 bg-emerald-50 text-success rounded-full border border-emerald-200">
                Open Daily
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-antique-gold font-bold">
              <MapPin className="w-4 h-4" />
              <span>Physical Storefront &amp; Tester Studio</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-espresso leading-tight">
              Experience Our Collections In-Person or Order Straight to Your Doorstep
            </h3>

            <p className="text-sm sm:text-base text-muted-taupe leading-relaxed">
              Step into our MM Alam Road flagship store for personalized shade consultations, tester vanity stations, and olfactory fragrance sessions. Or enjoy the same boutique concierge service through our direct WhatsApp ordering.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-warm-border space-y-1">
                <div className="flex items-center gap-2 text-espresso font-semibold text-xs">
                  <MapPin className="w-4 h-4 text-antique-gold" />
                  <span>Prime Location</span>
                </div>
                <p className="text-xs text-muted-taupe">
                  {fullAddress} (Valet Parking Available)
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-warm-border space-y-1">
                <div className="flex items-center gap-2 text-espresso font-semibold text-xs">
                  <Clock className="w-4 h-4 text-antique-gold" />
                  <span>Visiting Hours</span>
                </div>
                <p className="text-xs text-muted-taupe">
                  Mon – Sat: 10:00 AM – 9:00 PM<br />Sun: 2:00 PM – 8:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Card Trust Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group relative p-8 rounded-2xl bg-ivory/80 hover:bg-surface-soft/50 border border-warm-border hover:border-champagne-gold transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white border border-warm-border flex items-center justify-center text-antique-gold mb-6 shadow-sm group-hover:scale-110 group-hover:bg-espresso group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-antique-gold">
                    {pillar.highlight}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-espresso mt-1 mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-taupe leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-warm-border/70 flex items-center gap-2 text-xs font-medium text-success">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>Quality Assured</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
