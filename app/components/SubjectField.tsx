import { FormField, inputCls } from './ui/FormField';
import { FormData, FormErrors } from './types';

type ChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;
type BlurEvent = React.FocusEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;

interface SubjectFieldProps {
  formData: FormData;
  errors: FormErrors;
  handleChange: (e: ChangeEvent) => void;
  handleBlur: (e: BlurEvent) => void;
}

export default function SubjectField({
  formData,
  errors,
  handleChange,
  handleBlur,
}: SubjectFieldProps) {
  return (
    <FormField label="Subject" required error={errors.subject}>
      <input
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Brief summary of your issue"
        className={inputCls(errors.subject)}
      />
    </FormField>
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
