'use client';
import React, { useState, useEffect, SubmitEvent, ChangeEvent } from 'react';
import { FormData, INITIAL_STATE } from './components/types';
import { sanitize, stripTags, RATE_LIMIT_MS, RATE_LIMIT_KEY, validate } from './components/utils';
import TicketHeader from './components/TicketHeader';
import GeneralFields from './components/GeneralFields';
import CountrySpecificFields from './components/CountrySpecificFields';
import SubjectField from './components/SubjectField';
import DescriptionField from './components/DescriptionField';
import AttachmentSection from './components/AttachmentSection';
import VerificationSection from './components/VerificationSection';
import FormActions from './components/FormActions';
import StatusToast from './components/StatusToast';

/* ================================================================
   COMPONENT
================================================================ */
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
    const maxSize = 40 * 1024 * 1024; // 40MB in bytes
    const validFiles: File[] = [];
    const errors: string[] = [];

    files.forEach((file) => {
      if (file.size > maxSize) {
        errors.push(`${file.name} is too large. Maximum file size is 40MB.`);
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

    // Clear the input
    e.target.value = '';
  };

  // Remove Attachment
  const removeAttachment = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const buildSubmissionTemplate = (data: FormData) => ({
    subject: data.subject || `Support Ticket from ${data.contactName}`,
    recipients: data.email,
    html: `<html><body><p>Hello ${data.contactName},</p><p>Your support ticket has been submitted successfully with the following details:</p><ul><li><strong>Country:</strong> ${data.country}</li><li><strong>Case Type:</strong> ${data.caseType}</li><li><strong>Case Reason:</strong> ${data.caseReason}</li><li><strong>Sub-reason:</strong> ${data.subReason || 'N/A'}</li><li><strong>Issue Type:</strong> ${data.issueType}</li><li><strong>Location:</strong> ${data.location}</li><li><strong>Vehicle:</strong> ${data.make} ${data.model}</li><li><strong>Registration:</strong> ${data.carReg}</li><li><strong>Payment Method:</strong> ${data.payment}</li><li><strong>Document Type:</strong> ${data.documentType || 'N/A'}</li><li><strong>Phone:</strong> ${data.phone}</li></ul><p><strong>Description:</strong></p><p>${data.description}</p><p>If you have any questions, please contact Tech Support.</p><p>Best regards,<br>Tech Support</p></body></html>`,
    attachments: data.attachments.map((file) => ({ name: file.name, type: file.type, size: file.size })),
    cc: [],
  });

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: 'idle', message: '' });

    // 1. Rate Limiting Check
    const lastSubmit = parseInt(sessionStorage.getItem(RATE_LIMIT_KEY) || '0', 10);
    const now = Date.now();
    if (now - lastSubmit < RATE_LIMIT_MS) {
      const wait = Math.ceil((RATE_LIMIT_MS - (now - lastSubmit)) / 1000);
      setStatus({ type: 'error', message: `Please wait ${wait}s before resubmitting.` });
      return;
    }

    // 2. Validation & Sanitization
    const error = validate(formData);
    if (error) {
      setStatus({ type: 'error', message: error });
      return;
    }

    // Sanitize text fields before sending
    const cleanData = {
      ...formData,
      contactName: stripTags(sanitize(formData.contactName)),
      subject: stripTags(sanitize(formData.subject)),
      description: stripTags(sanitize(formData.description)),
    };

    setStatus({ type: 'loading', message: 'Submitting request...' });

    try {
      const templatePayload = buildSubmissionTemplate(cleanData);

      // Logic for submitToAPI would go here (Fetch/Axios)
      console.log('Sending Template Payload:', templatePayload);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      sessionStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());
      setStatus({ type: 'success', message: '✅ Ticket submitted successfully!' });
      setFormData(INITIAL_STATE);
    } catch (err) {
      setStatus({ type: 'error', message: '❌ Submission failed. Please try again later.' });
    }
  };

  return (
    <main>
    <div className="ticket-container">
      <TicketHeader />

      <form onSubmit={handleSubmit} className="ticket-form">
        {/* Honeypot Field (Hidden from users) */}
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
    </main>
  );
};