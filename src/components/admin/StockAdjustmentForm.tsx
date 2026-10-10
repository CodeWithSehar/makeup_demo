import React, { useState } from 'react';
import type { Product } from '../../types';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { Plus, Minus } from 'lucide-react';

export interface StockAdjustmentFormProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAdjust: (productId: number, change: number, reason: string) => Promise<void>;
}

export const StockAdjustmentForm: React.FC<StockAdjustmentFormProps> = ({
  product,
  isOpen,
  onClose,
  onAdjust,
}) => {
  const [adjustmentType, setAdjustmentType] = useState<'add' | 'remove'>('add');
  const [quantity, setQuantity] = useState<number>(5);
  const [reason, setReason] = useState<string>('Inventory restock received');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!product) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity <= 0) return;

    const change = adjustmentType === 'add' ? quantity : -quantity;
    setIsSubmitting(true);
    try {
      await onAdjust(product.id, change, reason);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const newProjectedStock =
    adjustmentType === 'add' ? product.stock + quantity : Math.max(0, product.stock - quantity);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Adjust Inventory Stock" maxWidth="md">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 border border-stone-200">
          <img
            src={product.image}
            alt={product.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <h4 className="font-semibold text-xs text-stone-900">{product.name}</h4>
            <p className="text-[11px] text-stone-500 font-mono">
              Current Available Stock: <strong>{product.stock} units</strong>
            </p>
          </div>
        </div>

        {/* Action Type */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              setAdjustmentType('add');
              setReason('Shipment restock received');
            }}
            className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold cursor-pointer transition-all ${
              adjustmentType === 'add'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800 ring-1 ring-emerald-300'
                : 'border-stone-200 text-stone-600 hover:bg-stone-50'
            }`}
          >
            <Plus className="w-4 h-4 text-emerald-600" />
            <span>Add Units (Restock)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setAdjustmentType('remove');
              setReason('Damaged / tester unit removed');
            }}
            className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold cursor-pointer transition-all ${
              adjustmentType === 'remove'
                ? 'bg-rose-50 border-rose-300 text-rose-800 ring-1 ring-rose-300'
                : 'border-stone-200 text-stone-600 hover:bg-stone-50'
            }`}
          >
            <Minus className="w-4 h-4 text-rose-600" />
            <span>Deduct Units (Removal)</span>
          </button>
        </div>

        {/* Quantity */}
        <div>
          <label htmlFor="adjustment-quantity-input" className="block text-xs font-semibold text-stone-700 mb-1">
            Quantity to {adjustmentType === 'add' ? 'Add' : 'Deduct'}
          </label>
          <input
            id="adjustment-quantity-input"
            type="number"
            min={1}
            max={adjustmentType === 'remove' ? product.stock : 9999}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
            className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm font-bold font-mono focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Reason */}
        <div>
          <label htmlFor="adjustment-reason-input" className="block text-xs font-semibold text-stone-700 mb-1">
            Audit Reason for Movement Log
          </label>
          <input
            id="adjustment-reason-input"
            type="text"
            required
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Supplier batch received, tester allocated..."
            className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Projected Stock Preview */}
        <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-100 flex items-center justify-between text-xs">
          <span className="text-stone-600 font-medium">New Projected Stock:</span>
          <span className="font-mono font-bold text-primary text-sm">
            {newProjectedStock} units
          </span>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
          <Button variant="outline" size="sm" type="button" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Recording...' : 'Confirm Stock Adjustment'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
