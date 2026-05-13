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
  );
}
