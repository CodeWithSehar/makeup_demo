const AUTH_KEY = 'gg_admin_session_v4';
const LEGACY_AUTH_KEYS = ['gg_admin_session_v3'];

/** Sessions expire after this long, even if the tab stays open. */
const SESSION_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours

export interface AdminUser {
  email: string;
  name: string;
  role: 'superadmin' | 'store_manager';
}

interface StoredSession {
  user: AdminUser;
  expiresAt: number;
}

// Clear any old persistent sessions left over from earlier versions,
// which never expired and skipped the login screen.
try {
  LEGACY_AUTH_KEYS.forEach((key) => localStorage.removeItem(key));
} catch {
  // storage unavailable – ignore
}

/**
 * Prototype-only, client-side authentication.
 * Sessions live in sessionStorage (cleared when the browser/tab closes)
 * and expire after SESSION_TTL_MS. This is NOT production security.
 */
export const authService = {
  login(email: string, pass: string): { success: boolean; user?: AdminUser; error?: string } {
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail === 'admin@glowandgrace.pk' && pass === 'admin123') {
      const user: AdminUser = {
        email: cleanEmail,
        name: 'Glow & Grace Manager',
        role: 'superadmin',
      };
      const session: StoredSession = { user, expiresAt: Date.now() + SESSION_TTL_MS };
      sessionStorage.setItem(AUTH_KEY, JSON.stringify(session));
      return { success: true, user };
    }
    return { success: false, error: 'Invalid email or password.' };
  },

  getCurrentUser(): AdminUser | null {
    try {
      const raw = sessionStorage.getItem(AUTH_KEY);
      if (!raw) return null;
      const session = JSON.parse(raw) as StoredSession;
      if (!session?.user || typeof session.expiresAt !== 'number' || Date.now() > session.expiresAt) {
        sessionStorage.removeItem(AUTH_KEY);
        return null;
      }
      return session.user;
    } catch {
      return null;
    }
  },

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  },

  logout(): void {
    sessionStorage.removeItem(AUTH_KEY);
  },
};
