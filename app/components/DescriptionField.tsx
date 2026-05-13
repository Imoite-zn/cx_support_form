import { FormField, inputCls } from './ui/FormField';
import { FormData, FormErrors } from './types';

const MAX_CHARS = 1000;

type ChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;
type BlurEvent = React.FocusEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;

interface DescriptionFieldProps {
  formData: FormData;
  errors: FormErrors;
  handleChange: (e: ChangeEvent) => void;
  handleBlur: (e: BlurEvent) => void;
}

export default function DescriptionField({
  formData,
  errors,
  handleChange,
  handleBlur,
}: DescriptionFieldProps) {
  const count = formData.description.length;
  const isNearLimit = count > MAX_CHARS * 0.85;

  return (
    <FormField label="Description" required error={errors.description}>
      <textarea
        name="description"
        rows={6}
        maxLength={MAX_CHARS}
        value={formData.description}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Describe your issue in detail — the more context you provide, the faster we can help."
        className={`${inputCls(errors.description)} resize-none leading-relaxed`}
      />
      <div className="flex justify-end mt-1">
        <span
          className={`text-xs transition-colors ${
            isNearLimit ? 'text-amber-500 font-medium' : 'text-gray-400'
          }`}
        >
          {count} / {MAX_CHARS}
        </span>
      </div>
    </FormField>
  );
}
