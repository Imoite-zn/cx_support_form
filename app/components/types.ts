export interface FormData {
  country: string;
  contactName: string;
  caseType: string;
  caseReason: string;
  subReason: string;
  escalationPath: string;
  unitResponsible: string;
  issueType: string;
  email: string;
  phone: string;
  location: string;
  make: string;
  model: string;
  carReg: string;
  documentType: string;
  subject: string;
  description: string;
  attachments: File[];
  hpWebsite: string; // Honeypot
}

export const INITIAL_STATE: FormData = {
  country: 'Kenya',
  contactName: '',
  caseType: 'Complaint',
  caseReason: 'CMP- AMC Issue',
  subReason: '',
  escalationPath: '',
  unitResponsible: '',
  issueType: 'Vehicle issues/Faulty car',
  email: '',
  phone: '',
  location: '',
  make: '',
  model: '',
  carReg: '',
  documentType: '',
  subject: '',
  description: '',
  attachments: [],
  hpWebsite: '',
};