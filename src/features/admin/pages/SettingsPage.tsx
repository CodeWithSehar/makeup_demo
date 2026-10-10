import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useAppData } from '../../../store/useAppData';
import { AdminHeader } from '../../../components/admin/AdminHeader';
import { Button } from '../../../components/common/Button';
import { ConfirmDialog } from '../../../components/common/ConfirmDialog';
import {
  Save,
  RotateCcw,
  Store,
  Truck,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Share2,
} from 'lucide-react';
import type { ShopSettings } from '../../../types/shopSettings';

export const SettingsPage: React.FC = () => {
  const { onOpenSidebar } = useOutletContext<{ onOpenSidebar: () => void }>();
  const { settings, updateSettings, resetCatalog } = useAppData();

  const [formData, setFormData] = useState<ShopSettings>(() => ({ ...settings }));
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleChange = (field: keyof ShopSettings, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsSaved(false);
  };

  const handleHeroChange = (field: keyof ShopSettings['hero'], value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      hero: { ...prev.hero, [field]: value },
    }));
    setIsSaved(false);
  };

  const handlePoliciesChange = (field: keyof ShopSettings['policies'], value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      policies: { ...prev.policies, [field]: value },
    }));
    setIsSaved(false);
  };

  const handleSocialsChange = (field: keyof ShopSettings['socials'], value: string) => {
    setFormData((prev) => ({
      ...prev,
      socials: { ...(prev.socials || { instagram: '', facebook: '', tiktok: '' }), [field]: value },
    }));
    setIsSaved(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSettings(formData);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3500);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetCatalog = async () => {
    setShowResetConfirm(false);
    await resetCatalog();
    setFormData({ ...settings });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Storefront Settings"
        subtitle="Brand profile, delivery pricing rules, hero banner promotion, and policy guarantees"
        onOpenSidebar={onOpenSidebar}
        actions={
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              icon={<RotateCcw className="w-4 h-4 text-rose-600" />}
              onClick={() => setShowResetConfirm(true)}
            >
              Reset to Defaults
            </Button>
            <Button
              type="submit"
              form="store-settings-form"
              variant="primary"
              size="sm"
              disabled={isSaving}
              icon={<Save className="w-4 h-4" />}
            >
              {isSaving ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        }
      />

      {isSaved && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>Success:</strong> Settings have been updated and synced with the Customer Storefront!
          </span>
        </div>
      )}

      <form id="store-settings-form" onSubmit={handleSave} className="space-y-6">
        {/* 1. Brand Profile & Concierge Contact */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-stone-100">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-primary flex items-center justify-center">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-stone-900">Brand Identity &amp; Contact</h2>
              <p className="text-xs text-stone-500">Shop name, WhatsApp concierge, and boutique address</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="shopName" className="block text-xs font-semibold text-stone-700 mb-1">
                Shop / Brand Name
              </label>
              <input
                id="shopName"
                type="text"
                required
                value={formData.shopName}
                onChange={(e) => handleChange('shopName', e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="tagline" className="block text-xs font-semibold text-stone-700 mb-1">
                Boutique Tagline
              </label>
              <input
                id="tagline"
                type="text"
                value={formData.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="whatsappNumber" className="block text-xs font-semibold text-stone-700 mb-1">
                WhatsApp Number (with country code, digits only)
              </label>
              <input
                id="whatsappNumber"
                type="text"
                required
                value={formData.whatsappNumber}
                onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                placeholder="923434113012"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs font-semibold text-stone-700 mb-1">
                Display Phone
              </label>
              <input
                id="phone"
                type="text"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="0343-4113012"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-stone-700 mb-1">
                Concierge Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="city" className="block text-xs font-semibold text-stone-700 mb-1">
                City / Region
              </label>
              <input
                id="city"
                type="text"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                placeholder="Lahore, Pakistan"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-xs font-semibold text-stone-700 mb-1">
                Physical Store Address
              </label>
              <input
                id="address"
                type="text"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="MM Alam Road, Gulberg III"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* 2. Delivery & Checkout Rules */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-stone-100">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-stone-900">Delivery &amp; Checkout Rules</h2>
              <p className="text-xs text-stone-500">Shipping rates and free nationwide delivery qualifying minimum</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="freeDeliveryThreshold" className="block text-xs font-semibold text-stone-700 mb-1">
                Free Delivery Threshold (PKR)
              </label>
              <input
                id="freeDeliveryThreshold"
                type="number"
                min="0"
                step="100"
                value={formData.freeDeliveryThreshold}
                onChange={(e) => handleChange('freeDeliveryThreshold', Number(e.target.value))}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono"
              />
              <p className="text-[11px] text-stone-400 mt-1">Orders above this amount qualify for Rs. 0 delivery.</p>
            </div>

            <div>
              <label htmlFor="standardDeliveryFee" className="block text-xs font-semibold text-stone-700 mb-1">
                Standard Nationwide Shipping (PKR)
              </label>
              <input
                id="standardDeliveryFee"
                type="number"
                min="0"
                step="50"
                value={formData.standardDeliveryFee}
                onChange={(e) => handleChange('standardDeliveryFee', Number(e.target.value))}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono"
              />
              <p className="text-[11px] text-stone-400 mt-1">Charged when cart subtotal is below the free delivery minimum.</p>
            </div>
          </div>
        </div>

        {/* 3. Hero Banner & Promo Settings */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-stone-100">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-stone-900">Hero Banner &amp; Promotion Copy</h2>
              <p className="text-xs text-stone-500">Featured collection headline, promotional copy, and banner image</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="heroBadgeText" className="block text-xs font-semibold text-stone-700 mb-1">
                Season / Badge Pill Text
              </label>
              <input
                id="heroBadgeText"
                type="text"
                value={formData.hero.badgeText}
                onChange={(e) => handleHeroChange('badgeText', e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="heroHeadline" className="block text-xs font-semibold text-stone-700 mb-1">
                Hero Headline
              </label>
              <input
                id="heroHeadline"
                type="text"
                value={formData.hero.headline}
                onChange={(e) => handleHeroChange('headline', e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-serif font-bold text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="heroSubheadline" className="block text-xs font-semibold text-stone-700 mb-1">
                Hero Subheadline / Value Proposition
              </label>
              <textarea
                id="heroSubheadline"
                rows={3}
                value={formData.hero.subheadline}
                onChange={(e) => handleHeroChange('subheadline', e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="heroPromoCode" className="block text-xs font-semibold text-stone-700 mb-1">
                Hero Featured Promo Code
              </label>
              <input
                id="heroPromoCode"
                type="text"
                value={formData.hero.promoCode}
                onChange={(e) => handleHeroChange('promoCode', e.target.value.toUpperCase())}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono uppercase"
              />
            </div>

            <div>
              <label htmlFor="heroPromoDiscountPercent" className="block text-xs font-semibold text-stone-700 mb-1">
                Discount Percentage (% Off)
              </label>
              <input
                id="heroPromoDiscountPercent"
                type="number"
                min="1"
                max="90"
                value={formData.hero.promoDiscountPercent}
                onChange={(e) => handleHeroChange('promoDiscountPercent', Number(e.target.value))}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="heroImageUrl" className="block text-xs font-semibold text-stone-700 mb-1">
                Hero Banner Image URL
              </label>
              <div className="flex gap-2">
                <input
                  id="heroImageUrl"
                  type="url"
                  value={formData.hero.heroImageUrl}
                  onChange={(e) => handleHeroChange('heroImageUrl', e.target.value)}
                  className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono"
                />
                {formData.hero.heroImageUrl && (
                  <a
                    href={formData.hero.heroImageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 border border-stone-200 rounded-xl hover:bg-stone-50 flex items-center justify-center text-stone-600"
                    title="View Image"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Customer Trust & Policies */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-stone-100">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-stone-900">Store Trust Guarantees &amp; Policy Notice</h2>
              <p className="text-xs text-stone-500">Badges displayed across product pages, cart, and footer</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="authenticityNotice" className="block text-xs font-semibold text-stone-700 mb-1">
                Authenticity Guarantee Notice
              </label>
              <input
                id="authenticityNotice"
                type="text"
                value={formData.policies.authenticityNotice}
                onChange={(e) => handlePoliciesChange('authenticityNotice', e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="deliveryPromise" className="block text-xs font-semibold text-stone-700 mb-1">
                Nationwide Delivery Promise
              </label>
              <input
                id="deliveryPromise"
                type="text"
                value={formData.policies.deliveryPromise}
                onChange={(e) => handlePoliciesChange('deliveryPromise', e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="exchangePolicy" className="block text-xs font-semibold text-stone-700 mb-1">
                Return / Exchange Policy Notice
              </label>
              <input
                id="exchangePolicy"
                type="text"
                value={formData.policies.exchangePolicy}
                onChange={(e) => handlePoliciesChange('exchangePolicy', e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* 5. Social Media Links */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-stone-100">
            <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-stone-900">Social Media Links</h2>
              <p className="text-xs text-stone-500">
                Instagram, Facebook, and TikTok handles linked across the storefront footer
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="instagramHandle" className="block text-xs font-semibold text-stone-700 mb-1">
                Instagram Handle
              </label>
              <input
                id="instagramHandle"
                type="text"
                value={formData.socials?.instagram || ''}
                onChange={(e) => handleSocialsChange('instagram', e.target.value)}
                placeholder="@glowandgrace.pk"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="facebookHandle" className="block text-xs font-semibold text-stone-700 mb-1">
                Facebook Page / Handle
              </label>
              <input
                id="facebookHandle"
                type="text"
                value={formData.socials?.facebook || ''}
                onChange={(e) => handleSocialsChange('facebook', e.target.value)}
                placeholder="glowandgracecosmetics"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="tiktokHandle" className="block text-xs font-semibold text-stone-700 mb-1">
                TikTok Handle
              </label>
              <input
                id="tiktokHandle"
                type="text"
                value={formData.socials?.tiktok || ''}
                onChange={(e) => handleSocialsChange('tiktok', e.target.value)}
                placeholder="@glowandgrace"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isSaving}
            icon={<Save className="w-4 h-4" />}
          >
            {isSaving ? 'Saving...' : 'Save All Changes'}
          </Button>
        </div>
      </form>

      {/* Reset Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showResetConfirm}
        title="Reset Entire Catalog & Settings?"
        message="This will restore all default mock products, inventory counts, promotional codes, and storefront configuration. Any customized products or settings will be restored to initial defaults."
        confirmLabel="Yes, Reset to Default"
        isDestructive={true}
        onConfirm={handleResetCatalog}
        onCancel={() => setShowResetConfirm(false)}
      />
    </div>
  );
};
