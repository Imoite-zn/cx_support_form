'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTicketForm } from './hooks/useTicketForm';
import { useAuth } from './providers/AuthProvider';
import TicketHeader from './components/TicketHeader';
import GeneralFields from './components/GeneralFields';
import CountrySpecificFields from './components/CountrySpecificFields';
import SubjectField from './components/SubjectField';
import DescriptionField from './components/DescriptionField';
import AttachmentSection from './components/AttachmentSection';
import VerificationSection from './components/VerificationSection';
import FormActions from './components/FormActions';
import StatusToast from './components/StatusToast';
import { Loader2 } from 'lucide-react';

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-1 h-4 rounded-full bg-[#FFB619]" />
      <span className="text-xs font-black text-[#262C59] uppercase tracking-[0.18em]">{children}</span>
      <div className="flex-1 h-px bg-[#EEF0F8]" />
    </div>
  );
}

function SectionDivider() {
  return <div className="border-t border-[#EEF0F8] my-8" />;
}

export default function TicketForm() {
  const { isAuthenticated, isBootstrapping, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isBootstrapping && !isAuthenticated) router.replace('/login');
  }, [isAuthenticated, isBootstrapping, router]);

  const {
    formData, errors, status,
    handleChange, handleBlur, handleFileChange,
    removeAttachment, handleSubmit, handleReset, setStatus,
  } = useTicketForm();

  if (isBootstrapping || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F6FB]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={32} className="animate-spin text-[#FFB619]" />
          <p className="text-sm text-gray-400">Loading…</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#ECEDF4] py-10 px-4">
      <div className="w-[60%] mx-auto">

        {/* Unified card — header + form */}
        <div className="rounded-2xl border border-[#DDE0EF] shadow-xl shadow-[#262C59]/[0.08] overflow-hidden">

          {/* Navy header — top of the card */}
          <TicketHeader onSignOut={logout} />

          {/* Form body */}
          <div className="bg-white">
            <form onSubmit={handleSubmit} noValidate>
              <input type="text" name="hpWebsite" style={{ display: 'none' }}
                value={formData.hpWebsite} onChange={handleChange} tabIndex={-1} autoComplete="off" />

              <div className="px-10 pt-8 pb-2">
                <SectionLabel>Contact &amp; Case Information</SectionLabel>
                <GeneralFields
                  formData={formData} errors={errors}
                  handleChange={handleChange} handleBlur={handleBlur}
                />
              </div>

              <SectionDivider />

              <div className="px-10 py-2 pb-4">
                <SectionLabel>{formData.country || 'Country'} — Vehicle Details</SectionLabel>
                <CountrySpecificFields formData={formData} handleChange={handleChange} />
              </div>

              <SectionDivider />

              <div className="px-10 py-2 pb-4">
                <SectionLabel>Ticket Details</SectionLabel>
                <div className="flex flex-col gap-5">
                  <SubjectField
                    formData={formData} errors={errors}
                    handleChange={handleChange} handleBlur={handleBlur}
                  />
                  <DescriptionField
                    formData={formData} errors={errors}
                    handleChange={handleChange} handleBlur={handleBlur}
                  />
                </div>
              </div>

              <SectionDivider />

              <div className="px-10 py-2 pb-6">
                <SectionLabel>Attachments</SectionLabel>
                <AttachmentSection
                  formData={formData}
                  handleFileChange={handleFileChange}
                  removeAttachment={removeAttachment}
                />
              </div>

              {/* Submit footer */}
              <div className="px-10 py-7 bg-[#F8F9FC] border-t border-[#EEF0F8]">
                <div className="flex flex-col gap-5">
                  <VerificationSection />
                  {status.message && (
                    <StatusToast
                      status={status}
                      onDismiss={() => setStatus({ type: 'idle', message: '' })}
                    />
                  )}
                  <FormActions status={status} onReset={handleReset} />
                </div>
              </div>
            </form>
          </div>
        </div>

        <p className="text-center text-[10px] text-gray-400/70 mt-6 pb-4 tracking-wide">
          © {new Date().getFullYear()} Autochek Africa · Customer Experience Portal
        </p>
      </div>
    </main>
  );
}
