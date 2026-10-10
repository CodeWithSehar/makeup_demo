import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Boxes,
  ShoppingBag,
  Tag,
  Settings,
  ExternalLink,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { authService } from '../../services/authService';

export const AdminSidebar: React.FC<{ isOpen?: boolean; onClose?: () => void }> = ({
  isOpen = true,
  onClose,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Products', path: '/admin/products', icon: Package },
    { label: 'Inventory', path: '/admin/inventory', icon: Boxes },
    { label: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    { label: 'Promotions', path: '/admin/promotions', icon: Tag },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-stone-900 text-stone-300 flex flex-col justify-between border-r border-stone-800 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-white tracking-tight block">
                Glow &amp; Grace
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 font-semibold block">
                Admin Portal
              </span>
            </div>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden text-stone-400 hover:text-white p-1"
            >
              &times;
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5" aria-label="Admin Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/admin'}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-sm shadow-rose-950/20 font-semibold'
                      : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-stone-800 space-y-2">
        <NavLink
          to="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-rose-400" />
            <span>Customer Storefront</span>
          </span>
          <span className="text-[10px] font-mono bg-stone-800 px-1.5 py-0.5 rounded">Live</span>
        </NavLink>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

