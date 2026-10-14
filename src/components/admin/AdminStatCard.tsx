import React from 'react';
import type { LucideIcon } from 'lucide-react';

export interface AdminStatCardProps {
  label: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  variant?: 'primary' | 'emerald' | 'amber' | 'stone' | 'rose';
}

export const AdminStatCard: React.FC<AdminStatCardProps> = ({
  label,
  value,
  change,
  icon: Icon,
  variant = 'primary',
}) => {
  const variantStyles = {
    primary: 'bg-surface-soft text-antique-gold border-warm-border',
    emerald: 'bg-emerald-50 text-success border-emerald-100',
    amber: 'bg-amber-50 text-warning border-amber-100',
    stone: 'bg-ivory text-mocha border-warm-border',
    rose: 'bg-red-50 text-error border-red-200',
  }[variant];

  return (
    <div className="bg-white rounded-2xl border border-warm-border p-5 shadow-xs flex items-center justify-between gap-4">
      <div className="space-y-1">
        <span className="text-xs font-mono uppercase text-muted-taupe font-semibold tracking-wider block">
          {label}
        </span>
        <p className="font-serif text-2xl font-bold text-espresso">{value}</p>
        {change && <p className="text-[11px] text-muted-taupe font-mono">{change}</p>}
      </div>

      <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${variantStyles}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};

