import { FormData } from './types';
import React from 'react';

interface CountrySpecificFieldsProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

type FieldType = 'input' | 'select';

interface FieldConfig {
  label: string;
  name: keyof FormData;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  inputType?: string;
}

interface CountryTemplate {
  title: string;
  fields: FieldConfig[];
}

const countryTemplates: Record<string, CountryTemplate> = {
  Kenya: {
    title: 'Kenya Specific Information',
    fields: [
      { label: 'Location', name: 'location', type: 'input', placeholder: 'e.g., Nairobi' },
      { label: 'Vehicle Make', name: 'make', type: 'input', placeholder: 'e.g., Toyota' },
      { label: 'Vehicle Model', name: 'model', type: 'input', placeholder: 'e.g., Corolla' },
      { label: 'Car Registration', name: 'carReg', type: 'input', placeholder: 'e.g., KCA 123A' },
      { label: 'Payment Method', name: 'payment', type: 'select', options: ['Cash', 'M-Pesa', 'Bank Transfer', 'Card'] },
    ],
  },
  Nigeria: {
    title: 'Nigeria Specific Information',
    fields: [
      { label: 'State/Location', name: 'location', type: 'select', options: ['Lagos', 'Abuja', 'Kano', 'Ibadan', 'Port Harcourt'] },
      { label: 'Vehicle Make', name: 'make', type: 'input', placeholder: 'e.g., Toyota' },
      { label: 'Vehicle Model', name: 'model', type: 'input', placeholder: 'e.g., Camry' },
      { label: 'Car Registration', name: 'carReg', type: 'input', placeholder: 'e.g., ABC 123 XY' },
      { label: 'Payment Method', name: 'payment', type: 'select', options: ['Cash', 'Bank Transfer', 'POS/Card', 'USSD Banking'] },
    ],
  },
  Ghana: {
    title: 'Ghana Specific Information',
    fields: [
      { label: 'Region', name: 'location', type: 'select', options: ['Greater Accra', 'Ashanti', 'Western', 'Eastern', 'Central'] },
      { label: 'Vehicle Make', name: 'make', type: 'input', placeholder: 'e.g., Toyota' },
      { label: 'Vehicle Model', name: 'model', type: 'input', placeholder: 'e.g., Vitz' },
      { label: 'Car Registration', name: 'carReg', type: 'input', placeholder: 'e.g., GT 123-45' },
      { label: 'Payment Method', name: 'payment', type: 'select', options: ['Cash', 'Mobile Money', 'Bank Transfer', 'Card'] },
    ],
  },
  Morocco: {
    title: 'Morocco Specific Information',
    fields: [
      { label: 'City/Region', name: 'location', type: 'select', options: ['Casablanca', 'Rabat', 'Marrakech', 'Fes', 'Tangier'] },
      { label: 'Vehicle Make', name: 'make', type: 'input', placeholder: 'e.g., Renault' },
      { label: 'Vehicle Model', name: 'model', type: 'input', placeholder: 'e.g., Clio' },
      { label: 'Car Registration', name: 'carReg', type: 'input', placeholder: 'e.g., 12345-A-67' },
      { label: 'Payment Method', name: 'payment', type: 'select', options: ['Cash', 'Bank Transfer', 'Card'] },
    ],
  },
  Senegal: {
    title: 'Senegal Specific Information',
    fields: [
      { label: 'Region', name: 'location', type: 'select', options: ['Dakar', 'Saint-Louis', 'Thiès', 'Ziguinchor', 'Kaolack'] },
      { label: 'Vehicle Make', name: 'make', type: 'input', placeholder: 'e.g., Toyota' },
      { label: 'Vehicle Model', name: 'model', type: 'input', placeholder: 'e.g., Corolla' },
      { label: 'Car Registration', name: 'carReg', type: 'input', placeholder: 'e.g., DK-1234-AB' },
      { label: 'Payment Method', name: 'payment', type: 'select', options: ['Cash', 'Orange Money', 'Bank Transfer', 'Card'] },
    ],
  },
  "Cote D'ivoire": {
    title: "Cote D'ivoire Specific Information",
    fields: [
      { label: 'Region', name: 'location', type: 'select', options: ['Abidjan', 'Bouaké', 'Daloa', 'Yamoussoukro', 'San-Pédro'] },
      { label: 'Vehicle Make', name: 'make', type: 'input', placeholder: 'e.g., Toyota' },
      { label: 'Vehicle Model', name: 'model', type: 'input', placeholder: 'e.g., Hilux' },
      { label: 'Car Registration', name: 'carReg', type: 'input', placeholder: 'e.g., CI-1234-AB' },
      { label: 'Payment Method', name: 'payment', type: 'select', options: ['Cash', 'Mobile Money', 'Bank Transfer', 'Card'] },
    ],
  },
};

export default function CountrySpecificFields({ formData, handleChange }: CountrySpecificFieldsProps) {
  const template = countryTemplates[formData.country];

  if (!template) return null;

  return (
    <div className="country-section">
      <h3 className="section-title">{template.title}</h3>
      <div className="form-grid">
        {template.fields.map((field) => {
          const value = String(formData[field.name] ?? '');

          return (
            <div className="form-group" key={`${formData.country}-${field.name}`}>
              <label>{field.label}</label>
              {field.type === 'select' ? (
                <select
                  name={field.name}
                  value={value}
                  onChange={handleChange}
                  required={field.required}
                >
                  <option value="">Select {field.label.replace(' *', '')}</option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  name={field.name}
                  type={field.inputType || 'text'}
                  value={value}
                  placeholder={field.placeholder}
                  onChange={handleChange}
                  required={field.required}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
