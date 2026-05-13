import { FormData, FormErrors } from './types';

export const sanitize = (str: string): string => {
  if (typeof str !== 'string') return '';
  return str
    .trim()
    .replace(/\0/g, '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/javascript\s*:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/<\s*script[^>]*>/gi, '')
    .replace(/<\/\s*script\s*>/gi, '');
};

export const stripTags = (str: string): string => str.replace(/<[^>]*>/g, '').trim();

export const RATE_LIMIT_MS = 30_000;
export const RATE_LIMIT_KEY = 'ticket_submit_limit';

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[\d\s\-()]{7,15}$/;

export const validateField = (
  name: keyof FormData,
  value: unknown,
): string | undefined => {
  switch (name) {
    case 'contactName':
      return typeof value === 'string' && value.trim().length >= 2
        ? undefined
        : 'Name must be at least 2 characters.';
    case 'email':
      return typeof value === 'string' && EMAIL_REGEX.test(value)
        ? undefined
        : 'Please enter a valid email address.';
    case 'phone':
      return typeof value === 'string' && PHONE_REGEX.test(value)
        ? undefined
        : 'Please enter a valid phone number.';
    case 'subject':
      return typeof value === 'string' && value.trim().length >= 5
        ? undefined
        : 'Subject must be at least 5 characters.';
    case 'description':
      return typeof value === 'string' && value.trim().length >= 10
        ? undefined
        : 'Description must be at least 10 characters.';
    default:
      return undefined;
  }
};

export const validateAll = (data: FormData): FormErrors => {
  const fields: (keyof FormData)[] = [
    'contactName',
    'email',
    'phone',
    'subject',
    'description',
  ];
  return fields.reduce<FormErrors>((acc, field) => {
    const err = validateField(field, data[field]);
    if (err) acc[field] = err;
    return acc;
  }, {});
};

export const hasErrors = (errors: FormErrors): boolean =>
  Object.keys(errors).length > 0;