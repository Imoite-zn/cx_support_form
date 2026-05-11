import { FormData } from './types';

interface SubjectFieldProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function SubjectField({ formData, handleChange }: SubjectFieldProps) {
  return (
    <div className="form-group full-width">
      <label>Subject</label>
      <input name="subject" value={formData.subject} onChange={handleChange} />
    </div>
  );
}