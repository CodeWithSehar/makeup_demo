import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Sparkles, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { authService } from '../../../services/authService';
import { Button } from '../../../components/common/Button';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const redirectTo =
    (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || '/admin';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = authService.login(email, password);
    if (res.success) {
      navigate(redirectTo, { replace: true });
    } else {
      setError(res.error || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen bg-espresso flex flex-col justify-center items-center p-4 selection:bg-antique-gold selection:text-white">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-warm-border space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-espresso via-mocha to-antique-gold mx-auto flex items-center justify-center text-white shadow-lg shadow-espresso/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-espresso tracking-tight">
            Glow &amp; Grace Portal
          </h2>
          <p className="text-xs text-muted-taupe font-mono">
            Private Management &amp; Inventory Suite
          </p>
        </div>

        {/* Prototype Demo Warning & Credentials Banner */}
        <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200/80 text-xs text-mocha space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-warning">
            <ShieldCheck className="w-4 h-4 text-warning" />
            <span>Educational Prototype Authentication</span>
          </div>
          <p className="text-[11px] text-warning leading-relaxed">
            This client-side credential gate is for demonstration purposes only and does not provide production server-side security or encrypted sessions.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-error font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="admin-email-input" className="block text-xs font-semibold text-mocha mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-muted-taupe absolute left-3 top-3 pointer-events-none" />
              <input
                id="admin-email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-warm-border text-xs text-espresso focus:outline-none focus:ring-2 focus:ring-antique-gold font-mono"
              />
            </div>
          </div>

          <div>
            <label htmlFor="admin-password-input" className="block text-xs font-semibold text-mocha mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-muted-taupe absolute left-3 top-3 pointer-events-none" />
              <input
                id="admin-password-input"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-warm-border text-xs text-espresso focus:outline-none focus:ring-2 focus:ring-antique-gold font-mono"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" fullWidth size="md">
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </form>

        <div className="pt-2 text-center border-t border-warm-border">
          <Link
            to="/"
            className="text-xs text-muted-taupe hover:text-mocha transition-colors font-medium"
          >
            &larr; Back to Customer Storefront
          </Link>
        </div>

      </div>
    </div>
  );
};

