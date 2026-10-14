import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserRound, LogIn, LayoutDashboard, LogOut } from 'lucide-react';
import { authService } from '../../services/authService';

/**
 * Header account menu. Customers see a single "Staff sign in" entry;
 * once signed in, the menu exposes the Admin Portal and Sign out.
 */
export const AccountMenu: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const handlePointer = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const toggle = () => {
    // Refresh session state each time the menu opens
    if (!open) setUser(authService.getCurrentUser());
    setOpen((prev) => !prev);
  };

  const handleSignOut = () => {
    authService.logout();
    setUser(null);
    setOpen(false);
    navigate('/');
  };

  const itemClass =
    'flex w-full items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-mocha hover:bg-surface-soft hover:text-espresso transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-antique-gold cursor-pointer';

  // Signed out: a clear, labelled Log in button that leads to the login screen
  if (!user) {
    return (
      <Link
        to="/admin/login"
        aria-label="Log in"
        className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 rounded-full border border-warm-border text-mocha hover:text-espresso hover:border-antique-gold hover:bg-surface-soft text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-antique-gold"
      >
        <LogIn className="w-4 h-4" />
        <span className="hidden sm:inline">Log in</span>
      </Link>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Account menu"
        className="relative p-2 text-mocha hover:text-espresso hover:bg-surface-soft rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-antique-gold cursor-pointer"
      >
        <UserRound className="w-5 h-5" />
        {user && (
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-success ring-2 ring-white" aria-hidden="true" />
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-warm-border shadow-xl shadow-stone-900/10 p-2 z-50"
        >
          {user ? (
            <>
              <div className="px-3 py-2 border-b border-warm-border/60 mb-1">
                <p className="text-xs text-muted-taupe">Signed in as</p>
                <p className="text-sm font-semibold text-espresso truncate">{user.name}</p>
              </div>
              <Link to="/admin" role="menuitem" onClick={() => setOpen(false)} className={itemClass}>
                <LayoutDashboard className="w-4 h-4" />
                <span>Admin Portal</span>
              </Link>
              <button type="button" role="menuitem" onClick={handleSignOut} className={itemClass}>
                <LogOut className="w-4 h-4" />
                <span>Sign out</span>
              </button>
            </>
          ) : (
            <Link to="/admin/login" role="menuitem" onClick={() => setOpen(false)} className={itemClass}>
              <LogIn className="w-4 h-4" />
              <span>Staff sign in</span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

