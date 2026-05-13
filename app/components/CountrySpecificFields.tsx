import { FormField, inputCls } from './ui/FormField';
import CustomSelect from './ui/CustomSelect';
import { FormData } from './types';
﻿import { FormData } from './types';
import { countryTemplates } from './constants';
import React from 'react';

type ChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;

interface CountrySpecificFieldsProps {
  formData: FormData;
  handleChange: (e: ChangeEvent | { target: { name: string; value: string } }) => void;
}

type FieldType = 'input' | 'select';

interface FieldConfig {
  label: string;
  name: keyof FormData;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
}

const countryTemplates: Record<string, { fields: FieldConfig[] }> = {
  Kenya: {
    fields: [
      { label: 'Location',         name: 'location', type: 'input',  required: true, placeholder: 'e.g., Nairobi' },
      { label: 'Vehicle Make',     name: 'make',     type: 'input',  required: true, placeholder: 'e.g., Toyota' },
      { label: 'Vehicle Model',    name: 'model',    type: 'input',  required: true, placeholder: 'e.g., Corolla' },
      { label: 'Car Registration', name: 'carReg',   type: 'input',  required: true, placeholder: 'e.g., KCA 123A' },
      { label: 'Payment Method',   name: 'payment',  type: 'select', required: true,
        options: ['Cash', 'M-Pesa', 'Bank Transfer', 'Card'] },
    ],
  },
  Nigeria: {
    fields: [
      { label: 'State / Location', name: 'location', type: 'select', required: true,
        options: ['Lagos', 'Abuja', 'Kano', 'Ibadan', 'Port Harcourt'] },
      { label: 'Vehicle Make',     name: 'make',     type: 'input',  required: true, placeholder: 'e.g., Toyota' },
      { label: 'Vehicle Model',    name: 'model',    type: 'input',  required: true, placeholder: 'e.g., Camry' },
      { label: 'Car Registration', name: 'carReg',   type: 'input',  required: true, placeholder: 'e.g., ABC 123 XY' },
      { label: 'Payment Method',   name: 'payment',  type: 'select', required: true,
        options: ['Cash', 'Bank Transfer', 'POS / Card', 'USSD Banking'] },
    ],
  },
  Ghana: {
    fields: [
      { label: 'Region',           name: 'location', type: 'select', required: true,
        options: ['Greater Accra', 'Ashanti', 'Western', 'Eastern', 'Central'] },
      { label: 'Vehicle Make',     name: 'make',     type: 'input',  required: true, placeholder: 'e.g., Toyota' },
      { label: 'Vehicle Model',    name: 'model',    type: 'input',  required: true, placeholder: 'e.g., Vitz' },
      { label: 'Car Registration', name: 'carReg',   type: 'input',  required: true, placeholder: 'e.g., GT 123-45' },
      { label: 'Payment Method',   name: 'payment',  type: 'select', required: true,
        options: ['Cash', 'Mobile Money', 'Bank Transfer', 'Card'] },
    ],
  },
  Morocco: {
    fields: [
      { label: 'City / Region',    name: 'location', type: 'select', required: true,
        options: ['Casablanca', 'Rabat', 'Marrakech', 'Fes', 'Tangier'] },
      { label: 'Vehicle Make',     name: 'make',     type: 'input',  required: true, placeholder: 'e.g., Renault' },
      { label: 'Vehicle Model',    name: 'model',    type: 'input',  required: true, placeholder: 'e.g., Clio' },
      { label: 'Car Registration', name: 'carReg',   type: 'input',  required: true, placeholder: 'e.g., 12345-A-67' },
      { label: 'Payment Method',   name: 'payment',  type: 'select', required: true,
        options: ['Cash', 'Bank Transfer', 'Card'] },
    ],
  },
  Senegal: {
    fields: [
      { label: 'Region',           name: 'location', type: 'select', required: true,
        options: ['Dakar', 'Saint-Louis', 'Thiès', 'Ziguinchor', 'Kaolack'] },
      { label: 'Vehicle Make',     name: 'make',     type: 'input',  required: true, placeholder: 'e.g., Toyota' },
      { label: 'Vehicle Model',    name: 'model',    type: 'input',  required: true, placeholder: 'e.g., Corolla' },
      { label: 'Car Registration', name: 'carReg',   type: 'input',  required: true, placeholder: 'e.g., DK-1234-AB' },
      { label: 'Payment Method',   name: 'payment',  type: 'select', required: true,
        options: ['Cash', 'Orange Money', 'Bank Transfer', 'Card'] },
    ],
  },
  "Cote D'ivoire": {
    fields: [
      { label: 'Region',           name: 'location', type: 'select', required: true,
        options: ['Abidjan', 'Bouaké', 'Daloa', 'Yamoussoukro', 'San-Pédro'] },
      { label: 'Vehicle Make',     name: 'make',     type: 'input',  required: true, placeholder: 'e.g., Toyota' },
      { label: 'Vehicle Model',    name: 'model',    type: 'input',  required: true, placeholder: 'e.g., Hilux' },
      { label: 'Car Registration', name: 'carReg',   type: 'input',  required: true, placeholder: 'e.g., CI-1234-AB' },
      { label: 'Payment Method',   name: 'payment',  type: 'select', required: true,
        options: ['Cash', 'Mobile Money', 'Bank Transfer', 'Card'] },
    ],
  },
};

export default function CountrySpecificFields({ formData, handleChange }: CountrySpecificFieldsProps) {
  const template = countryTemplates[formData.country];
  if (!template) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {template.fields.map((field) => {
        const value = String(formData[field.name] ?? '');
        if (field.type === 'select') {
          return (
            <FormField key={`${formData.country}-${field.name}`} label={field.label} required={field.required}>
              <CustomSelect
                name={field.name}
                value={value}
                options={field.options ?? []}
                placeholder={`Select ${field.label}`}
                onChange={handleChange}
              />
            </FormField>
          );
        }
        return (
          <FormField key={`${formData.country}-${field.name}`} label={field.label} required={field.required}>
            <input
              name={field.name}
              value={value}
              onChange={handleChange}
              placeholder={field.placeholder}
              className={inputCls()}
            />
          </FormField>
        );
      })}
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
                  <option value="">{field.selectPlaceholder || 'Select ' + field.label.replace(' *', '')}</option>
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
