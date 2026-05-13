import React from 'react';
import { ChevronDown } from 'lucide-react';

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  isSelect?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  required,
  error,
  hint,
  isSelect = false,
  children,
  className = '',
}: FormFieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-xs font-bold text-[#262C59]/70 uppercase tracking-[0.08em]">
        {label}
        {required && <span className="text-[#FFB619] ml-1">*</span>}
      </label>

      <div className="relative">
        {children}
        {isSelect && (
          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#262C59]/30"
          />
        )}
      </div>

      {hint && !error && (
        <p className="text-[11px] text-gray-400 leading-relaxed">{hint}</p>
      )}

      {error && (
        <p className="text-[11px] text-red-500 flex items-center gap-1.5">
          <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

export function inputCls(error?: string): string {
  const base =
    'w-full px-4 py-3 rounded-lg border text-sm font-medium text-[#1C2033] bg-[#F8F9FC] ' +
    'placeholder:text-gray-300 placeholder:font-normal transition-colors duration-150 ' +
    'focus:outline-none focus:bg-white focus:ring-2';

  return error
    ? `${base} border-red-300 focus:ring-red-100 focus:border-red-400`
    : `${base} border-[#E3E6F0] hover:border-[#B8BDD6] focus:ring-[#FFB619]/20 focus:border-[#FFB619]`;
}

export function selectCls(error?: string): string {
  return inputCls(error) + ' appearance-none pr-10 cursor-pointer';
}
