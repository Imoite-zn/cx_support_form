import { FormData } from './types';

interface DescriptionFieldProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const descriptionLabels = {
  en: 'Description *',
  fr: 'Description *',
  ar: 'الوصف *',
};

function getLanguage(country: string): 'en' | 'fr' | 'ar' {
  if (country === 'Morocco') return 'ar';
  if (country === 'Senegal' || country === "Cote D'ivoire") return 'fr';
  return 'en';
}

export default function DescriptionField({ formData, handleChange }: DescriptionFieldProps) {
  const lang = getLanguage(formData.country);

  return (
    <div className="form-group full-width">
      <label>{descriptionLabels[lang]}</label>
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