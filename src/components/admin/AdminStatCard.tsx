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
    primary: 'bg-rose-50 text-primary border-rose-100',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
    stone: 'bg-stone-50 text-stone-800 border-stone-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
  }[variant];

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex items-center justify-between gap-4">
      <div className="space-y-1">
        <span className="text-xs font-mono uppercase text-stone-500 font-semibold tracking-wider block">
          {label}
        </span>
        <p className="font-serif text-2xl font-bold text-stone-900">{value}</p>
        {change && <p className="text-[11px] text-stone-500 font-mono">{change}</p>}
      </div>

      <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${variantStyles}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
};

