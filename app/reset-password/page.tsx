'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Loader2,
  Mail,
  KeyRound,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react';
import { requestPasswordReset, confirmPasswordReset } from '../lib/api';

type Step = 'request' | 'confirm' | 'done';

export default function ResetPasswordPage() {
  const [step, setStep] = useState<Step>('request');

  /* ── Step 1 state ──────────────────────────────────────── */
  const [email, setEmail] = useState('');

  /* ── Step 2 state ──────────────────────────────────────── */
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  /* ── Shared ────────────────────────────────────────────── */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /* ── Step 1: Request reset code ─────────────────────────── */
  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) { setError('Please enter your email address.'); return; }

    setLoading(true);
    try {
      await requestPasswordReset(email.trim());
      setStep('confirm');
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to send reset code. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  /* ── Step 2: Confirm code + new password ─────────────────── */
  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!code.trim()) { setError('Please enter the code from your email.'); return; }
    if (newPassword.length < 8) { setError('New password must be at least 8 characters.'); return; }
    if (newPassword !== confirmPassword) { setError('Passwords do not match.'); return; }

    setLoading(true);
    try {
      await confirmPasswordReset(email.trim(), code.trim(), newPassword);
      setStep('done');
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Reset failed. Please check your code and try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F4F5F9] px-6 py-12">
      <div className="w-full max-w-md">
        {/* Back to login */}
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400
            hover:text-[#262C59] transition-colors mb-8 group"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Sign In
        </Link>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E4E6EF] overflow-hidden">
          {/* Gold bar */}
          <div className="h-1 bg-gradient-to-r from-[#FFB619] via-[#ffd06e] to-[#FFB619]" />

          <div className="px-8 py-10">
            {/* ── Step indicator ─────────────────────────── */}
            {step !== 'done' && (
              <div className="flex items-center gap-2 mb-8">
                {(['request', 'confirm'] as Step[]).map((s, i) => (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                        ${step === s || (s === 'request' && step === 'confirm')
                          ? 'bg-[#FFB619] text-[#262C59]'
                          : 'bg-[#E4E6EF] text-gray-400'
                        }`}
                    >
                      {s === 'request' && step === 'confirm' ? (
                        <CheckCircle size={14} />
                      ) : (
                        i + 1
                      )}
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        step === s ? 'text-[#262C59]' : 'text-gray-400'
                      }`}
                    >
                      {s === 'request' ? 'Enter Email' : 'Reset Password'}
                    </span>
                    {i === 0 && (
                      <div className={`w-8 h-px mx-1 ${step === 'confirm' ? 'bg-[#FFB619]' : 'bg-[#E4E6EF]'}`} />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* ── Step 1: Request ────────────────────────── */}
            {step === 'request' && (
              <>
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#FFB619]/10 mb-6">
                  <Mail size={26} className="text-[#FFB619]" />
                </div>
                <h2 className="text-2xl font-bold text-[#262C59] tracking-tight mb-1">
                  Reset Password
                </h2>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                  Enter your account email. We&apos;ll send you a reset code.
                </p>

                <form onSubmit={handleRequest} noValidate className="space-y-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#262C59] tracking-wide">
                      Email Address <span className="text-[#FFB619]">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      disabled={loading}
                      autoComplete="email"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4E6EF] text-sm
                        bg-white text-[#1C2033] placeholder:text-gray-400
                        hover:border-[#FFB619]/60 focus:outline-none focus:ring-2
                        focus:ring-[#FFB619]/20 focus:border-[#FFB619]
                        disabled:opacity-50 transition-all duration-200"
                    />
                  </div>

                  {error && <ErrorBanner message={error} />}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2.5 py-3 rounded-lg
                      bg-[#FFB619] text-[#262C59] font-bold text-sm
                      hover:bg-[#E6A310] active:scale-[0.98]
                      shadow-md hover:shadow-lg shadow-[#FFB619]/30
                      disabled:opacity-50 disabled:cursor-not-allowed
                      transition-all duration-200"
                  >
                    {loading ? <Loader2 size={17} className="animate-spin" /> : <Mail size={17} />}
                    {loading ? 'Sending code…' : 'Send Reset Code'}
                  </button>
                </form>
              </>
            )}

            {/* ── Step 2: Confirm ────────────────────────── */}
            {step === 'confirm' && (
              <>
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#FFB619]/10 mb-6">
                  <KeyRound size={26} className="text-[#FFB619]" />
                </div>
                <h2 className="text-2xl font-bold text-[#262C59] tracking-tight mb-1">
                  Enter New Password
                </h2>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                  Check your inbox at{' '}
                  <span className="font-semibold text-[#262C59]">{email}</span>{' '}
                  for the code.
                </p>

                <form onSubmit={handleConfirm} noValidate className="space-y-5">
                  {/* Code */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#262C59] tracking-wide">
                      Reset Code <span className="text-[#FFB619]">*</span>
                    </label>
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Enter the code from your email"
                      disabled={loading}
                      autoComplete="one-time-code"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#E4E6EF] text-sm
                        bg-white text-[#1C2033] placeholder:text-gray-400 tracking-widest
                        hover:border-[#FFB619]/60 focus:outline-none focus:ring-2
                        focus:ring-[#FFB619]/20 focus:border-[#FFB619]
                        disabled:opacity-50 transition-all duration-200"
                    />
                  </div>

                  {/* New password */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#262C59] tracking-wide">
                      New Password <span className="text-[#FFB619]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showNew ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Min. 8 characters"
                        disabled={loading}
                        autoComplete="new-password"
                        className="w-full px-3.5 py-2.5 pr-11 rounded-lg border border-[#E4E6EF] text-sm
                          bg-white text-[#1C2033] placeholder:text-gray-400
                          hover:border-[#FFB619]/60 focus:outline-none focus:ring-2
                          focus:ring-[#FFB619]/20 focus:border-[#FFB619]
                          disabled:opacity-50 transition-all duration-200"
                      />
                      <button type="button" onClick={() => setShowNew((p) => !p)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#262C59] transition-colors">
                        {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm password */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-[#262C59] tracking-wide">
                      Confirm Password <span className="text-[#FFB619]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirm ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repeat new password"
                        disabled={loading}
                        autoComplete="new-password"
                        className="w-full px-3.5 py-2.5 pr-11 rounded-lg border border-[#E4E6EF] text-sm
                          bg-white text-[#1C2033] placeholder:text-gray-400
                          hover:border-[#FFB619]/60 focus:outline-none focus:ring-2
                          focus:ring-[#FFB619]/20 focus:border-[#FFB619]
                          disabled:opacity-50 transition-all duration-200"
                      />
                      <button type="button" onClick={() => setShowConfirm((p) => !p)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#262C59] transition-colors">
                        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {error && <ErrorBanner message={error} />}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => { setStep('request'); setError(''); }}
                      disabled={loading}
                      className="flex-1 py-3 rounded-lg border-2 border-[#E4E6EF] text-sm font-semibold
                        text-[#262C59] hover:border-[#262C59]/30 hover:bg-gray-50
                        disabled:opacity-40 transition-all duration-200"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-[2] flex items-center justify-center gap-2.5 py-3 rounded-lg
                        bg-[#FFB619] text-[#262C59] font-bold text-sm
                        hover:bg-[#E6A310] active:scale-[0.98]
                        shadow-md hover:shadow-lg shadow-[#FFB619]/30
                        disabled:opacity-50 disabled:cursor-not-allowed
                        transition-all duration-200"
                    >
                      {loading ? <Loader2 size={17} className="animate-spin" /> : <KeyRound size={17} />}
                      {loading ? 'Resetting…' : 'Reset Password'}
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* ── Done ───────────────────────────────────── */}
            {step === 'done' && (
              <div className="flex flex-col items-center text-center py-6 gap-5">
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                  <CheckCircle size={36} className="text-emerald-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#262C59] mb-2">
                    Password Reset!
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Your password has been updated successfully.
                    You can now sign in with your new credentials.
                  </p>
                </div>
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-lg
                    bg-[#FFB619] text-[#262C59] font-bold text-sm
                    hover:bg-[#E6A310] shadow-md shadow-[#FFB619]/30
                    transition-all duration-200"
                >
                  Go to Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Shared sub-components ─────────────────────────────────── */
function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
      <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
      <p>{message}</p>
    </div>
  );
}
