import { FormData } from './types';
import React from 'react';

interface CountrySpecificFieldsProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default function CountrySpecificFields({ formData, handleChange }: CountrySpecificFieldsProps) {
  if (formData.country === 'Kenya') {
    return (
      <div className="country-section">
        <h3 className="section-title">Kenya Specific Information</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Location *</label>
            <input name="location" value={formData.location} onChange={handleChange} placeholder="e.g., Nairobi" required />
          </div>
          <div className="form-group">
            <label>Vehicle Make *</label>
            <input name="make" value={formData.make} onChange={handleChange} placeholder="e.g., Toyota" required />
          </div>
          <div className="form-group">
            <label>Vehicle Model *</label>
            <input name="model" value={formData.model} onChange={handleChange} placeholder="e.g., Corolla" required />
          </div>
          <div className="form-group">
            <label>Car Registration *</label>
            <input name="carReg" value={formData.carReg} onChange={handleChange} placeholder="e.g., KCA 123A" required />
          </div>
          <div className="form-group">
            <label>Payment Method *</label>
            <select name="payment" value={formData.payment} onChange={handleChange}>
              <option value="Cash">Cash</option>
              <option value="M-Pesa">M-Pesa</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Card">Card</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  if (formData.country === 'Nigeria') {
    return (
      <div className="country-section">
        <h3 className="section-title">Nigeria Specific Information</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>State/Location *</label>
            <select name="location" value={formData.location} onChange={handleChange} required>
              <option value="">Select State</option>
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja</option>
              <option value="Kano">Kano</option>
              <option value="Ibadan">Ibadan</option>
              <option value="Port Harcourt">Port Harcourt</option>
            </select>
          </div>
          <div className="form-group">
            <label>Vehicle Make *</label>
            <input name="make" value={formData.make} onChange={handleChange} placeholder="e.g., Toyota" required />
          </div>
          <div className="form-group">
            <label>Vehicle Model *</label>
            <input name="model" value={formData.model} onChange={handleChange} placeholder="e.g., Camry" required />
          </div>
          <div className="form-group">
            <label>Car Registration *</label>
            <input name="carReg" value={formData.carReg} onChange={handleChange} placeholder="e.g., ABC 123 XY" required />
          </div>
          <div className="form-group">
            <label>Payment Method *</label>
            <select name="payment" value={formData.payment} onChange={handleChange}>
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="POS">POS/Card</option>
              <option value="USSD">USSD Banking</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  if (formData.country === 'Ghana') {
    return (
      <div className="country-section">
        <h3 className="section-title">Ghana Specific Information</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Region *</label>
            <select name="location" value={formData.location} onChange={handleChange} required>
              <option value="">Select Region</option>
              <option value="Greater Accra">Greater Accra</option>
              <option value="Ashanti">Ashanti</option>
              <option value="Western">Western</option>
              <option value="Eastern">Eastern</option>
              <option value="Central">Central</option>
            </select>
          </div>
          <div className="form-group">
            <label>Vehicle Make *</label>
            <input name="make" value={formData.make} onChange={handleChange} placeholder="e.g., Toyota" required />
          </div>
          <div className="form-group">
            <label>Vehicle Model *</label>
            <input name="model" value={formData.model} onChange={handleChange} placeholder="e.g., Vitz" required />
          </div>
          <div className="form-group">
            <label>Car Registration *</label>
            <input name="carReg" value={formData.carReg} onChange={handleChange} placeholder="e.g., GT 123-45" required />
          </div>
          <div className="form-group">
            <label>Payment Method *</label>
            <select name="payment" value={formData.payment} onChange={handleChange}>
              <option value="Cash">Cash</option>
              <option value="Mobile Money">Mobile Money</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Card">Card</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  if (formData.country === 'Morocco') {
    return (
      <div className="country-section">
        <h3 className="section-title">Morocco Specific Information</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>City/Region *</label>
            <select name="location" value={formData.location} onChange={handleChange} required>
              <option value="">Select City</option>
              <option value="Casablanca">Casablanca</option>
              <option value="Rabat">Rabat</option>
              <option value="Marrakech">Marrakech</option>
              <option value="Fes">Fes</option>
              <option value="Tangier">Tangier</option>
            </select>
          </div>
          <div className="form-group">
            <label>Vehicle Make *</label>
            <input name="make" value={formData.make} onChange={handleChange} placeholder="e.g., Renault" required />
          </div>
          <div className="form-group">
            <label>Vehicle Model *</label>
            <input name="model" value={formData.model} onChange={handleChange} placeholder="e.g., Clio" required />
          </div>
          <div className="form-group">
            <label>Car Registration *</label>
            <input name="carReg" value={formData.carReg} onChange={handleChange} placeholder="e.g., 12345-A-67" required />
          </div>
          <div className="form-group">
            <label>Payment Method *</label>
            <select name="payment" value={formData.payment} onChange={handleChange}>
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Card">Card</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  if (formData.country === 'Senegal') {
    return (
      <div className="country-section">
        <h3 className="section-title">Senegal Specific Information</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Region *</label>
            <select name="location" value={formData.location} onChange={handleChange} required>
              <option value="">Select Region</option>
              <option value="Dakar">Dakar</option>
              <option value="Saint-Louis">Saint-Louis</option>
              <option value="Thiès">Thiès</option>
              <option value="Ziguinchor">Ziguinchor</option>
              <option value="Kaolack">Kaolack</option>
            </select>
          </div>
          <div className="form-group">
            <label>Vehicle Make *</label>
            <input name="make" value={formData.make} onChange={handleChange} placeholder="e.g., Toyota" required />
          </div>
          <div className="form-group">
            <label>Vehicle Model *</label>
            <input name="model" value={formData.model} onChange={handleChange} placeholder="e.g., Corolla" required />
          </div>
          <div className="form-group">
            <label>Car Registration *</label>
            <input name="carReg" value={formData.carReg} onChange={handleChange} placeholder="e.g., DK-1234-AB" required />
          </div>
          <div className="form-group">
            <label>Payment Method *</label>
            <select name="payment" value={formData.payment} onChange={handleChange}>
              <option value="Cash">Cash</option>
              <option value="Orange Money">Orange Money</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Card">Card</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  if (formData.country === "Cote D'ivoire") {
    return (
      <div className="country-section">
        <h3 className="section-title">Cote D'ivoire Specific Information</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Region *</label>
            <select name="location" value={formData.location} onChange={handleChange} required>
              <option value="">Select Region</option>
              <option value="Abidjan">Abidjan</option>
              <option value="Bouaké">Bouaké</option>
              <option value="Daloa">Daloa</option>
              <option value="Yamoussoukro">Yamoussoukro</option>
              <option value="San-Pédro">San-Pédro</option>
            </select>
          </div>
          <div className="form-group">
            <label>Vehicle Make *</label>
            <input name="make" value={formData.make} onChange={handleChange} placeholder="e.g., Toyota" required />
          </div>
          <div className="form-group">
            <label>Vehicle Model *</label>
            <input name="model" value={formData.model} onChange={handleChange} placeholder="e.g., Hilux" required />
          </div>
          <div className="form-group">
            <label>Car Registration *</label>
            <input name="carReg" value={formData.carReg} onChange={handleChange} placeholder="e.g., CI-1234-AB" required />
          </div>
          <div className="form-group">
            <label>Payment Method *</label>
            <select name="payment" value={formData.payment} onChange={handleChange}>
              <option value="Cash">Cash</option>
              <option value="Mobile Money">Mobile Money</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Card">Card</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  return null;
}