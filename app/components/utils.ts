import { FormData } from './types';

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

export const RATE_LIMIT_MS = 30000;
export const RATE_LIMIT_KEY = 'ticket_submit_limit';

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const validate = (data: FormData): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.hpWebsite) return "Bot detected.";
  if (!data.contactName || data.contactName.length < 2) return "Contact Name is too short.";
  if (!emailRegex.test(data.email)) return "Please enter a valid email address.";
  if (data.description.length < 10) return "Description must be at least 10 characters.";
  if (data.attachments.length > 10) return "Maximum 10 attachments allowed.";
  return null;
};