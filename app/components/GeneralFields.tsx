import { FormData } from './types';

interface GeneralFieldsProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function GeneralFields({ formData, handleChange }: GeneralFieldsProps) {
  return (
    <div className="form-grid">
      {/* Row 1 */}
      <div className="form-group">
        <label>Country *</label>
        <select name="country" value={formData.country} onChange={handleChange}>
          <option value="Kenya">Kenya</option>
          <option value="Nigeria">Nigeria</option>
          <option value="Ghana">Ghana</option>
          <option value="Morocco">Morocco</option>
          <option value="Senegal">Senegal</option>
          <option value="Cote D'ivoire">Cote D'ivoire</option>
        </select>
      </div>

      <div className="form-group">
        <label>Contact Name *</label>
        <input name="contactName" value={formData.contactName} onChange={handleChange} required />
      </div>

      {/* Row 2 */}
      <div className="form-group">
        <label>Case Type *</label>
        <select name="caseType" value={formData.caseType} onChange={handleChange}>
          <option value="Complaint">Complaint</option>
          <option value="Inquiry">Inquiry</option>
        </select>
      </div>

      <div className="form-group">
        <label>Case Type Reason *</label>
        <select name="caseReason" value={formData.caseReason} onChange={handleChange}>
          <option value="CMP- AMC Issue">CMP- AMC Issue</option>
        </select>
      </div>

      {/* Additional Fields from image */}
      <div className="form-group">
        <label>Case Type Sub-reason *</label>
        <select name="subReason" value={formData.subReason} onChange={handleChange}>
          <option value="">-None-</option>
        </select>
      </div>

      <div className="form-group">
        <label>Type of issue *</label>
        <select name="issueType" value={formData.issueType} onChange={handleChange}>
          <option value="Vehicle issues/Faulty car">Vehicle issues/Faulty car</option>
        </select>
      </div>

      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
      </div>

      <div className="form-group">
        <label>Phone *</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
      </div>
    </div>
  );
}