import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { authService } from '../../../services/authService';
import { Button } from '../../../components/common/Button';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@glowandgrace.pk');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = authService.login(email, password);
    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.error || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 flex flex-col justify-center items-center p-4 selection:bg-rose-500 selection:text-white">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-stone-800 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-rose-400 mx-auto flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-stone-900 tracking-tight">
            Glow &amp; Grace Portal
          </h2>
          <p className="text-xs text-stone-500 font-mono">
            Private Management &amp; Inventory Suite
          </p>
        </div>

        {/* Prototype Demo Warning & Credentials Banner */}
        <div className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200/80 text-xs text-stone-700 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-amber-900">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Educational Prototype Authentication</span>
          </div>
          <p className="text-[11px] text-amber-800 leading-relaxed">
            This client-side credential gate is for demonstration purposes only and does not provide production server-side security or encrypted sessions.
          </p>
          <div className="pt-1 border-t border-amber-200/60 font-mono text-[11px] text-stone-700">
            Email: <strong>admin@glowandgrace.pk</strong> &bull; Password: <strong>admin123</strong>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="admin-email-input" className="block text-xs font-semibold text-stone-700 mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
              <input
                id="admin-email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary font-mono"
              />
            </div>
          </div>

          <div>
            <label htmlFor="admin-password-input" className="block text-xs font-semibold text-stone-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
              <input
                id="admin-password-input"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-primary font-mono"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" fullWidth size="md">
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </form>

        <div className="pt-2 text-center border-t border-stone-100">
          <Link
            to="/"
            className="text-xs text-stone-500 hover:text-primary transition-colors font-medium"
          >
            &larr; Back to Customer Storefront
          </Link>
        </div>

      </div>
    </div>
  );
};

