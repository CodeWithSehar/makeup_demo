const AUTH_KEY = 'gg_admin_session_v3';

export interface AdminUser {
  email: string;
  name: string;
  role: 'superadmin' | 'store_manager';
}

export const authService = {
  login(email: string, pass: string): { success: boolean; user?: AdminUser; error?: string } {
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail === 'admin@glowandgrace.pk' && pass === 'admin123') {
      const user: AdminUser = {
        email: cleanEmail,
        name: 'Glow & Grace Manager',
        role: 'superadmin',
      };
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      return { success: true, user };
    }
    // Also accept simple 'admin' for developer convenience
    if (cleanEmail === 'admin' && pass === 'admin') {
      const user: AdminUser = {
        email: 'admin@glowandgrace.pk',
        name: 'Demo Admin',
        role: 'superadmin',
      };
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, error: 'Invalid credentials. Use admin@glowandgrace.pk / admin123.' };
  },

  getCurrentUser(): AdminUser | null {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      if (raw) return JSON.parse(raw);
    } catch {
      // ignore
    }
    return null;
  },

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  },

  logout(): void {
    localStorage.removeItem(AUTH_KEY);
  },
};

