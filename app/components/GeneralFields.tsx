import { FormData } from './types';

interface GeneralFieldsProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function GeneralFields({ formData, handleChange }: GeneralFieldsProps) {
  return (
    <div className="form-grid">
      {/* Prioritized Name and Email Fields */}
      <div className="form-group">
        <label>Contact Name *</label>
        <input name="contactName" value={formData.contactName} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Email *</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required />
      </div>

      {/* Row 1 */}
      <div className="form-group">
        <label>Country</label>
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
        <label>Phone *</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
      </div>

      {/* Row 2 */}
      <div className="form-group">
        <label>Case Type *</label>
        <select name="caseType" value={formData.caseType} onChange={handleChange}>
          <option value="Complaint">Complaint</option>
          <option value="Inquiry">Inquiry</option>
          <option value="Request">Request</option>
          <option value="Feedback">Suggestion/Feedback</option>
          <option value="Junks">Junks</option>
          <option value="Internal Communication">Internal Communication</option>
          <option value="VAP Campaign">VAP Campaign</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label>Escalation Path *</label>
        <select name="escalationPath" value={formData.escalationPath} onChange={handleChange} required>
          <option value="">Select Escalation Path</option>
          <option value="None">None</option>
          <option value="N/A">N/A</option>
          <option value="Operations">Operations</option>
          <option value="AFS">AFS</option>
          <option value="The Customer">The Customer</option>
          <option value="Bank Engagement">Bank Engagement</option>
          <option value="Bank Operations">Bank Operations</option>
          <option value="Finance">Finance</option>
          <option value="Telematics">Telematics</option>
          <option value="Customer Success Partner">Customer Success Partner</option>
          <option value="Legal">Legal</option>
          <option value="Repo">Repo</option>
          <option value="Customer Experience">Customer Experience</option>
          <option value="Marketing">Marketing</option>
          <option value="HR">HR</option>
        </select>
      </div>

      <div className="form-group">
        <label>Case Type Reason *</label>
        <select name="caseReason" value={formData.caseReason} onChange={handleChange}>
          <option value="CMP- AMC Issue">CMP- AMC Issue</option>
          <option value="CMP- Application Issue">CMP- Application Issue</option>
          <option value="CMP- Service Centre Issue">CMP- Service Centre Issue</option>
          <option value="CMP- Product Knowledge Issue">CMP- Product Knowledge Issue</option>
          <option value="CMP- Rude Staff">CMP- Rude Staff</option>
          <option value="CMP- Faulty Vehicle">CMP- Faulty Vehicle</option>
          <option value="CMP- AMC Issue">CMP- Car Delivery Issue</option>
          <option value="CMP- Rude Staff">CMP- Rude Staff</option>
          <option value="CMP- Faulty Vehicle">CMP- Faulty Vehicle</option>
          <option value="CMP- AMC Issue">CMP- Car Delivery Issue</option>
          <option value="CMP- Wrong Transaction">CMP- Wrong Transaction</option>
          <option value="CMP- Repayment not updated">CMP- Repayment not updated</option>
          <option value="CMP- Car Documents">CMP- Car Documents</option>
          <option value="CMP- Liquidation Issue">CMP- Liquidation Issue</option>
          <option value="CMP- Loan Restructuring Issue">CMP- Loan Restructuring Issue</option>
          <option value="CMP- Dealer Management">CMP- Dealer Management</option>
          <option value="CMP- Vehicle Repossession">CMP- Vehicle Repossession</option>
          <option value="CMP- Wrong Plate Number">CMP- Wrong Plate Number</option>
          <option value="CMP- Loan Repayment Issue">CMP- Loan Repayment Issue</option>
          <option value="CMP- CAC Document Issue">CMP- CAC Document Issue</option>
          <option value="CMP Bank- Faulty Vehicle">CMP Bank- Faulty Vehicle</option>
          <option value="CMP Bank- Document Issue">CMP Bank- Document Issue</option>
          <option value="CMP Bank- PFI Issue">CMP Bank- PFI Issue</option>
          <option value="CMP- Account Statement Issue">CMP- Account Statement Issue</option>
          <option value="Final Message for Repossession">Final Message for Repossession</option>
        </select>
      </div>

      {/* Additional Fields from image */}
      <div className="form-group">
        <label>Case Type Sub-reason</label>
        <select name="subReason" value={formData.subReason} onChange={handleChange}>
          <option value="">-None-</option>
        </select>
      </div>

      <div className="form-group">
        <label>Type of issue</label>
        <select name="issueType" value={formData.issueType} onChange={handleChange}>
          <option value="Vehicle issues/Faulty car">Vehicle issues/Faulty car</option>
          <option value="Tracker issues">Tracker issues</option>
          <option value="Insurance Claim">Insurance Claim</option>
          <option value="Document Renewal">Document Renewal</option>
          <option value="Vehicle Servicing">Vehicle Servicing</option>
          <option value="Loan Payments">Loan Payments</option>
          <option value="Loan Liquidation">Loan Liquidation</option>
          <option value="General Inquiry">General Inquiry</option>
          <option value="Promotional Emails">Promotional Emails</option>
          <option value="Internal Request">Internal Request</option>
          <option value="Apprehension">Apprehension</option>
          <option value="Repair Finance request">Repair Finance request</option>
          <option value="Robbery">Robbery</option>
          <option value="Expired Doc">Expired Doc</option>
          <option value="AMC">AMC</option>
          <option value="Accident">Accident</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div className="form-group">
        <label>Document Type</label>
        <select name="documentType" value={formData.documentType} onChange={handleChange}>
          <option value="">Select Document Type</option>
          <option value="ID">ID</option>
          <option value="License">License</option>
          <option value="Vehicle Papers">Vehicle Papers</option>
          <option value="Insurance">Insurance</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
  );
}