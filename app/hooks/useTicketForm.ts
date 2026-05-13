'use client';
import { useState, useCallback } from 'react';
import {
  FormData,
  FormErrors,
  SubmitStatus,
  INITIAL_STATE,
} from '../components/types';
import {
  sanitize,
  stripTags,
  validateAll,
  validateField,
  hasErrors,
  RATE_LIMIT_KEY,
  RATE_LIMIT_MS,
} from '../components/utils';

type ChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
> | { target: { name: string; value: string } };
type BlurEvent = React.FocusEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;

export function useTicketForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormData, boolean>>
  >({});
  const [status, setStatus] = useState<SubmitStatus>({
    type: 'idle',
    message: '',
  });

  const handleChange = useCallback(
    (e: ChangeEvent) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Live validation once a field has been touched
      if (touched[name as keyof FormData]) {
        const err = validateField(name as keyof FormData, value);
        setErrors((prev) => {
          const next = { ...prev };
          if (err) next[name as keyof FormData] = err;
          else delete next[name as keyof FormData];
          return next;
        });
      }
    },
    [touched],
  );

  const handleBlur = useCallback((e: BlurEvent) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name as keyof FormData, value);
    setErrors((prev) => {
      const next = { ...prev };
      if (err) next[name as keyof FormData] = err;
      else delete next[name as keyof FormData];
      return next;
    });
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      const maxSize = 40 * 1024 * 1024;
      const validFiles: File[] = [];
      const fileErrors: string[] = [];

      files.forEach((file) => {
        if (file.size > maxSize) {
          fileErrors.push(`"${file.name}" exceeds the 40 MB limit.`);
        } else {
          validFiles.push(file);
        }
      });

      if (fileErrors.length > 0) {
        setStatus({ type: 'error', message: fileErrors.join(' ') });
        return;
      }

      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...validFiles],
      }));
      e.target.value = '';
    },
    [],
  );

  const removeAttachment = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Honeypot guard
      if (formData.hpWebsite) return;

      // Touch + validate all fields
      setTouched({
        contactName: true,
        email: true,
        phone: true,
        subject: true,
        description: true,
      });
      const allErrors = validateAll(formData);
      setErrors(allErrors);

      if (hasErrors(allErrors)) {
        setStatus({
          type: 'error',
          message: 'Please fix the highlighted errors before submitting.',
        });
        return;
      }

      // Rate limiting
      const lastSubmit = parseInt(
        sessionStorage.getItem(RATE_LIMIT_KEY) || '0',
        10,
      );
      const now = Date.now();
      if (now - lastSubmit < RATE_LIMIT_MS) {
        const wait = Math.ceil((RATE_LIMIT_MS - (now - lastSubmit)) / 1000);
        setStatus({
          type: 'error',
          message: `Please wait ${wait}s before resubmitting.`,
        });
        return;
      }

      setStatus({ type: 'loading', message: 'Submitting your request…' });

      const cleanData = {
        ...formData,
        contactName: stripTags(sanitize(formData.contactName)),
        subject: stripTags(sanitize(formData.subject)),
        description: stripTags(sanitize(formData.description)),
      };

      try {
        console.log('Payload:', cleanData);
        // Replace with real API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        sessionStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
        setStatus({
          type: 'success',
          message:
            "Your ticket has been submitted successfully. We'll be in touch shortly.",
        });
        setFormData(INITIAL_STATE);
        setErrors({});
        setTouched({});
      } catch {
        setStatus({
          type: 'error',
          message: 'Submission failed. Please try again later.',
        });
      }
    },
    [formData],
  );

  const handleReset = useCallback(() => {
    setFormData(INITIAL_STATE);
    setErrors({});
    setTouched({});
    setStatus({ type: 'idle', message: '' });
  }, []);

  return {
    formData,
    errors,
    status,
    handleChange,
    handleBlur,
    handleFileChange,
    removeAttachment,
    handleSubmit,
    handleReset,
    setStatus,
  };
}
