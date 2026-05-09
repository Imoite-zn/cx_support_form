import { ShieldCheck, AlertCircle } from 'lucide-react';

interface StatusToastProps {
  status: { type: 'idle' | 'loading' | 'success' | 'error'; message: string };
}

export default function StatusToast({ status }: StatusToastProps) {
  if (!status.message) return null;

  return (
    <div className={`status-toast ${status.type}`}>
      {status.type === 'error' ? <AlertCircle size={18} /> : <ShieldCheck size={18} />}
      {status.message}
    </div>
  );
}