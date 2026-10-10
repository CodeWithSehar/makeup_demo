import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Phone, ShoppingCart, MessageCircle } from 'lucide-react';
import { SHOP_WHATSAPP_NUMBER, generateWhatsAppGeneralUrl } from '../../utils/whatsapp';
import { useStore } from '../../context/useStore';
import { useAppData } from '../../store/useAppData';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { cartCount, setIsCartOpen } = useStore();
  const { settings } = useAppData();

  const whatsappNum = settings.whatsappNumber || SHOP_WHATSAPP_NUMBER;

  // Monitor scroll for enhanced shadow state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Shop', href: '#shop' },
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 backdrop-blur-md bg-white/85 border-b border-rose-100/90 ${
        scrolled ? 'shadow-sm shadow-rose-950/5 py-3' : 'py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Title */}
          <a
            href="#home"
            className="group flex items-center gap-2.5 focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none rounded-lg p-1 -m-1"
            aria-label="Glow and Grace Cosmetics Home"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-rose-400 flex items-center justify-center text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-stone-900 group-hover:text-primary transition-colors">
                Glow &amp; Grace
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-rose-600/90 font-medium -mt-1">
                Luxury Cosmetics
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-stone-700 hover:text-primary transition-colors relative py-1 focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none rounded after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTA Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Shopping Cart Drawer Trigger */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label={`View cart with ${cartCount} items`}
              className="relative p-2 text-stone-700 hover:text-primary hover:bg-rose-50 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-rose-500 cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-white text-[10px] font-bold font-mono flex items-center justify-center shadow-xs animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </button>

            <a
              href={`tel:+${whatsappNum}`}
              className="hidden sm:flex p-2 text-stone-600 hover:text-primary hover:bg-rose-50 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-rose-500"
              title="Call Us Directly"
              aria-label="Call Store"
            >
              <Phone className="w-4 h-4" />
            </a>


            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              className="lg:hidden p-2 text-stone-700 hover:text-primary hover:bg-rose-50 rounded-lg focus-visible:ring-2 focus-visible:ring-rose-500 transition-colors cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 top-[65px] bg-stone-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Panel */}
      <div
        id="mobile-navigation"
        className={`fixed top-[65px] right-0 bottom-0 w-3/4 max-w-xs bg-white shadow-2xl z-50 p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out lg:hidden border-l border-rose-100 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Mobile Navigation Menu"
      >
        <div className="space-y-6">
          <div className="border-b border-rose-100 pb-4">
            <p className="text-xs uppercase font-semibold text-rose-500 tracking-wider">Quick Navigation</p>
          </div>
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-stone-800 hover:text-primary hover:pl-2 transition-all duration-200 py-1 border-b border-stone-50"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-rose-100 space-y-3">
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              setIsCartOpen(true);
            }}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-rose-50 border border-rose-200 text-primary text-xs font-semibold"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>View Cart ({cartCount})</span>
          </button>

          <a
            href={generateWhatsAppGeneralUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-emerald-500 hover:bg-[#128C7E] text-white text-sm font-semibold tracking-wide shadow-md shadow-emerald-500/20"
          >
            <MessageCircle className="w-4 h-4 fill-white/20" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
};
