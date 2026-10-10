import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'blush' | 'neutral' | 'success' | 'gold';
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'blush',
  className = '',
  size = 'sm',
}) => {
  const sizeStyles = size === 'sm' ? 'text-[11px] px-2.5 py-0.5' : 'text-xs px-3 py-1';

  const variantStyles = {
    primary: 'bg-primary text-white font-medium shadow-sm',
    blush: 'bg-rose-50 text-primary border border-rose-200/80 font-medium',
    neutral: 'bg-stone-100 text-stone-700 border border-stone-200/60 font-medium',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-medium',
    gold: 'bg-amber-50 text-amber-800 border border-amber-200 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full tracking-wide uppercase ${sizeStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

