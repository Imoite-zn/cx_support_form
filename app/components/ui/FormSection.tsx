import React from 'react';

interface FormSectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function FormSection({
  title,
  icon,
  children,
  className = '',
}: FormSectionProps) {
  return (
    <section
      className={`bg-white rounded-2xl shadow-sm border border-[#E4E6EF] overflow-hidden animate-section-in ${className}`}
    >
      {/* Section header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-[#E4E6EF] bg-[#FAFBFF]">
        {icon && (
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#FFB619]/10 text-[#FFB619]">
            {icon}
          </span>
        )}
        <h2 className="text-sm font-bold text-[#262C59] uppercase tracking-widest">
          {title}
        </h2>
      </div>

      {/* Section body */}
      <div className="p-6">{children}</div>
    </section>
  );
}
