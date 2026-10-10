import React from 'react';
import { Minus, Plus } from 'lucide-react';

export interface QuantityInputProps {
  quantity: number;
  onChange: (qty: number) => void;
  min?: number;
  max?: number;
  className?: string;
  size?: 'sm' | 'md';
}

export const QuantityInput: React.FC<QuantityInputProps> = ({
  quantity,
  onChange,
  min = 1,
  max = 20,
  className = '',
  size = 'md',
}) => {
  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseInt(e.target.value, 10);
    if (isNaN(parsed)) {
      onChange(min);
      return;
    }
    const clamped = Math.max(min, Math.min(max, parsed));
    onChange(clamped);
  };

  const btnSize = size === 'sm' ? 'w-7 h-7 text-xs' : 'w-8 h-8 text-sm';
  const inputSize = size === 'sm' ? 'w-9 text-xs h-7' : 'w-11 text-sm h-8';

  return (
    <div
      className={`inline-flex items-center rounded-full border border-rose-200/90 bg-white/95 p-0.5 shadow-sm ${className}`}
      role="group"
      aria-label="Quantity selector"
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
        className={`${btnSize} flex items-center justify-center rounded-full text-stone-600 transition-colors hover:bg-rose-50 hover:text-primary active:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-30 focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none`}
      >
        <Minus className="h-3.5 w-3.5" />
      </button>

      <input
        type="number"
        value={quantity}
        onChange={handleManualChange}
        min={min}
        max={max}
        aria-label="Selected quantity"
        className={`${inputSize} border-0 bg-transparent text-center font-semibold text-text-main focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
      />

      <button
        type="button"
        onClick={handleIncrement}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        className={`${btnSize} flex items-center justify-center rounded-full text-stone-600 transition-colors hover:bg-rose-50 hover:text-primary active:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-30 focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none`}
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};

