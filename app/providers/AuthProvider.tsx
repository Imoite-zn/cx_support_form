'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import {
  loginUser,
  logoutUser,
  refreshTokens,
} from '../lib/api';
import {
  clearAuthStorage,
  getStoredRefreshToken,
  getStoredUserId,
  setStoredRefreshToken,
  setStoredUserId,
} from '../lib/auth';

/* ----------------------------------------------------------------
   Types
---------------------------------------------------------------- */
interface AuthState {
  accessToken: string | null;
  userId: string | null;
  isAuthenticated: boolean;
  /** true while the provider checks localStorage on mount */
  isBootstrapping: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

/* ----------------------------------------------------------------
   Context
---------------------------------------------------------------- */
const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}

/* ----------------------------------------------------------------
   Refresh timer helper
   Schedules a proactive token refresh.
   "1hour"  → refresh at 55 min
   "365d"   → refresh at 364 days
   anything else → default 55 min
---------------------------------------------------------------- */
function msUntilRefresh(expiresAt: string): number {
  const MINUTE = 60_000;
  const DAY = 24 * 60 * MINUTE;

  const dayMatch = expiresAt.match(/^(\d+)d$/i);
  if (dayMatch) {
    const days = parseInt(dayMatch[1], 10);
    return Math.max((days - 1) * DAY, 5 * MINUTE); // at least 5 min
  }
  if (expiresAt === '1hour') return 55 * MINUTE;
  return 55 * MINUTE;
}

/* ----------------------------------------------------------------
   Provider
---------------------------------------------------------------- */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [state, setState] = useState<AuthState>({
    accessToken: null,
    userId: null,
    isAuthenticated: false,
    isBootstrapping: true,
  });

  // Keep a ref to the latest refreshToken so the scheduler
  // always uses the freshest value without re-creating intervals.
  const refreshTokenRef = useRef<string | null>(null);
  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Schedule proactive refresh ──────────────────────────── */
  const scheduleRefresh = useCallback((expiresAt: string) => {
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);

    const delay = msUntilRefresh(expiresAt);

    refreshTimerRef.current = setTimeout(async () => {
      const rt = refreshTokenRef.current;
      if (!rt) return;

      try {
        const data = await refreshTokens(rt);

        // Persist the new refreshToken (always use the most recent one)
        refreshTokenRef.current = data.refreshToken;
        setStoredRefreshToken(data.refreshToken);
        setStoredUserId(data.id);

        setState((prev) => ({
          ...prev,
          accessToken: data.accessToken,
          userId: data.id,
          isAuthenticated: true,
        }));

        scheduleRefresh(data.accessTokenExpiresAt);
      } catch {
        // Refresh failed — session is invalid, force logout
        handleExpiredSession();
      }
    }, delay);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleExpiredSession = useCallback(() => {
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    refreshTokenRef.current = null;
    clearAuthStorage();
    setState({
      accessToken: null,
      userId: null,
      isAuthenticated: false,
      isBootstrapping: false,
    });
    router.replace('/login');
  }, [router]);

  /* ── Bootstrap: check localStorage on mount ─────────────── */
  useEffect(() => {
    const storedRT = getStoredRefreshToken();

    if (!storedRT) {
      setState((prev) => ({ ...prev, isBootstrapping: false }));
      return;
    }

    // Try to get a fresh accessToken using the stored refreshToken
    refreshTokens(storedRT)
      .then((data) => {
        refreshTokenRef.current = data.refreshToken;
        setStoredRefreshToken(data.refreshToken);
        setStoredUserId(data.id);

        setState({
          accessToken: data.accessToken,
          userId: data.id,
          isAuthenticated: true,
          isBootstrapping: false,
        });

        scheduleRefresh(data.accessTokenExpiresAt);
      })
      .catch(() => {
        // Stored token is expired/invalid — clear and show login
        clearAuthStorage();
        setState({
          accessToken: null,
          userId: getStoredUserId(),
          isAuthenticated: false,
          isBootstrapping: false,
        });
      });

    return () => {
      if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Login ───────────────────────────────────────────────── */
  const login = useCallback(
    async (email: string, password: string) => {
      const data = await loginUser(email, password);

      if (data.accountStatus !== 'active') {
        throw new Error('Your account is inactive. Please contact support.');
      }

      refreshTokenRef.current = data.refreshToken;
      setStoredRefreshToken(data.refreshToken);
      setStoredUserId(data.id);

      setState({
        accessToken: data.accessToken,
        userId: data.id,
        isAuthenticated: true,
        isBootstrapping: false,
      });

      scheduleRefresh(data.accessTokenExpiresAt);
      router.replace('/');
    },
    [router, scheduleRefresh],
  );

  /* ── Logout ──────────────────────────────────────────────── */
  const logout = useCallback(async () => {
    const rt = refreshTokenRef.current ?? getStoredRefreshToken();

    if (rt) {
      try {
        await logoutUser(rt);
      } catch {
        // Even if server-side logout fails, we clear locally
      }
    }

    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    refreshTokenRef.current = null;
    clearAuthStorage();

    setState({
      accessToken: null,
      userId: null,
      isAuthenticated: false,
      isBootstrapping: false,
    });

    router.replace('/login');
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
