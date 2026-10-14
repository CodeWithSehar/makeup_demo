import React, { useState } from 'react';
import { ShieldCheck, RefreshCw, Truck, HelpCircle, ChevronDown, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAppData } from '../../store/useAppData';
import { formatPKR } from '../../utils/formatCurrency';

export const PolicyFAQ: React.FC = () => {
  const { settings } = useAppData();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const threshold = settings.freeDeliveryThreshold || 5000;

  const policies = [
    {
      icon: ShieldCheck,
      title: "100% Authenticity Guarantee",
      description: settings.policies?.authenticityNotice || "Direct importer and authorized boutique. Every batch carries verifiable origin barcodes and batch codes. We do not stock or distribute replicas.",
    },
    {
      icon: Truck,
      title: "Nationwide Express Shipping",
      description: `${settings.policies?.deliveryPromise || 'Delivery within 24–48 hours nationwide.'} Free delivery on all orders above ${formatPKR(threshold)}.`,
    },
    {
      icon: RefreshCw,
      title: "7-Day Hassle-Free Exchange",
      description: settings.policies?.exchangePolicy || "Unopened products in original sealed packaging can be exchanged within 7 days. Dedicated WhatsApp concierge processes exchanges immediately.",
    },
  ];

  const faqs = [
    {
      question: "How do I place an order through WhatsApp?",
      answer: "Add your desired items to your shopping cart, review your order and any promo codes, and click 'Place Order on WhatsApp' to send your order summary directly to our concierge for instant confirmation.",
    },
    {
      question: "Is Cash on Delivery (COD) available across Pakistan?",
      answer: "Yes, Cash on Delivery is available for all cities and regions across Pakistan. We also accept direct bank transfers, JazzCash, and Nayapay for prepaid convenience.",
    },
    {
      question: "How can I verify the authenticity of perfumes and skincare?",
      answer: "All items include genuine manufacturer seals, QR codes, and batch numbers that can be verified on official batch-checking databases such as CheckFresh and CheckCosmetic.",
    },
    {
      question: "What is your shade-matching assistance policy?",
      answer: "You can chat with our certified beauty advisors on WhatsApp. Share a selfie under natural lighting or your current foundation shade, and we will accurately match your undertone.",
    },
    {
      question: "Can I customize a gift bundle or beauty box?",
      answer: "Absolutely! Simply message our WhatsApp concierge with the products you wish to pair together. We will assemble a custom velvet gift box with a personalized ribbon and gift card.",
    },
  ];

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white border-t border-warm-border content-visibility-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-soft border border-warm-border text-xs font-semibold text-antique-gold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparency &amp; Trust Pillars</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-espresso">
            Policies &amp; Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-muted-taupe">
            Everything you need to know about our sourcing, dispatch times, exchange terms, and concierge orders.
          </p>
        </div>

        {/* 3 Core Trust Policies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {policies.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-ivory/80 border border-warm-border hover:border-champagne-gold transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-warm-border text-antique-gold flex items-center justify-center shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-bold text-espresso">{p.title}</h3>
                <p className="text-xs text-muted-taupe leading-relaxed">{p.description}</p>
                <div className="pt-2 flex items-center gap-1.5 text-[11px] font-semibold text-success">
                  <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                  <span>Guaranteed Policy</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          <h3 className="font-serif text-2xl font-bold text-espresso text-center mb-6 flex items-center justify-center gap-2">
            <HelpCircle className="w-5 h-5 text-antique-gold" />
            <span>Customer Questions Answered</span>
          </h3>

          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-warm-border bg-ivory/60 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-espresso hover:text-mocha transition-colors focus-visible:ring-2 focus-visible:ring-antique-gold focus-visible:outline-none cursor-pointer"
                >
                  <span className="font-serif text-sm sm:text-base font-semibold">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-taupe transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-antique-gold' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-muted-taupe leading-relaxed animate-in fade-in duration-150 border-t border-warm-border/70 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

