import { FormData } from './types';

interface DescriptionFieldProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function DescriptionField({ formData, handleChange }: DescriptionFieldProps) {
  return (
    <div className="form-group full-width">
      <label>Description *</label>
      <textarea 
        name="description" 
        rows={6} 
        value={formData.description} 
        onChange={handleChange} 
        required 
      />
      <span className="char-count">{formData.description.length} / 1000</span>
    </div>
  );
}