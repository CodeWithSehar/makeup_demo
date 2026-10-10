import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Sliders, Save, RotateCcw, AlertTriangle, CheckCircle, Package, ExternalLink } from 'lucide-react';
import { useStore } from '../../context/useStore';
import { formatPKR } from '../../utils/formatCurrency';
import type { HeroConfig } from '../../types';

interface AdminHeroFormProps {
  heroConfig: HeroConfig;
  onSave: (updated: HeroConfig) => void;
}

const AdminHeroForm: React.FC<AdminHeroFormProps> = ({ heroConfig, onSave }) => {
  const [localHero, setLocalHero] = useState(heroConfig);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(localHero);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-5 rounded-2xl bg-stone-50 border border-stone-200">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-stone-900 font-mono uppercase tracking-wider flex items-center gap-2">
          <Sliders className="w-4 h-4 text-primary" />
          <span>Configurable Hero Banner</span>
        </h3>
        <span className="text-[10px] bg-rose-100 text-primary px-2 py-0.5 rounded-full font-mono">
          Live Sync
        </span>
      </div>

      <div>
        <label htmlFor="drawerHeroBadge" className="text-xs font-semibold text-stone-700 block mb-1">
          Promotional Badge Text
        </label>
        <input
          id="drawerHeroBadge"
          type="text"
          value={localHero.badgeText}
          onChange={(e) => setLocalHero({ ...localHero, badgeText: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div>
        <label htmlFor="drawerHeroHeadline" className="text-xs font-semibold text-stone-700 block mb-1">
          Main Headline
        </label>
        <input
          id="drawerHeroHeadline"
          type="text"
          value={localHero.headline}
          onChange={(e) => setLocalHero({ ...localHero, headline: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div>
        <label htmlFor="drawerHeroSubheadline" className="text-xs font-semibold text-stone-700 block mb-1">
          Subheadline / Value Prop
        </label>
        <textarea
          id="drawerHeroSubheadline"
          rows={2}
          value={localHero.subheadline}
          onChange={(e) => setLocalHero({ ...localHero, subheadline: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-primary resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="drawerHeroPromoCode" className="text-xs font-semibold text-stone-700 block mb-1">
            Active Promo Code
          </label>
          <input
            id="drawerHeroPromoCode"
            type="text"
            value={localHero.promoCode}
            onChange={(e) => setLocalHero({ ...localHero, promoCode: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs bg-white font-mono uppercase"
          />
        </div>
        <div>
          <label htmlFor="drawerHeroDiscount" className="text-xs font-semibold text-stone-700 block mb-1">
            Discount %
          </label>
          <input
            id="drawerHeroDiscount"
            type="number"
            value={localHero.promoDiscountPercent}
            onChange={(e) => setLocalHero({ ...localHero, promoDiscountPercent: Number(e.target.value) })}
            className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs bg-white font-mono"
          />
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-xs font-semibold shadow-sm transition-all cursor-pointer"
      >
        <Save className="w-3.5 h-3.5" />
        <span>Save Hero Changes</span>
      </button>
    </form>
  );
};

export const AdminDrawer: React.FC = () => {
  const {
    products,
    heroConfig,
    isAdminOpen,
    setIsAdminOpen,
    updateProductStock,
    updateHeroConfig,
    resetToDefaultCatalog,
  } = useStore();

  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAdminOpen) {
        setIsAdminOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminOpen, setIsAdminOpen]);

  if (!isAdminOpen) return null;

  const handleSaveHero = (updated: HeroConfig) => {
    updateHeroConfig(updated);
    setSuccessToast('Hero banner updated live on storefront!');
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleStockChange = (productId: number, val: number) => {
    updateProductStock(productId, Math.max(0, val));
    setSuccessToast(`Stock updated! Storefront reflected instantly.`);
    setTimeout(() => setSuccessToast(null), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-drawer-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsAdminOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-white shadow-2xl border-l border-stone-200 flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-200 bg-stone-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h2 id="admin-drawer-title" className="font-serif text-lg font-bold">
                  Storefront Manager (No Redeploy)
                </h2>
                <p className="text-xs text-stone-400 font-mono">
                  Real-time stock controls &amp; hero merchandising
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsAdminOpen(false)}
              aria-label="Close Admin"
              className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Success Toast */}
          {successToast && (
            <div className="bg-emerald-50 border-b border-emerald-200 px-5 py-2.5 text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successToast}</span>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            
            {/* 1. Hero Banner Merchandising Config (Inner form with key for state sync) */}
            <AdminHeroForm
              key={`${heroConfig.badgeText}-${heroConfig.headline}`}
              heroConfig={heroConfig}
              onSave={handleSaveHero}
            />

            {/* 2. Stock Visibility & Inventory Manager */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-stone-900 font-mono uppercase tracking-wider flex items-center gap-2">
                    <Package className="w-4 h-4 text-primary" />
                    <span>Inventory &amp; Stock Levels</span>
                  </h3>
                  <p className="text-xs text-stone-500">
                    Set stock to 0 for &ldquo;Out of stock&rdquo; or &le; 3 for &ldquo;Only X left&rdquo;.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {products.map((p) => {
                  const isOutOfStock = p.stock === 0;
                  const isLowStock = p.stock > 0 && p.stock <= 3;

                  return (
                    <div
                      key={p.id}
                      className="p-3 rounded-xl border border-stone-200 bg-white hover:border-stone-300 transition-colors flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={p.image}
                          alt={p.name}
                          width={44}
                          height={44}
                          className="w-11 h-11 rounded-lg object-cover object-center bg-stone-100 shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="font-semibold text-stone-900 truncate">{p.name}</h4>
                          <p className="text-[11px] text-stone-500 font-mono">
                            {p.category} &bull; {formatPKR(p.price)}
                          </p>
                          <div className="mt-0.5">
                            {isOutOfStock ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                                <AlertTriangle className="w-3 h-3" />
                                Out of Stock (Ordering Disabled)
                              </span>
                            ) : isLowStock ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                                Only {p.stock} left
                              </span>
                            ) : (
                              <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                                In Stock ({p.stock} units)
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Stock Stepper */}
                      <div className="flex items-center gap-1 shrink-0">
                        <label htmlFor={`drawer-stock-${p.id}`} className="text-[11px] text-stone-500 font-mono">Units:</label>
                        <input
                          id={`drawer-stock-${p.id}`}
                          type="number"
                          min={0}
                          max={999}
                          value={p.stock}
                          onChange={(e) => handleStockChange(p.id, parseInt(e.target.value, 10) || 0)}
                          className="w-16 px-2 py-1 rounded border border-stone-300 text-center font-mono font-bold text-stone-900 focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Footer with Reset Button & Full Portal Link */}
          <div className="p-5 border-t border-stone-200 bg-stone-50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={resetToDefaultCatalog}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-rose-600 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>

              <Link
                to="/admin"
                onClick={() => setIsAdminOpen(false)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-dark transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Full Admin Portal</span>
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setIsAdminOpen(false)}
              className="w-full sm:w-auto px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-all cursor-pointer"
            >
              Close Manager
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

