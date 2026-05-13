import { FormData } from './types';
import { countryTemplates } from './constants';
import React from 'react';

interface CountrySpecificFieldsProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

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
