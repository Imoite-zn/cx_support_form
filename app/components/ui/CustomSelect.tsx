'use client';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface CustomSelectProps {
  name: string;
  value: string;
  options: string[];
  placeholder?: string;
  error?: string;
  required?: boolean;
  onChange: (e: { target: { name: string; value: string } }) => void;
}

export default function CustomSelect({
  name,
  value,
  options,
  placeholder = 'Select an option',
  error,
  onChange,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    onChange({ target: { name, value: option } });
    setOpen(false);
  };

  const borderCls = error
    ? 'border-red-300 focus-within:ring-red-100 focus-within:border-red-400'
    : open
    ? 'border-[#FFB619] ring-2 ring-[#FFB619]/20 bg-white'
    : 'border-[#E3E6F0] hover:border-[#B8BDD6] bg-[#F8F9FC]';

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border text-sm font-medium
          text-left transition-colors duration-150 focus:outline-none ${borderCls}`}
      >
        <span className={value ? 'text-[#1C2033]' : 'text-gray-300 font-normal'}>
          {value || placeholder}
        </span>
        <ChevronDown
          size={14}
          className={`flex-shrink-0 text-[#262C59]/30 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute z-50 w-full mt-1.5 bg-white rounded-xl border border-[#E3E6F0]
          shadow-xl shadow-[#262C59]/10 overflow-hidden">
          <ul className="max-h-56 overflow-y-auto py-1">
            {options.map((opt) => {
              const selected = opt === value;
              return (
                <li key={opt}>
                  <button
                    type="button"
                    onClick={() => handleSelect(opt)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-left
                      transition-colors duration-100
                      ${selected
                        ? 'bg-[#262C59] text-white font-semibold'
                        : 'text-[#1C2033] hover:bg-[#F4F5FB] font-normal'
                      }`}
                  >
                    <span>{opt}</span>
                    {selected && <Check size={13} className="text-[#FFB619]" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
