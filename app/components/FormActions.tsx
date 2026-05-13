import { Loader2, Send, Trash2 } from 'lucide-react';
import { SubmitStatus } from './types';

interface FormActionsProps {
  status: SubmitStatus;
  onReset: () => void;
}

export default function FormActions({ status, onReset }: FormActionsProps) {
  const isLoading = status.type === 'loading';

  return (
    <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
      {/* Discard */}
      <button
        type="button"
        onClick={onReset}
        disabled={isLoading}
        className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg
          text-sm font-semibold text-gray-400 hover:text-red-500 hover:bg-red-50
          disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150"
      >
        <Trash2 size={14} />
        Discard changes
      </button>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3 rounded-xl
          text-sm font-extrabold tracking-wide bg-[#FFB619] text-[#262C59]
          hover:bg-[#F0AC14] active:scale-[0.98]
          disabled:opacity-50 disabled:cursor-not-allowed
          shadow-lg shadow-[#FFB619]/35 hover:shadow-xl hover:shadow-[#FFB619]/25
          transition-all duration-150"
      >
        {isLoading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Send size={15} />
        )}
        {isLoading ? 'Submitting…' : 'Submit Ticket'}
      </button>
    </div>
  );
}
