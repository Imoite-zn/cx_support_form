interface TicketHeaderProps {
  onSignOut?: () => void;
}

export default function TicketHeader({ onSignOut }: TicketHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-t-2xl bg-[#262C59]">
      {/* Dot grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.045] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.4" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      {/* Glow circles */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#FFB619]/[0.08] pointer-events-none" />
      <div className="absolute -bottom-16 -left-10 w-60 h-60 rounded-full bg-white/[0.03] pointer-events-none" />

      {/* Gold top stripe */}
      <div className="h-[3px] bg-gradient-to-r from-transparent via-[#FFB619] to-transparent" />

      <div className="relative px-10 py-8 flex items-start justify-between">
        <div>
          <p className="text-[#FFB619]/70 text-[10px] font-bold uppercase tracking-[0.25em] mb-2">
            Autochek Africa &nbsp;·&nbsp; Internal CX Portal
          </p>
          <h1 className="text-white text-2xl font-extrabold tracking-tight leading-tight">
            Submit a Support Ticket
          </h1>
        </div>
        {onSignOut && (
          <button
            type="button"
            onClick={onSignOut}
            className="flex items-center gap-1.5 text-xs font-semibold text-white/40
              hover:text-white/80 transition-colors duration-150 mt-1 flex-shrink-0"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
            Sign out
          </button>
        )}
      </div>
    </div>
  );
}
