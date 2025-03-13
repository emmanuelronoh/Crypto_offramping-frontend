import React from "react";
import "./EnterRecipient.css";

function EnterRecipient() {
  return (
    <div className="send-money-wrapper">
      <div className="send-money">
        {/* Progress Bar */}
        <div className="progress-container">
          <div className="step completed">1</div>
          <div className="step active">2</div>
          <div className="step">3</div>
          <span className="step-text">Step 2 of 3</span>
        </div>

        <h1 className="title">Send Money</h1>
        <p className="subtitle">Convert crypto to mobile money in a few simple steps</p>
      </div>

      <div className="send-money-container">
        {/* Crypto Section */}
        <div className="card crypto-section">
          <h2>Send Crypto</h2>
          <p>Choose the cryptocurrency and amount you want to send.</p>
          <div className="address-box">
            <span className="crypto-amount">Send 20 BTC to:</span>
            <div className="address-container">
              <span className="address">bc1qxy2kgdyxja</span>
              <button className="copy-button">Copy Address</button>
            </div>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="card transaction-details">
          <h3>Transaction Details</h3>
          <div className="detail-item">
            <span>Amount:</span>
            <span>20 BTC</span>
          </div>
          <div className="detail-item">
            <span>Recipient Currency:</span>
            <span>M-Pesa</span>
          </div>
          <div className="detail-item">
            <span>Estimated Value:</span>
            <span>$13,000,000.00</span>
          </div>
        </div>

        {/* Confirmation Message */}
        <div className="card confirmation-message">
          <p className="warning-text">
            Please wait for at least 1 confirmation before proceeding to the next step.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="back-button">Back</button>
          <button className="send-button">
            I've Sent the Crypto <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EnterRecipient;
