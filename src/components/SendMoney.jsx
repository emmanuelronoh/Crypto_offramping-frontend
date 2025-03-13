import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SendMoney.css";

const SendMoney = () => {
  const [recipientName, setRecipientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("Kenya");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const validateAndSubmit = () => {
    if (!recipientName.trim()) {
      setError("Recipient name is required.");
      return;
    }
    if (!phoneNumber.trim() || !/^\+\d{7,15}$/.test(phoneNumber)) {
      setError("Enter a valid phone number (e.g., +254712345678).");
      return;
    }
    if (!country.trim()) {
      setError("Country is required.");
      return;
    }

    // Clear error and navigate to confirmation page
    setError("");
    navigate("/transaction-confirmation");
  };

  return (
    <div className="outside-part">
      <h2 className="title">Send Money</h2>
      <p className="subtitle">Convert crypto to mobile money in a few simple steps</p>
      
      <div className="steps-container">
        <span className="step active">1</span>
        <div className="line"></div>
        <span className="step">2</span>
        <div className="line"></div>
        <span className="step">3</span>
      </div>

      <div className="send-money-container">  
        <div className="form-section">
          <h3 className="section-title">Recipient Details</h3>
          <p className="section-description">Enter the recipient mobile money information</p>
          
          <label className="input-label">Recipient Name</label>
          <input 
            type="text" 
            className="input-field" 
            value={recipientName} 
            onChange={(e) => setRecipientName(e.target.value)}
          />
          
          <label className="input-label">Recipient Phone Number</label>
          <input 
            type="text" 
            className="input-field" 
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+254712345678"
          />
          
          <label className="input-label">Country</label>
          <select 
            className="input-field" 
            value={country} 
            onChange={(e) => setCountry(e.target.value)}
          >
            <option>Kenya</option>
            <option>Tanzania</option>
            <option>Uganda</option>
          </select>

          {error && <p className="error-message">{error}</p>}
        </div>
        
        <div className="transaction-summary">
          <h3 className="section-title">Transaction Summary</h3>
          <p><strong>Amount:</strong> 20 BTC</p>
          <p><strong>Recipient:</strong> {recipientName || "Not specified"}</p>
          <p><strong>Phone Number:</strong> {phoneNumber || "Not specified"}</p>
          <p><strong>Mobile Money:</strong> M-Pesa</p>
        </div>
        
        <div className="button-group">
          <button className="btn back">Back</button>
          <button className="btn complete-transfer" onClick={validateAndSubmit}>Complete Transfer</button>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
