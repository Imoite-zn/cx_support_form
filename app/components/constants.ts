import { FormData } from './types';

/* ================================================================
   RATE LIMITING
================================================================ */
export const RATE_LIMIT_MS = 30000;
export const RATE_LIMIT_KEY = 'ticket_submit_limit';

/* ================================================================
   TRANSLATIONS
================================================================ */
export const translations = {
  en: {
    contactName: 'Contact Name',
    email: 'Email',
    country: 'Country',
    phone: 'Phone',
    caseType: 'Case Type',
    escalationPath: 'Escalation Path',
    caseReason: 'Case Type Reason',
    subReason: 'Case Type Sub-reason',
    issueType: 'Type of issue',
    documentType: 'Document Type',
    selectCountry: 'Select Country',
    selectCaseType: 'Select Case Type',
    selectEscalationPath: 'Select Escalation Path',
    selectCaseReason: 'Select Case Reason',
    selectSubReason: 'Select Sub-reason',
    selectIssueType: 'Select Issue Type',
    selectDocumentType: 'Select Document Type',
    emailPlaceholder: 'you@example.com',
    caseTypeOptions: ['Complaint', 'Inquiry', 'Request', 'Suggestion/Feedback', 'Junks', 'Internal Communication', 'VAP Campaign', 'Other'],
    escalationPathOptions: ['None', 'N/A', 'Operations', 'AFS', 'The Customer', 'Bank Engagement', 'Bank Operations', 'Finance', 'Telematics', 'Customer Success Partner', 'Legal', 'Repo', 'Customer Experience', 'Marketing', 'HR'],
    caseReasonOptions: ['Vehicle Inspection', 'Payment Issue', 'App Issue', 'Account Issue', 'Other', 'CMP- Application Issue', 'CMP- Service Centre Issue', 'CMP- Product Knowledge Issue', 'CMP- Rude Staff', 'CMP- Faulty Vehicle', 'CMP- AMC Issue', 'CMP- Car Delivery Issue', 'CMP- Wrong Transaction', 'CMP- Repayment not updated', 'CMP- Car Documents', 'CMP- Liquidation Issue', 'CMP- Loan Restructuring Issue', 'CMP- Dealer Management', 'CMP- Vehicle Repossession', 'CMP- Wrong Plate Number', 'CMP- Loan Repayment Issue', 'CMP- CAC Document Issue', 'CMP Bank- Faulty Vehicle', 'CMP Bank- Document Issue', 'CMP Bank- PFI Issue', 'CMP- Account Statement Issue', 'Final Message for Repossession'],
    subReasonOptions: ['Sub1', 'Sub2', 'Sub3'],
    issueTypeOptions: ['Vehicle issues/Faulty car', 'Tracker issues', 'Insurance Claim', 'Document Renewal', 'Vehicle Servicing', 'Loan Payments', 'Loan Liquidation', 'General Inquiry', 'Promotional Emails', 'Internal Request', 'Apprehension', 'Repair Finance request', 'Robbery', 'Expired Doc', 'AMC', 'Accident', 'Others'],
    documentTypeOptions: ['ID', 'License', 'Vehicle Papers', 'Insurance', 'Other'],
    countryOptions: ['Kenya', 'Nigeria', 'Ghana', 'Morocco', 'Senegal', "Cote D'ivoire"],
  },
  fr: {
    contactName: 'Nom du contact',
    email: 'Email',
    country: 'Pays',
    phone: 'Téléphone',
    caseType: 'Type de cas',
    escalationPath: 'Chemin d\'escalade',
    caseReason: 'Raison du type de cas',
    subReason: 'Sous-raison du type de cas',
    issueType: 'Type de problème',
    documentType: 'Type de document',
    selectCountry: 'Sélectionnez le pays',
    selectCaseType: 'Sélectionnez le type de cas',
    selectEscalationPath: 'Sélectionnez le chemin d\'escalade',
    selectCaseReason: 'Sélectionnez la raison',
    selectSubReason: 'Sélectionnez la sous-raison',
    selectIssueType: 'Sélectionnez le type de problème',
    selectDocumentType: 'Sélectionnez le type de document',
    emailPlaceholder: 'vous@exemple.com',
    caseTypeOptions: ['Plainte', 'Demande de renseignements', 'Demande', 'Suggestion/Commentaire', 'Courriers indésirables', 'Communication interne', 'Campagne VAP', 'Autre'],
    escalationPathOptions: ['Aucun', 'N/A', 'Opérations', 'AFS', 'Le Client', 'Engagement Bancaire', 'Opérations Bancaires', 'Finance', 'Télématique', 'Partenaire de Succès Client', 'Juridique', 'Repo', 'Expérience Client', 'Marketing', 'RH'],
    caseReasonOptions: ['Inspection du véhicule', 'Problème de paiement', 'Problème d\'application', 'Problème de compte', 'Autre', 'CMP- Application Issue', 'CMP- Service Centre Issue', 'CMP- Product Knowledge Issue', 'CMP- Rude Staff', 'CMP- Faulty Vehicle', 'CMP- AMC Issue', 'CMP- Car Delivery Issue', 'CMP- Wrong Transaction', 'CMP- Repayment not updated', 'CMP- Car Documents', 'CMP- Liquidation Issue', 'CMP- Loan Restructuring Issue', 'CMP- Dealer Management', 'CMP- Vehicle Repossession', 'CMP- Wrong Plate Number', 'CMP- Loan Repayment Issue', 'CMP- CAC Document Issue', 'CMP Bank- Faulty Vehicle', 'CMP Bank- Document Issue', 'CMP Bank- PFI Issue', 'CMP- Account Statement Issue', 'Final Message for Repossession'],
    subReasonOptions: ['Sub1', 'Sub2', 'Sub3'],
    issueTypeOptions: ['Problèmes de véhicule/Voiture défectueuse', 'Problèmes de tracker', 'Réclamation d\'assurance', 'Renouvellement de documents', 'Entretien du véhicule', 'Paiements de prêt', 'Liquidation de prêt', 'Demande générale', 'Emails promotionnels', 'Demande interne', 'Appréhension', 'Demande de financement de réparation', 'Vol', 'Document expiré', 'AMC', 'Accident', 'Autres'],
    documentTypeOptions: ['ID', 'Licence', 'Documents du véhicule', 'Assurance', 'Autre'],
    countryOptions: ['Kenya', 'Nigeria', 'Ghana', 'Maroc', 'Sénégal', "Côte d'Ivoire"],
  },
  ar: {
    contactName: 'اسم الاتصال',
    email: 'البريد الإلكتروني',
    country: 'البلد',
    phone: 'الهاتف',
    caseType: 'نوع الحالة',
    escalationPath: 'مسار التصعيد',
    caseReason: 'سبب نوع الحالة',
    subReason: 'سبب فرعي لنوع الحالة',
    issueType: 'نوع المشكلة',
    documentType: 'نوع الوثيقة',
    selectCountry: 'اختر البلد',
    selectCaseType: 'اختر نوع الحالة',
    selectEscalationPath: 'اختر مسار التصعيد',
    selectCaseReason: 'اختر السبب',
    selectSubReason: 'اختر السبب الفرعي',
    selectIssueType: 'اختر نوع المشكلة',
    selectDocumentType: 'اختر نوع الوثيقة',
    emailPlaceholder: 'you@example.com',
    caseTypeOptions: ['شكوى', 'استفسار', 'طلب', 'اقتراح/تعليق', 'رسائل مزعجة', 'تواصل داخلي', 'حملة VAP', 'أخرى'],
    escalationPathOptions: ['لا شيء', 'غير متوفر', 'العمليات', 'AFS', 'العميل', 'التزام البنك', 'عمليات البنك', 'المالية', 'التيليماتيك', 'شريك نجاح العميل', 'القانوني', 'الريبو', 'تجربة العميل', 'التسويق', 'الموارد البشرية'],
    caseReasonOptions: ['فحص السيارة', 'مشكلة دفع', 'مشكلة التطبيق', 'مشكلة الحساب', 'أخرى', 'CMP- Application Issue', 'CMP- Service Centre Issue', 'CMP- Product Knowledge Issue', 'CMP- Rude Staff', 'CMP- Faulty Vehicle', 'CMP- AMC Issue', 'CMP- Car Delivery Issue', 'CMP- Wrong Transaction', 'CMP- Repayment not updated', 'CMP- Car Documents', 'CMP- Liquidation Issue', 'CMP- Loan Restructuring Issue', 'CMP- Dealer Management', 'CMP- Vehicle Repossession', 'CMP- Wrong Plate Number', 'CMP- Loan Repayment Issue', 'CMP- CAC Document Issue', 'CMP Bank- Faulty Vehicle', 'CMP Bank- Document Issue', 'CMP Bank- PFI Issue', 'CMP- Account Statement Issue', 'Final Message for Repossession'],
    subReasonOptions: ['فرعي1', 'فرعي2', 'فرعي3'],
    issueTypeOptions: ['مشاكل السيارة/سيارة معيبة', 'مشاكل المتعقب', 'مطالبة التأمين', 'تجديد الوثائق', 'صيانات السيارة', 'دفعات القرض', 'تسوية القرض', 'استفسار عام', 'رسائل ترويجية', 'طلب داخلي', 'احتجاز', 'طلب تمويل إصلاح', 'سرقة', 'وثيقة منتهية', 'AMC', 'حادث', 'أخرى'],
    documentTypeOptions: ['هوية', 'رخصة', 'مستندات السيارة', 'تأمين', 'أخرى'],
    countryOptions: ['كينيا', 'نيجيريا', 'غانا', 'المغرب', 'السنغال', 'ساحل العاج'],
  },
};

/* ================================================================
   FIELD VALUES
================================================================ */
export const countryValues = ['Kenya', 'Nigeria', 'Ghana', 'Morocco', 'Senegal', "Cote D'ivoire"];
export const caseTypeValues = ['Complaint', 'Inquiry', 'Request', 'Feedback', 'Junks', 'Internal Communication', 'VAP Campaign', 'Other'];
export const escalationPathValues = ['None', 'N/A', 'Operations', 'AFS', 'The Customer', 'Bank Engagement', 'Bank Operations', 'Finance', 'Telematics', 'Customer Success Partner', 'Legal', 'Repo', 'Customer Experience', 'Marketing', 'HR'];
export const caseReasonValues = ['Vehicle Inspection', 'Payment Issue', 'App Issue', 'Account Issue', 'Other', 'CMP- Application Issue', 'CMP- Service Centre Issue', 'CMP- Product Knowledge Issue', 'CMP- Rude Staff', 'CMP- Faulty Vehicle', 'CMP- AMC Issue', 'CMP- Car Delivery Issue', 'CMP- Wrong Transaction', 'CMP- Repayment not updated', 'CMP- Car Documents', 'CMP- Liquidation Issue', 'CMP- Loan Restructuring Issue', 'CMP- Dealer Management', 'CMP- Vehicle Repossession', 'CMP- Wrong Plate Number', 'CMP- Loan Repayment Issue', 'CMP- CAC Document Issue', 'CMP Bank- Faulty Vehicle', 'CMP Bank- Document Issue', 'CMP Bank- PFI Issue', 'CMP- Account Statement Issue', 'Final Message for Repossession'];
export const subReasonValues = ['Sub1', 'Sub2', 'Sub3'];
export const issueTypeValues = ['Vehicle issues/Faulty car', 'Tracker issues', 'Insurance Claim', 'Document Renewal', 'Vehicle Servicing', 'Loan Payments', 'Loan Liquidation', 'General Inquiry', 'Promotional Emails', 'Internal Request', 'Apprehension', 'Repair Finance request', 'Robbery', 'Expired Doc', 'AMC', 'Accident', 'Others'];
export const documentTypeValues = ['ID', 'License', 'Vehicle Papers', 'Insurance', 'Other'];

/* ================================================================
   COUNTRY TEMPLATES
================================================================ */
type FieldType = 'input' | 'select';

interface FieldConfig {
  label: string;
  name: keyof FormData;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  inputType?: string;
  selectPlaceholder?: string;
}

interface CountryTemplate {
  title: string;
  fields: FieldConfig[];
}

export const countryTemplates: Record<string, CountryTemplate> = {
  Kenya: {
    title: 'Kenya Specific Information',
    fields: [
      { label: 'Location', name: 'location', type: 'input', placeholder: 'e.g., Nairobi' },
      { label: 'Vehicle Make', name: 'make', type: 'input', placeholder: 'e.g., Toyota' },
      { label: 'Vehicle Model', name: 'model', type: 'input', placeholder: 'e.g., Corolla' },
      { label: 'Car Registration', name: 'carReg', type: 'input', placeholder: 'e.g., KCA 123A' },
    ],
  },
  Nigeria: {
    title: 'Nigeria Specific Information',
    fields: [
      { label: 'State/Location', name: 'location', type: 'select', options: ['Lagos', 'Abuja', 'Kano', 'Ibadan', 'Port Harcourt'], selectPlaceholder: 'Select State/Location' },
      { label: 'Vehicle Make', name: 'make', type: 'input', placeholder: 'e.g., Toyota' },
      { label: 'Vehicle Model', name: 'model', type: 'input', placeholder: 'e.g., Camry' },
      { label: 'Car Registration', name: 'carReg', type: 'input', placeholder: 'e.g., ABC 123 XY' },
    ],
  },
  Ghana: {
    title: 'Ghana Specific Information',
    fields: [
      { label: 'Region', name: 'location', type: 'select', options: ['Greater Accra', 'Ashanti', 'Western', 'Eastern', 'Central'], selectPlaceholder: 'Select Region' },
      { label: 'Vehicle Make', name: 'make', type: 'input', placeholder: 'e.g., Toyota' },
      { label: 'Vehicle Model', name: 'model', type: 'input', placeholder: 'e.g., Vitz' },
      { label: 'Car Registration', name: 'carReg', type: 'input', placeholder: 'e.g., GT 123-45' },
    ],
  },
  Morocco: {
    title: 'معلومات خاصة بالمغرب',
    fields: [
      { label: 'المدينة/المنطقة', name: 'location', type: 'select', options: ['Casablanca', 'Rabat', 'Marrakech', 'Fes', 'Tangier'], selectPlaceholder: 'اختر المدينة/المنطقة' },
      { label: 'ماركة السيارة', name: 'make', type: 'input', placeholder: 'مثال: Renault' },
      { label: 'طراز السيارة', name: 'model', type: 'input', placeholder: 'مثال: Clio' },
      { label: 'تسجيل السيارة', name: 'carReg', type: 'input', placeholder: 'مثال: 12345-A-67' },
    ],
  },
  Senegal: {
    title: 'Informations spécifiques au Sénégal',
    fields: [
      { label: 'Région', name: 'location', type: 'select', options: ['Dakar', 'Saint-Louis', 'Thiès', 'Ziguinchor', 'Kaolack'], selectPlaceholder: 'Sélectionnez la région' },
      { label: 'Marque du véhicule', name: 'make', type: 'input', placeholder: 'ex., Toyota' },
      { label: 'Modèle du véhicule', name: 'model', type: 'input', placeholder: 'ex., Corolla' },
      { label: 'Immatriculation du véhicule', name: 'carReg', type: 'input', placeholder: 'ex., DK-1234-AB' },
    ],
  },
  "Cote D'ivoire": {
    title: "Informations spécifiques à la Côte d'Ivoire",
    fields: [
      { label: 'Région', name: 'location', type: 'select', options: ['Abidjan', 'Bouaké', 'Daloa', 'Yamoussoukro', 'San-Pédro'], selectPlaceholder: 'Sélectionnez la région' },
      { label: 'Marque du véhicule', name: 'make', type: 'input', placeholder: 'ex., Toyota' },
      { label: 'Modèle du véhicule', name: 'model', type: 'input', placeholder: 'ex., Hilux' },
      { label: 'Immatriculation du véhicule', name: 'carReg', type: 'input', placeholder: 'ex., CI-1234-AB' },
    ],
  },
};

/* ================================================================
   EMAIL ROUTING
================================================================ */
export const countryEmailMap: Record<string, string> = {
  'Nigeria': 'customerexperience.ng@autochek.africa',
  'Kenya': 'customerexperience.ke@autochek.africa',
  'Ghana': 'customerexperience.gh@autochek.africa',
  'Morocco': 'customerexperience.ma@autochek.africa',
  'Uganda': 'customerexperience.ug@autochek.africa',
  'Senegal': 'customerexperience.s@autochek.africa',
  'Cote D\'ivoire': 'customerexperience.cv@autochek.africa'
};

/* ================================================================
   EMAIL TEMPLATES
================================================================ */
interface EmailTemplate {
  subject: string;
  greeting: string;
  intro: string;
  detailsIntro: string;
  closing: string;
  signature: string;
}

export const emailTemplates: Record<string, EmailTemplate> = {
  en: {
    subject: 'New Support Ticket Submission',
    greeting: 'Dear Customer Experience Team,',
    intro: 'A new support ticket has been submitted with the following details:',
    detailsIntro: 'Ticket Details:',
    closing: 'Please review and respond to the customer accordingly.',
    signature: 'Best regards,<br>Support System',
  },
  fr: {
    subject: 'Nouvelle soumission de ticket de support',
    greeting: 'Cher équipe d\'expérience client,',
    intro: 'Un nouveau ticket de support a été soumis avec les détails suivants:',
    detailsIntro: 'Détails du ticket:',
    closing: 'Veuillez examiner et répondre au client en conséquence.',
    signature: 'Cordialement,<br>Système de support',
  },
  ar: {
    subject: 'تقديم تذكرة دعم جديدة',
    greeting: 'عزيزي فريق تجربة العميل،',
    intro: 'تم تقديم تذكرة دعم جديدة مع التفاصيل التالية:',
    detailsIntro: 'تفاصيل التذكرة:',
    closing: 'يرجى مراجعة والرد على العميل وفقاً لذلك.',
    signature: 'مع خالص التحية،<br>نظام الدعم',
  },
};

/* ================================================================
   LANGUAGE MAPPING
================================================================ */
export const getLanguage = (country: string): 'en' | 'fr' | 'ar' => {
  switch (country) {
    case 'Morocco':
      return 'ar';
    case 'Senegal':
    case "Cote D'ivoire":
      return 'fr';
    default:
      return 'en';
  }
};
