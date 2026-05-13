'use client';
import { useState } from 'react';

interface VerificationSectionProps {
  onVerified?: (verified: boolean) => void;
}

export default function VerificationSection({
  onVerified,
}: VerificationSectionProps) {
  const [checked, setChecked] = useState(false);

  const toggle = () => {
    const next = !checked;
    setChecked(next);
    onVerified?.(next);
  };

  return (
    <div className="flex items-start gap-3">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={toggle}
        className={`mt-0.5 w-5 h-5 flex-shrink-0 rounded-md border-2 transition-colors duration-150 flex items-center justify-center
          ${
            checked
              ? 'bg-[#FFB619] border-[#FFB619] shadow-sm shadow-[#FFB619]/40'
              : 'bg-[#F7F8FD] border-[#E2E4EF] hover:border-[#FFB619]/60 hover:bg-white'
          }`}
      >
        {checked && (
          <svg
            className="w-3 h-3 text-[#262C59]"
            fill="none"
            viewBox="0 0 12 12"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2 6l3 3 5-5"
            />
          </svg>
        )}
      </button>

      <p className="text-sm text-gray-500 leading-relaxed">
        I confirm that the information provided is accurate and I agree to the{' '}
        <a
          href="#"
          className="text-[#262C59] font-semibold underline underline-offset-2 hover:text-[#FFB619] transition-colors"
        >
          terms of service
        </a>
        . Our team will respond within 1–2 business days.
      </p>
    </div>
  );
}
