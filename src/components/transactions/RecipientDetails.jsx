import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RecipientDetails.css";

const RecipientDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    networkProvider: "MNT",
    recipientName: "",
    phoneNumber: "",
    paymentReason: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!formData.recipientName.trim()) {
      newErrors.recipientName = "Recipient name is required";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\+?\d{10,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Enter a valid phone number";
    }

    if (!formData.paymentReason.trim()) {
      newErrors.paymentReason = "Payment reason is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when user types
  };

  const handleSubmit = () => {
    if (validateForm()) {
      navigate("/send-money");
    }
  };

  return (
    <div className="recipient-container">
      <h2 className="title">Send Money</h2>
      <p className="subtitle">Convert crypto to mobile money in a few simple steps</p>

      <div className="progress-bar">
        <div className="step active">1</div>
        <div className="line"></div>
        <div className="step active">2</div>
        <div className="line"></div>
        <div className="step">3</div>
        <div className="line"></div>
        <div className="step">4</div>
        <span className="step-info">Step 2 of 4</span>
      </div>

      <div className="payment-details">
        <h3>Payment Details</h3>
        <p>Select payment details</p>

        <label>Network Provider</label>
        <select
          className="input-field"
          name="networkProvider"
          value={formData.networkProvider}
          onChange={handleChange}
        >
          <option>MNT</option>
        </select>

        <label>Recipient Name</label>
        <input
          type="text"
          name="recipientName"
          className={`input-field ${errors.recipientName ? "error-border" : ""}`}
          placeholder="John Doe"
          value={formData.recipientName}
          onChange={handleChange}
        />
        {errors.recipientName && <p className="error-text">{errors.recipientName}</p>}

        <label>Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          className={`input-field ${errors.phoneNumber ? "error-border" : ""}`}
          placeholder="+254712345678"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        {errors.phoneNumber && <p className="error-text">{errors.phoneNumber}</p>}

        <label>Payment Reason</label>
        <input
          type="text"
          name="paymentReason"
          className={`input-field ${errors.paymentReason ? "error-border" : ""}`}
          placeholder="Enter Payment Reason"
          value={formData.paymentReason}
          onChange={handleChange}
        />
        {errors.paymentReason && <p className="error-text">{errors.paymentReason}</p>}

        <div className="buttons">
          <button className="back-btn" onClick={() => navigate("/transfer-portal")}>
            Back
          </button>
          <button className="next-btn" onClick={handleSubmit}>
            I’ve Sent the Crypto →
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipientDetails;
