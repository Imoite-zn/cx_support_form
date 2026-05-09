import { Loader2, Send } from 'lucide-react';
import { FormData } from './types';

interface FormActionsProps {
  status: { type: 'idle' | 'loading' | 'success' | 'error'; message: string };
  handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  INITIAL_STATE: FormData;
}

export default function FormActions({ status, handleSubmit, setFormData, INITIAL_STATE }: FormActionsProps) {
  return (
    <div className="form-actions">
      <button 
        type="submit" 
        className="btn-submit" 
        disabled={status.type === 'loading'}
      >
        {status.type === 'loading' ? <Loader2 className="spinner" /> : <Send size={18} />}
        Submit
      </button>
      <button type="button" className="btn-discard" onClick={() => setFormData(INITIAL_STATE)}>
        Discard
      </button>
    </div>
  );
}