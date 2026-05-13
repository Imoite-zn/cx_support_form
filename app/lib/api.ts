/**
 * API service layer — all HTTP calls to the backend.
 *
 * Environment is controlled by NEXT_PUBLIC_APP_ENV (falls back to NODE_ENV).
 * Set it in the appropriate .env file:
 *
 *   .env.development  →  NEXT_PUBLIC_APP_ENV=development
 *   .env.staging      →  NEXT_PUBLIC_APP_ENV=staging
 *   .env.production   →  NEXT_PUBLIC_APP_ENV=production
 *
 * You can also override the URL directly with NEXT_PUBLIC_API_BASE_URL.
 */

const BASE_URLS: Record<string, string> = {
  production:  'https://api-prod.autochek.africa',
  development: 'https://api-dev.autochek.africa',
  staging:     'https://api.staging.myautochek.com',
};

function resolveBaseUrl(): string {
  // Allow a hard override for one-off deployments
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }

  const env =
    process.env.NEXT_PUBLIC_APP_ENV ??  // explicit env tag
    process.env.NODE_ENV ??              // Next.js built-in
    'staging';

  return BASE_URLS[env] ?? BASE_URLS.staging;
}

const BASE_URL = resolveBaseUrl();

/* ----------------------------------------------------------------
   Shared types
---------------------------------------------------------------- */
export interface AuthData {
  id: string;
  accessToken: string;
  refreshToken: string;
  accountStatus: string;
  accessTokenExpiresAt: string;
}

interface AuthResponse {
  message: string;
  data: AuthData;
}

/* ----------------------------------------------------------------
   Internal fetch wrapper
---------------------------------------------------------------- */
async function request<T>(
  path: string,
  options: RequestInit,
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-autochek-app': 'dealerplus_zoho',
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body?.message) message = body.message;
    } catch {
      /* ignore parse errors */
    }
    throw new Error(message);
  }

  return res.json() as Promise<T>;
}

/* ----------------------------------------------------------------
   Auth endpoints
---------------------------------------------------------------- */

/**
 * Login — the user types their email, but we send it as `username`.
 */
export async function loginUser(
  email: string,
  password: string,
): Promise<AuthData> {
  const res = await request<AuthResponse>('/v2/users/login', {
    method: 'POST',
    body: JSON.stringify({ username: email, password }),
  });
  return res.data;
}

/**
 * Refresh — call before accessToken expires to get new tokens.
 * Always pass the MOST RECENT refreshToken.
 */
export async function refreshTokens(refreshToken: string): Promise<AuthData> {
  const res = await request<AuthResponse>('/v2/users/refresh', {
    method: 'POST',
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
  return res.data;
}

/**
 * Logout — invalidates the session on the server.
 * Pass the most recent refreshToken.
 */
export async function logoutUser(refreshToken: string): Promise<void> {
  await request<unknown>('/v2/users/logout', {
    method: 'POST',
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
}

/**
 * Step 1 of password reset — triggers a code being sent to the user's email.
 */
export async function requestPasswordReset(identifier: string): Promise<void> {
  await request<unknown>('/v2/users/passwords/reset', {
    method: 'POST',
    body: JSON.stringify({ identifier }),
  });
}

/**
 * Step 2 of password reset — submit code + new password.
 */
export async function confirmPasswordReset(
  identifier: string,
  code: string,
  new_password: string,
): Promise<void> {
  await request<unknown>('/v2/users/passwords/reset', {
    method: 'POST',
    body: JSON.stringify({ identifier, code, new_password }),
  });
}

/* ----------------------------------------------------------------
   Authenticated fetch helper (used by the ticket form, etc.)
   Attach Bearer token to every API call that requires auth.
---------------------------------------------------------------- */
export async function authFetch<T>(
  path: string,
  accessToken: string,
  options: RequestInit = {},
): Promise<T> {
  return request<T>(path, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...options.headers,
    },
  });
}
