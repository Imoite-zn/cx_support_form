import { FormField, inputCls } from './ui/FormField';
import CustomSelect from './ui/CustomSelect';
import { FormData, FormErrors } from './types';

type ChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;
type BlurEvent = React.FocusEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;
import { FormData } from './types';
import { translations, countryValues, caseTypeValues, escalationPathValues, caseReasonValues, subReasonValues, issueTypeValues, documentTypeValues } from './constants';

interface GeneralFieldsProps {
  formData: FormData;
  errors: FormErrors;
  handleChange: (e: ChangeEvent | { target: { name: string; value: string } }) => void;
  handleBlur: (e: BlurEvent) => void;
}

export default function GeneralFields({
  formData,
  errors,
  handleChange,
  handleBlur,
}: GeneralFieldsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {/* Contact Name */}
      <FormField label="Contact Name" required error={errors.contactName}>
        <input
          name="contactName"
          value={formData.contactName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Full name"
          className={inputCls(errors.contactName)}
        />
      </FormField>

      {/* Email */}
      <FormField label="Email Address" required error={errors.email}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="you@example.com"
          className={inputCls(errors.email)}
        />
      </FormField>

      {/* Country */}
      <FormField label="Country" required>
        <CustomSelect
          name="country"
          value={formData.country}
          options={["Kenya","Nigeria","Ghana","Morocco","Senegal","Cote D'ivoire"]}
          onChange={handleChange}
        />
      </FormField>

      {/* Phone */}
      <FormField label="Phone Number" required error={errors.phone}>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="+254 700 000 000"
          className={inputCls(errors.phone)}
        />
      </FormField>

      {/* Case Type */}
      <FormField label="Case Type" required>
        <CustomSelect
          name="caseType"
          value={formData.caseType}
          options={["Complaint","Inquiry","Request","Suggestion/Feedback","Junks","Internal Communication","VAP Campaign","Other"]}
          onChange={handleChange}
        />
      </FormField>

      {/* Escalation Path */}
      <FormField label="Escalation Path" required error={errors.escalationPath}>
        <CustomSelect
          name="escalationPath"
          value={formData.escalationPath}
          placeholder="Select Escalation Path"
          options={["None","N/A","Operations","AFS","The Customer","Bank Engagement","Bank Operations","Finance","Telematics","Customer Success Partner","Legal","Repo","Customer Experience","Marketing","HR"]}
          error={errors.escalationPath}
          onChange={handleChange}
        />
      </FormField>

      {/* Case Type Reason */}
      <FormField label="Case Type Reason" required>
        <CustomSelect
          name="caseReason"
          value={formData.caseReason}
          options={["CMP- AMC Issue","CMP- Application Issue","CMP- Service Centre Issue","CMP- Product Knowledge Issue","CMP- Rude Staff","CMP- Faulty Vehicle","CMP- Car Delivery Issue","CMP- Wrong Transaction","CMP- Repayment not updated","CMP- Car Documents","CMP- Liquidation Issue","CMP- Loan Restructuring Issue","CMP- Dealer Management","CMP- Vehicle Repossession","CMP- Wrong Plate Number","CMP- Loan Repayment Issue","CMP- CAC Document Issue","CMP Bank- Faulty Vehicle","CMP Bank- Document Issue","CMP Bank- PFI Issue","CMP- Account Statement Issue","Final Message for Repossession"]}
          onChange={handleChange}
        />
      </FormField>

      {/* Case Type Sub-reason */}
      <FormField label="Case Type Sub-reason">
        <CustomSelect
          name="subReason"
          value={formData.subReason}
          placeholder="— None —"
          options={[]}
          onChange={handleChange}
        />
      </FormField>

      {/* Type of Issue */}
      <FormField label="Type of Issue" required>
        <CustomSelect
          name="issueType"
          value={formData.issueType}
          options={["Vehicle issues/Faulty car","Tracker issues","Insurance Claim","Document Renewal","Vehicle Servicing","Loan Payments","Loan Liquidation","General Inquiry","Promotional Emails","Internal Request","Apprehension","Repair Finance request","Robbery","Expired Doc","AMC","Accident","Others"]}
          onChange={handleChange}
        />
      </FormField>

      {/* Document Type */}
      <FormField label="Document Type">
        <CustomSelect
          name="documentType"
          value={formData.documentType}
          placeholder="Select Document Type"
          options={["ID","License","Vehicle Papers","Insurance","Other"]}
          onChange={handleChange}
        />
      </FormField>
function getLanguage(country: string): 'en' | 'fr' | 'ar' {
  if (country === 'Morocco') return 'ar';
  if (country === 'Senegal' || country === "Cote D'ivoire") return 'fr';
  return 'en';
}

export default function GeneralFields({ formData, handleChange }: GeneralFieldsProps) {
  const lang = getLanguage(formData.country);
  const t = translations[lang];

  return (
    <div className="form-grid">
      {/* Prioritized Name and Email Fields */}
      <div className="form-group">
        <label>{t.contactName} *</label>
        <input name="contactName" value={formData.contactName} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>{t.email} *</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={t.emailPlaceholder} required />
      </div>

      {/* Row 1 */}
      <div className="form-group">
        <label>{t.country}</label>
        <select name="country" value={formData.country} onChange={handleChange}>
          <option value="">{t.selectCountry}</option>
          {t.countryOptions.map((name, i) => <option key={countryValues[i]} value={countryValues[i]}>{name}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label>{t.phone} *</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
      </div>

      {/* Row 2 */}
      <div className="form-group">
        <label>{t.caseType} *</label>
        <select name="caseType" value={formData.caseType} onChange={handleChange}>
          <option value="">{t.selectCaseType}</option>
          {t.caseTypeOptions.map((name, i) => <option key={caseTypeValues[i]} value={caseTypeValues[i]}>{name}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label>{t.escalationPath} *</label>
        <select name="escalationPath" value={formData.escalationPath} onChange={handleChange} required>
          <option value="">{t.selectEscalationPath}</option>
          {t.escalationPathOptions.map((name, i) => <option key={escalationPathValues[i]} value={escalationPathValues[i]}>{name}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label>{t.caseReason} *</label>
        <select name="caseReason" value={formData.caseReason} onChange={handleChange} required>
          <option value="">{t.selectCaseReason}</option>
          {t.caseReasonOptions.map((name, i) => (
            <option key={caseReasonValues[i]} value={caseReasonValues[i]}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Additional Fields from image */}
      <div className="form-group">
        <label>{t.subReason}</label>
        <select name="subReason" value={formData.subReason} onChange={handleChange}>
          <option value="">{t.selectSubReason}</option>
          {t.subReasonOptions.map((name, i) => (
            <option key={subReasonValues[i]} value={subReasonValues[i]}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>{t.issueType}</label>
        <select name="issueType" value={formData.issueType} onChange={handleChange}>
          <option value="">{t.selectIssueType}</option>
          {t.issueTypeOptions.map((name, i) => (
            <option key={issueTypeValues[i]} value={issueTypeValues[i]}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>{t.documentType}</label>
        <select name="documentType" value={formData.documentType} onChange={handleChange}>
          <option value="">{t.selectDocumentType}</option>
          {t.documentTypeOptions.map((name, i) => (
            <option key={documentTypeValues[i]} value={documentTypeValues[i]}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
