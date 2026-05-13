import { FormData } from './types';

interface SubjectFieldProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const subjectLabels = {
  en: 'Subject *',
  fr: 'Objet *',
  ar: 'الموضوع *',
};

function getLanguage(country: string): 'en' | 'fr' | 'ar' {
  if (country === 'Morocco') return 'ar';
  if (country === 'Senegal' || country === "Cote D'ivoire") return 'fr';
  return 'en';
}

export default function SubjectField({ formData, handleChange }: SubjectFieldProps) {
  const lang = getLanguage(formData.country);

  return (
    <div className="form-group full-width">
      <label>{subjectLabels[lang]}</label>
      <input name="subject" value={formData.subject} onChange={handleChange} required />
    </div>
  );
}