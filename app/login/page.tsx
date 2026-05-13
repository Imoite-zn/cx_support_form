'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Loader2, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '../providers/AuthProvider';

/* ── Autochek Africa Logo ────────────────────────────────── */
function AutochekLogo() {
  return (
    <div className="flex items-center gap-3">
      {/* Icon mark */}
      <div className="relative w-11 h-11 flex-shrink-0">
        <div className="absolute inset-0 rounded-xl bg-[#FFB619] shadow-lg shadow-[#FFB619]/40" />
        <svg
          className="absolute inset-0 m-auto w-6 h-6 text-[#262C59]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Car silhouette */}
          <path d="M5 17H3v-5l2.5-5h13l2.5 5v5h-2" />
          <circle cx="7.5" cy="17" r="1.5" />
          <circle cx="16.5" cy="17" r="1.5" />
          <path d="M5.5 12h13" />
          {/* Checkmark overlay */}
          <path d="M9 9.5l2 2 4-3.5" strokeWidth={2} />
        </svg>
      </div>

      {/* Wordmark */}
      <div className="flex flex-row items-baseline gap-1.5 leading-none">
        <span className="text-[#FFB619] text-xl font-extrabold tracking-tight">
          Autochek
        </span>
        <span className="text-white text-xl font-extrabold tracking-tight">
          Africa
        </span>
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────── */
export default function LoginPage() {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) { setError('Please enter your email address.'); return; }
    if (!password) { setError('Please enter your password.'); return; }

    setLoading(true);
    try {
      await login(email.trim(), password);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F5F9] px-4 py-12">
      {/* Card — 60 % viewport width, centered */}
      <div
        className="w-full rounded-2xl overflow-hidden shadow-xl border border-[#E4E6EF]"
        style={{ maxWidth: '680px', minWidth: 'min(680px, 100%)' }}
      >
        {/* ── Brand header ──────────────────────────────── */}
        <div className="relative bg-[#262C59] px-10 py-10 overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#FFB619]/10 pointer-events-none" />

          {/* Gold top bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFB619] via-[#ffd06e] to-[#FFB619]" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <AutochekLogo />

            <div className="sm:text-right">
              <h1 className="text-[#FFB619] text-2xl font-bold leading-tight">
                Customer Support
              </h1>
              <p className="text-white/40 text-xs uppercase tracking-widest font-medium mt-1">
                Internal Portal
              </p>
            </div>
          </div>
        </div>

        {/* ── Form body ─────────────────────────────────── */}
        <div className="bg-white px-10 py-10">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#262C59]">Welcome back</h2>
            <p className="text-gray-400 text-sm mt-1">
              Sign in to access the support portal
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-[#262C59] tracking-wide">
                Email Address <span className="text-[#FFB619]">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@autochek.africa"
                autoComplete="email"
                disabled={loading}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4E6EF] text-sm
                  bg-white text-[#1C2033] placeholder:text-gray-400
                  hover:border-[#FFB619]/60 focus:outline-none focus:ring-2
                  focus:ring-[#FFB619]/20 focus:border-[#FFB619]
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-[#262C59] tracking-wide">
                  Password <span className="text-[#FFB619]">*</span>
                </label>
                <Link
                  href="/reset-password"
                  className="text-xs text-gray-400 hover:text-[#FFB619] font-medium
                    transition-colors underline underline-offset-2"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  disabled={loading}
                  className="w-full px-3.5 py-2.5 pr-11 rounded-lg border border-[#E4E6EF] text-sm
                    bg-white text-[#1C2033] placeholder:text-gray-400
                    hover:border-[#FFB619]/60 focus:outline-none focus:ring-2
                    focus:ring-[#FFB619]/20 focus:border-[#FFB619]
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400
                    hover:text-[#262C59] transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2.5 bg-red-50 border border-red-200
                rounded-lg px-4 py-3 text-sm text-red-700">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            {/* Divider */}
            <div className="pt-1" />

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 py-3 rounded-lg
                bg-[#262C59] text-white font-bold text-sm
                hover:bg-[#1a1f3e] active:scale-[0.98]
                shadow-md hover:shadow-lg
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200"
            >
              {loading ? (
                <Loader2 size={17} className="animate-spin" />
              ) : (
                <LogIn size={17} />
              )}
              {loading ? 'Signing in…' : 'Sign In'}
            </button>

            {/* Secondary CTA accent */}
            <div className="relative flex items-center gap-3 py-1">
              <div className="flex-1 h-px bg-[#E4E6EF]" />
              <span className="text-xs text-gray-400 flex-shrink-0">or</span>
              <div className="flex-1 h-px bg-[#E4E6EF]" />
            </div>

            <Link
              href="/reset-password"
              className="w-full flex items-center justify-center py-2.5 rounded-lg
                border-2 border-[#FFB619]/40 text-[#262C59] text-sm font-semibold
                hover:border-[#FFB619] hover:bg-[#FFF8E7]/50
                transition-all duration-200"
            >
              Reset my password
            </Link>
          </form>
        </div>

        {/* ── Footer ────────────────────────────────────── */}
        <div className="bg-[#FAFBFF] border-t border-[#E4E6EF] px-10 py-4 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Autochek Africa
          </p>
          <a
            href="mailto:support@autochek.africa"
            className="text-xs text-gray-400 hover:text-[#262C59] transition-colors"
          >
            Need help?
          </a>
        </div>
      </div>
    </div>
  );
}
