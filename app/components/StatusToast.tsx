import { CheckCircle, AlertCircle, Loader2, X } from 'lucide-react';
import { SubmitStatus } from './types';

interface StatusToastProps {
  status: SubmitStatus;
  onDismiss?: () => void;
}

const CONFIG = {
  success: {
    icon: CheckCircle,
    bg: 'bg-emerald-50 border-emerald-200',
    text: 'text-emerald-800',
    iconColor: 'text-emerald-500',
  },
  error: {
    icon: AlertCircle,
    bg: 'bg-red-50 border-red-200',
    text: 'text-red-800',
    iconColor: 'text-red-500',
  },
  loading: {
    icon: Loader2,
    bg: 'bg-[#FFF8E7] border-[#FFB619]/30',
    text: 'text-[#262C59]',
    iconColor: 'text-[#FFB619]',
  },
  idle: null,
};

export default function StatusToast({ status, onDismiss }: StatusToastProps) {
  if (status.type === 'idle' || !status.message) return null;

  const config = CONFIG[status.type];
  if (!config) return null;

  const Icon = config.icon;

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`flex items-start gap-3 px-4 py-3.5 rounded-xl border text-sm font-medium
        animate-toast-in ${config.bg} ${config.text}`}
    >
      <Icon
        size={18}
        className={`flex-shrink-0 mt-0.5 ${config.iconColor} ${
          status.type === 'loading' ? 'animate-spin' : ''
        }`}
      />
      <p className="flex-1 leading-relaxed">{status.message}</p>
      {onDismiss && status.type !== 'loading' && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}
