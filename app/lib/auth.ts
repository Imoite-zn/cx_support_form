/**
 * Token storage utilities.
 *
 * Strategy:
 *   - accessToken  → in-memory only (React state).  Never persisted.
 *   - refreshToken → localStorage.  Survives page refresh.
 *   - userId       → localStorage.  For display / audit.
 */

const REFRESH_TOKEN_KEY = 'cx_refresh_token';
const USER_ID_KEY = 'cx_user_id';

export function getStoredRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setStoredRefreshToken(token: string): void {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
}

export function getStoredUserId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(USER_ID_KEY);
}

export function setStoredUserId(id: string): void {
  localStorage.setItem(USER_ID_KEY, id);
}

export function clearAuthStorage(): void {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);
}
