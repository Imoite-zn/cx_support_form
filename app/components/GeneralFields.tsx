import { FormData } from './types';
import { translations, countryValues, caseTypeValues, escalationPathValues, caseReasonValues, subReasonValues, issueTypeValues, documentTypeValues } from './constants';

interface GeneralFieldsProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

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