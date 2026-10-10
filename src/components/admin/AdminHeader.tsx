import React from 'react';
import { Menu, User } from 'lucide-react';
import { authService } from '../../services/authService';

export interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  onOpenSidebar: () => void;
  actions?: React.ReactNode;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  title,
  subtitle,
  onOpenSidebar,
  actions,
}) => {
  const user = authService.getCurrentUser();

  return (
    <header className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between gap-4 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          aria-label="Open sidebar"
          className="lg:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100 cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-tight">
            {title}
          </h1>
          {subtitle && <p className="text-xs text-stone-500 font-mono mt-0.5">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {actions && <div>{actions}</div>}

        <div className="hidden sm:flex items-center gap-2.5 pl-3 border-l border-stone-200">
          <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200 text-primary flex items-center justify-center font-bold text-xs">
            <User className="w-4 h-4" />
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold text-stone-900 block leading-tight">
              {user?.name || 'Store Manager'}
            </span>
            <span className="text-[10px] text-stone-400 font-mono block">
              {user?.email || 'admin@glowandgrace.pk'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
