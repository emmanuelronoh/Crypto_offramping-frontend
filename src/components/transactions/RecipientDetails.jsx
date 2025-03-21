import React from "react";
import "./RecipientDetails.css";

const RecipientDetails = () => {
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
        <select className="input-field">
          <option>MNT</option>
        </select>
        
        <label>Recipient Name</label>
        <input type="text" className="input-field" placeholder="John Doe" />

        <label>Phone Number</label>
        <input type="text" className="input-field" placeholder="+254712345678" />

        <label>Payment Reason</label>
        <input type="text" className="input-field" placeholder="Enter Payment Reason" />

        <div className="buttons">
          <button className="back-btn">Back</button>
          <button className="next-btn">I’ve Sent the Crypto →</button>
        </div>
      </div>
    </div>
  );
};

export default RecipientDetails;
