import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useAppData } from '../../../store/useAppData';
import { AdminHeader } from '../../../components/admin/AdminHeader';
import { Modal } from '../../../components/common/Modal';
import { Button } from '../../../components/common/Button';
import { Plus, Trash2 } from 'lucide-react';
import type { Promotion, PromotionStatus } from '../../../types';

export const PromotionsPage: React.FC = () => {
  const { onOpenSidebar } = useOutletContext<{ onOpenSidebar: () => void }>();
  const { promotions, createPromotion, updatePromotion, deletePromotion } = useAppData();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [code, setCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState<number>(20);
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<PromotionStatus>('active');
  const [minOrderAmount, setMinOrderAmount] = useState<number | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setIsSubmitting(true);
    try {
      await createPromotion({
        code: code.trim().toUpperCase(),
        discountPercentage,
        description,
        status,
        minOrderAmount,
      });
      setIsCreateOpen(false);
      setCode('');
      setDescription('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (promo: Promotion) => {
    const nextStatus: PromotionStatus = promo.status === 'active' ? 'expired' : 'active';
    await updatePromotion(promo.id, { status: nextStatus });
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Promotions &amp; Coupons"
        subtitle="Create scheduled flash discounts, percentage-off codes, and seasonal promos"
        onOpenSidebar={onOpenSidebar}
        actions={
          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsCreateOpen(true)}
          >
            Create Coupon
          </Button>
        }
      />

      {/* Promotions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotions.map((promo) => {
          const isActive = promo.status === 'active';
          const isScheduled = promo.status === 'scheduled';

          return (
            <div
              key={promo.id}
              className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-stone-300 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xl font-bold tracking-wider text-primary px-3 py-1 bg-rose-50 rounded-lg border border-rose-100">
                    {promo.code}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(promo)}
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold cursor-pointer ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : isScheduled
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-stone-100 text-stone-500'
                    }`}
                  >
                    {promo.status.toUpperCase()}
                  </button>
                </div>

                <div>
                  <h4 className="font-serif text-lg font-bold text-stone-900">
                    {promo.discountPercentage}% Discount
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed mt-1">
                    {promo.description}
                  </p>
                </div>

                {promo.minOrderAmount && (
                  <p className="text-[11px] font-mono text-stone-500">
                    Min order requirement: Rs. {promo.minOrderAmount.toLocaleString()}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[10px] text-stone-400 font-mono">
                  {promo.startDate ? `${promo.startDate} to ${promo.endDate}` : 'No expiry set'}
                </span>

                <button
                  type="button"
                  onClick={() => deletePromotion(promo.id)}
                  className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Delete Coupon"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Coupon Modal */}
      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create New Promo Code">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label htmlFor="promo-code-input" className="block text-xs font-semibold text-stone-700 mb-1">Coupon Code *</label>
            <input
              id="promo-code-input"
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="e.g. FLASH30"
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-mono font-bold uppercase focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="promo-discount-input" className="block text-xs font-semibold text-stone-700 mb-1">Discount % *</label>
              <input
                id="promo-discount-input"
                type="number"
                required
                min={1}
                max={90}
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-mono font-bold"
              />
            </div>
            <div>
              <label htmlFor="promo-status-select" className="block text-xs font-semibold text-stone-700 mb-1">Status</label>
              <select
                id="promo-status-select"
                value={status}
                onChange={(e) => setStatus(e.target.value as PromotionStatus)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs bg-white"
              >
                <option value="active">Active Now</option>
                <option value="scheduled">Scheduled</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="promo-desc-input" className="block text-xs font-semibold text-stone-700 mb-1">Description</label>
            <textarea
              id="promo-desc-input"
              rows={2}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. 20% off all perfumes for the weekend"
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
            />
          </div>

          <div>
            <label htmlFor="promo-min-order-input" className="block text-xs font-semibold text-stone-700 mb-1">Minimum Order Amount (Optional)</label>
            <input
              id="promo-min-order-input"
              type="number"
              min={0}
              value={minOrderAmount || ''}
              onChange={(e) => setMinOrderAmount(Number(e.target.value) || undefined)}
              placeholder="e.g. 5000"
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-mono"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Promo Code'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
