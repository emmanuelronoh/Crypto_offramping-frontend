import React from "react";
import "./EnterRecipient.css";
import { FaQrcode } from "react-icons/fa";
import { FaClipboard } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SendMoney = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Header Section - Outside the Card */}
      <div className="header-section">
        <h2 className="title">Send Money</h2>
        <p className="subtitle">Convert crypto to mobile money in a few simple steps</p>

        {/* Progress Steps */}
        <div className="progress">
          <div className="step-container">
            <span className="step active">1</span>
            <div className="line active"></div>
          </div>
          <div className="step-container">
            <span className="step active">2</span>
            <div className="line"></div>
          </div>
          <div className="step-container">
            <span className="step">3</span>
          </div>
          <span className="step-text">Step 3 of 3</span>
        </div>
      </div>

      {/* Content Card - Starts Below the Header */}
      <div className="container">
        {/* Recipient Details Card */}
        <div className="card">
          <h3 className="section-title">Recipient Details</h3>
          <p>Enter the recipient mobile money information</p>
          <p className="btc-info">
            Send <strong>0.23 BTC</strong> to
            <span className="rate">1 BTC = 65,000 KES</span>
          </p>

          <div className="address-box">1FfmbHfnpaZjKFvyi1okTjJJusN455paPH</div>

          <div className="buttons">
            <button className="btn">
              <FaClipboard /> Copy Address
            </button>
            <button className="btn">
              <FaQrcode /> Show QR Scan
            </button>
          </div>
        </div>

        {/* Transaction Summary Card */}
        <div className="card transaction-summary">
          <h3 className="section-title">Transaction Summary</h3>

          <div className="summary-row">
            <span className="summary-label">Amount:</span>
            <span className="summary-value">20 BTC</span>
          </div>

          <div className="summary-row">
            <span className="summary-label">Recipient:</span>
            <span className="summary-value">Not specified</span>
          </div>

          <div className="summary-row">
            <span className="summary-label">Phone Number:</span>
            <span className="summary-value">Not specified</span>
          </div>

          <div className="summary-row">
            <span className="summary-label">Mobile Money:</span>
            <span className="summary-value">M-Pesa</span>
          </div>
        </div>

        {/* Warning Message */}
        <div className="warning">
          Please wait for at least 1 confirmation before proceeding to the next step
        </div>

        {/* Action Buttons */}
        <div className="actions">
        <button className="btn back" onClick={() => navigate("/transfer-portal")}>
            Back
          </button>
          <button className="btn complete" onClick={() => navigate("/transaction-confirmation")}>
          Complete Transfer ➜</button>
        </div>
      </div>
    </>
  );
};

export default SendMoney;
