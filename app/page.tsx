'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FormData, INITIAL_STATE } from './components/types';
import { sanitize, stripTags, validate } from './components/utils';
import { RATE_LIMIT_MS, RATE_LIMIT_KEY, countryEmailMap, getLanguage } from './components/constants';
import templateData from './components/template.json';

// Component Imports
import TicketHeader from './components/TicketHeader';
import GeneralFields from './components/GeneralFields';
import CountrySpecificFields from './components/CountrySpecificFields';
import SubjectField from './components/SubjectField';
import DescriptionField from './components/DescriptionField';
import AttachmentSection from './components/AttachmentSection';
import VerificationSection from './components/VerificationSection';
import FormActions from './components/FormActions';
import StatusToast from './components/StatusToast';

export default function TicketForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL_STATE);
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });

  // Handle Input Changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle File Attachments
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxSize = 40 * 1024 * 1024; // 40MB
    const validFiles: File[] = [];
    const errors: string[] = [];

    files.forEach((file) => {
      if (file.size > maxSize) {
        errors.push(`${file.name} is too large. Max 40MB.`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      setStatus({ type: 'error', message: errors.join(' ') });
      return;
    }

    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...validFiles],
    }));
    e.target.value = '';
  };

  const removeAttachment = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  /**
   * Renders the template from JSON into a flat payload for the API
   */
  const buildSubmissionPayload = (data: FormData) => {
    const lang = getLanguage(data.country);

    // 1. Locate the correct channel and language in the template file
    const emailChannel = templateData.channels.find((c) => c.channel === 'email');
    const selectedTemplate = emailChannel?.languages.find((l) => l.language === lang)
      ?? emailChannel?.languages.find((l) => l.language === 'en');

    if (!selectedTemplate) {
      throw new Error("Email template configuration missing.");
    }

    // 2. Map form data to template variables
    const variables: Record<string, string> = {
      subject: data.subject || `Support Request from ${data.contactName}`,
      country: data.country,
      caseType: data.caseType,
      caseReason: data.caseReason,
      subReason: data.subReason || 'N/A',
      issueType: data.issueType,
      location: data.location || 'N/A',
      make: data.make || 'N/A',
      model: data.model || 'N/A',
      carReg: data.carReg || 'N/A',
      documentType: data.documentType || 'N/A',
      phone: data.phone,
      description: data.description,
    };

    // 3. Perform string replacement for Subject and HTML Body
    let renderedHtml = selectedTemplate.body;
    let renderedSubject = selectedTemplate.subject;

    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      renderedHtml = renderedHtml.replace(regex, value);
      renderedSubject = renderedSubject.replace(regex, value);
    });

    // 4. Return payload structure expected by the API
    return {
      subject: renderedSubject,
      recipients: countryEmailMap[data.country] || 'hodi@autochek.com',
      html: renderedHtml,
      cc: [data.email],
      attachments: data.attachments.map((file) => ({
        name: file.name,
        type: file.type,
        size: file.size,
      })),
    };
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: 'idle', message: '' });

    // Bot protection
    if (formData.hpWebsite) return;

    // Rate Limiting
    const lastSubmit = parseInt(sessionStorage.getItem(RATE_LIMIT_KEY) || '0', 10);
    if (Date.now() - lastSubmit < RATE_LIMIT_MS) {
      const wait = Math.ceil((RATE_LIMIT_MS - (Date.now() - lastSubmit)) / 1000);
      setStatus({ type: 'error', message: `Please wait ${wait}s before resubmitting.` });
      return;
    }

    // Validation
    const error = validate(formData);
    if (error) {
      setStatus({ type: 'error', message: error });
      return;
    }

    // Sanitization
    const cleanData = {
      ...formData,
      contactName: stripTags(sanitize(formData.contactName)),
      subject: stripTags(sanitize(formData.subject)),
      description: stripTags(sanitize(formData.description)),
    };

    setStatus({ type: 'loading', message: 'Submitting request...' });

    try {
      const payload = buildSubmissionPayload(cleanData);

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send email');
      }

      sessionStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
      setStatus({ type: 'success', message: '✅ Ticket submitted successfully!' });
      setFormData(INITIAL_STATE);
    } catch (err) {
      console.error('Submission error:', err);
      setStatus({
        type: 'error',
        message: ` Submission failed: ${err instanceof Error ? err.message : 'Unknown error'}`
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="grow">
        <div className="ticket-container">
          <TicketHeader />

          <form onSubmit={handleSubmit} className="ticket-form">
            {/* Honeypot Field */}
            <input
              type="text"
              name="hpWebsite"
              style={{ display: 'none' }}
              value={formData.hpWebsite}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />

            <GeneralFields formData={formData} handleChange={handleChange} />
            <CountrySpecificFields formData={formData} handleChange={handleChange} />
            <SubjectField formData={formData} handleChange={handleChange} />
            <DescriptionField formData={formData} handleChange={handleChange} />

            <AttachmentSection
              formData={formData}
              handleFileChange={handleFileChange}
              removeAttachment={removeAttachment}
              setStatus={setStatus}
            />

            <VerificationSection />

            <FormActions
              status={status}
              handleSubmit={handleSubmit}
              setFormData={setFormData}
              INITIAL_STATE={INITIAL_STATE}
            />

            <StatusToast status={status} />
          </form>
        </div>

        <footer className="app-footer">
          <div className="footer-brand">
            <img src="/logo_autochek.webp" alt="Autochek logo" className="footer-logo" />
            <div>
              <p>Autochek Support</p>
            </div>
          </div>
          <p className="footer-copy">© {new Date().getFullYear()} Autochek. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}