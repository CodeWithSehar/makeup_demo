import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Clock, Send, Sparkles, Mail } from 'lucide-react';
import { useAppData } from '../../store/useAppData';
import { Button } from '../common/Button';
import { InstagramIcon, FacebookIcon, TikTokIcon } from '../common/SocialIcons';

export const Contact: React.FC = () => {
  const { settings } = useAppData();
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('Product Inquiry');
  const [note, setNote] = useState('');

  const whatsappNum = settings.whatsappNumber || '923434113012';
  const phoneNum = settings.phone || '0343-4113012';
  const fullAddress = `${settings.address}, ${settings.city}`;

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const customMessage = 
      `Hello ${settings.shopName}!\n` +
      `My Name: ${name || 'Customer'}\n` +
      `Inquiry Topic: ${topic}\n` +
      `Message: ${note || 'I would like to inquire about your products.'}`;
    
    window.open(`https://wa.me/${whatsappNum}?text=${encodeURIComponent(customMessage)}`, '_blank');
  };

  const socialLinks = [
    {
      name: 'Instagram',
      handle: settings.socials?.instagram || '@glowandgrace.pk',
      icon: InstagramIcon,
      url: 'https://instagram.com',
      color: 'hover:text-antique-gold hover:border-champagne-gold',
    },
    {
      name: 'Facebook',
      handle: settings.socials?.facebook || 'glowandgracecosmetics',
      icon: FacebookIcon,
      url: 'https://facebook.com',
      color: 'hover:text-blue-600 hover:border-blue-300',
    },
    {
      name: 'TikTok',
      handle: settings.socials?.tiktok || '@glowandgrace',
      icon: TikTokIcon,
      url: 'https://tiktok.com',
      color: 'hover:text-espresso hover:border-warm-border',
    },
  ];

  return (
    <section id="contact" className="py-20 lg:py-28 bg-ivory content-visibility-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-warm-border text-xs font-semibold text-antique-gold uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Storefront Concierge</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-espresso">
            Contact &amp; Store Location
          </h2>
          <p className="text-base text-muted-taupe">
            Connect via WhatsApp, direct phone, visit our Lahore physical boutique, or follow our social channels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Contact Cards, Social Media, & Quick Inquiry Form */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`https://wa.me/${whatsappNum}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-white border border-warm-border shadow-sm hover:shadow-md hover:border-whatsapp/40 transition-all group flex flex-col justify-between"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-whatsapp flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-whatsapp group-hover:text-white transition-all">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase text-whatsapp font-bold">Fastest Response</span>
                  <h4 className="font-serif text-base font-semibold text-espresso mt-0.5">WhatsApp Chat</h4>
                  <p className="text-xs text-muted-taupe font-mono mt-1">+{whatsappNum}</p>
                </div>
              </a>

              <a
                href={`tel:+${whatsappNum}`}
                className="p-5 rounded-2xl bg-white border border-warm-border shadow-sm hover:shadow-md hover:border-champagne-gold transition-all group flex flex-col justify-between"
              >
                <div className="w-10 h-10 rounded-xl bg-surface-soft text-antique-gold flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-espresso group-hover:text-white transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase text-antique-gold font-bold">Store Phone</span>
                  <h4 className="font-serif text-base font-semibold text-espresso mt-0.5">Direct Voice Call</h4>
                  <p className="text-xs text-muted-taupe font-mono mt-1">{phoneNum}</p>
                </div>
              </a>
            </div>

            {/* Address & Hours Detail Card */}
            <div className="p-6 rounded-2xl bg-white border border-warm-border shadow-sm space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-antique-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-espresso">Physical Store Location</h4>
                  <p className="text-xs sm:text-sm text-muted-taupe mt-0.5">
                    {fullAddress}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-warm-border/70">
                <Clock className="w-5 h-5 text-antique-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-espresso">Operating Schedule</h4>
                  <p className="text-xs text-mocha mt-0.5">
                    Mon &ndash; Sat: 10:00 AM &ndash; 9:00 PM (PKT)
                  </p>
                  <p className="text-xs text-muted-taupe">
                    Sun: 2:00 PM &ndash; 8:00 PM (Online Concierge)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-warm-border/70">
                <Mail className="w-5 h-5 text-antique-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-espresso">Concierge Email</h4>
                  <p className="text-xs text-muted-taupe mt-0.5">{settings.email || 'concierge@glowandgrace.pk'}</p>
                </div>
              </div>
            </div>

            {/* Social Media Channels */}
            <div className="p-6 rounded-2xl bg-white border border-warm-border shadow-sm space-y-3">
              <h4 className="font-serif text-base font-semibold text-espresso">Follow Our Social Channels</h4>
              <p className="text-xs text-muted-taupe">
                Catch new arrivals, vanity swatches, and daily makeup masterclasses:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex flex-col items-center text-center p-3 rounded-xl border border-warm-border bg-ivory/70 transition-all ${social.color}`}
                    >
                      <Icon className="w-5 h-5 mb-1" />
                      <span className="text-xs font-semibold text-espresso">{social.name}</span>
                      <span className="text-[10px] text-muted-taupe truncate w-full">{social.handle}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <form onSubmit={handleInquirySubmit} className="p-6 rounded-2xl bg-white border border-warm-border shadow-sm space-y-4">
              <h4 className="font-serif text-lg font-semibold text-espresso">Send Instant Message</h4>
              <div>
                <label htmlFor="inquiry-name" className="block text-xs font-medium text-mocha mb-1">
                  Your Full Name
                </label>
                <input
                  id="inquiry-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ayesha Khan"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-warm-border text-sm text-espresso placeholder-muted-taupe/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-antique-gold"
                />
              </div>

              <div>
                <label htmlFor="inquiry-topic" className="block text-xs font-medium text-mocha mb-1">
                  Topic
                </label>
                <select
                  id="inquiry-topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-warm-border text-sm text-espresso bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-antique-gold"
                >
                  <option value="Product Availability">Product Availability</option>
                  <option value="Special Offer GLOW20">Special Offer GLOW20</option>
                  <option value="Shade Matching Assistance">Shade Matching Assistance</option>
                  <option value="Watches & Accessories">Watches & Accessories</option>
                  <option value="Delivery Status">Delivery Status</option>
                </select>
              </div>

              <div>
                <label htmlFor="inquiry-note" className="block text-xs font-medium text-mocha mb-1">
                  Your Note
                </label>
                <textarea
                  id="inquiry-note"
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Tell us what you're looking for..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-warm-border text-sm text-espresso placeholder-muted-taupe/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-antique-gold resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="whatsapp"
                fullWidth
                size="md"
                icon={<Send className="w-4 h-4" />}
              >
                Forward to WhatsApp
              </Button>
            </form>

          </div>

          {/* Right Column: Responsive Google Maps Embed */}
          <div className="lg:col-span-7 h-full">
            <div className="relative rounded-3xl overflow-hidden border border-warm-border shadow-lg bg-white p-2">
              <div className="relative w-full h-[460px] lg:h-[720px] rounded-2xl overflow-hidden bg-surface-soft">
                <iframe
                  title="Glow and Grace Boutique MM Alam Road Lahore Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13606.398679461125!2d74.34860472421376!3d31.50764121406853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919045a55555555%3A0x123456789abcdef!2sM.M.+Alam+Rd%2C+Gulberg+III%2C+Lahore%2C+Punjab%2C+Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  sandbox="allow-scripts"
                  className="w-full h-full filter saturate-105"
                />
                
                {/* Floating overlay over map */}
                <div className="absolute top-4 left-4 right-4 sm:right-auto sm:max-w-xs p-4 rounded-xl backdrop-blur-md bg-white/95 border border-warm-border shadow-md">
                  <div className="flex items-center gap-2 text-antique-gold font-serif font-bold text-sm">
                    <Sparkles className="w-4 h-4" />
                    <span>Glow &amp; Grace Flagship Boutique</span>
                  </div>
                  <p className="text-xs text-muted-taupe mt-1">
                    MM Alam Road, Gulberg III, Lahore. Valet parking &amp; tester vanity lounge available.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
