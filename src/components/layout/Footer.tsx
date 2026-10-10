import React from 'react';
import { Sparkles, MessageCircle, Phone, MapPin, Mail, Heart, Clock, ShieldCheck } from 'lucide-react';
import { SHOP_WHATSAPP_NUMBER, generateWhatsAppGeneralUrl } from '../../utils/whatsapp';
import { useAppData } from '../../store/useAppData';
import { InstagramIcon, FacebookIcon, TikTokIcon } from '../common/SocialIcons';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const { settings } = useAppData();
  const whatsappNum = settings.whatsappNumber || SHOP_WHATSAPP_NUMBER;
  const phoneNum = settings.phone || '0343-4113012';
  const fullAddress = `${settings.address}, ${settings.city}`;

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-10 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                {settings.shopName}
              </span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              Curating luxury makeup, skincare, haircare, perfumes, watches, and accessories. 100% authentic, delivered with care across Pakistan.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-pink-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-blue-600 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
            </div>
            <div className="flex items-center gap-2 pt-1 text-xs text-rose-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Authentic Pakistani Boutique</span>
            </div>
          </div>

          {/* Quick Departments */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white font-mono">
              Shop Departments
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#shop" className="hover:text-rose-400 transition-colors">
                  Makeup Essentials
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-rose-400 transition-colors">
                  Dermatological Skincare
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-rose-400 transition-colors">
                  Botanical Haircare
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-rose-400 transition-colors">
                  Artisanal Perfumes &amp; Oud
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-rose-400 transition-colors">
                  Prestige Watches
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-rose-400 transition-colors">
                  Jewelry &amp; Accessories
                </a>
              </li>
            </ul>
          </div>

          {/* Operating Hours & Dispatch */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white font-mono">
              Order Dispatch &amp; Hours
            </h4>
            <div className="space-y-2 text-sm text-stone-400">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Monday – Saturday</p>
                  <p className="text-xs">10:00 AM – 9:00 PM (PKT)</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Sunday</p>
                  <p className="text-xs">2:00 PM – 8:00 PM (WhatsApp Concierge)</p>
                </div>
              </div>
              <p className="text-xs text-stone-400 pt-2 border-t border-stone-800">
                Same-day dispatch for orders confirmed before 3:00 PM PKT.
              </p>
            </div>
          </div>

          {/* Direct WhatsApp Ordering */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white font-mono">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={generateWhatsAppGeneralUrl(`Hello ${settings.shopName}! I would like to inquire about your products.`, whatsappNum)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>WhatsApp: +{whatsappNum}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:+${whatsappNum}`}
                  className="flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-primary shrink-0" />
                  <span>Call: {phoneNum}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-stone-400">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{fullAddress}</span>
              </li>
              <li className="flex items-center gap-2.5 text-stone-400">
                <Mail className="w-4 h-4 text-stone-500 shrink-0" />
                <span>{settings.email || 'concierge@glowandgrace.pk'}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>
            &copy; {CURRENT_YEAR} Glow &amp; Grace Cosmetics. All rights reserved. Handcrafted with luxury standards.
          </p>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Delivered across Pakistan with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>&amp; care</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
