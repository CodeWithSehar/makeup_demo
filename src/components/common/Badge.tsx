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
    primary: 'bg-espresso text-white font-medium shadow-sm',
    blush: 'bg-surface-soft text-mocha border border-warm-border font-medium',
    neutral: 'bg-ivory text-muted-taupe border border-warm-border/80 font-medium',
    success: 'bg-emerald-50 text-success border border-emerald-200/80 font-medium',
    gold: 'bg-surface-soft text-antique-gold border border-champagne-gold/60 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full tracking-wide uppercase ${sizeStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

