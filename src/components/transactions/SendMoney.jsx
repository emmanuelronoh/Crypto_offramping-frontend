import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBitcoin } from "react-icons/fa";
import { IoArrowForwardOutline } from "react-icons/io5";
import "./SendMoney.css";

const SendMoney = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { amount, currency, exchangeRate } = location.state || {}; 

  // Calculate the received amount
  const receivedAmount = amount ? (amount * exchangeRate * 0.984).toLocaleString() : "0"; // Deducting 1.6% fee

  return (
    <div className="send-money-container">
      <h2 className="title">Send Money</h2>
      <p className="subtitle">Convert crypto to mobile money in a few simple steps</p>
      <div className="progress-bar">
        <div className="progress-container">
          <div className="progress-step completed">1</div>
          <div className="progress-line active"></div>
          <div className="progress-step active">2</div>
          <div className="progress-line"></div>
          <div className="progress-step active">3</div>
          <div className="progress-line"></div>
          <div className="progress-step">4</div>
        </div>
        <span className="step-label">Step 3 of 4</span>
      </div>

      <div className="send-crypto-box">
        <h3 className="section-title">Send Crypto</h3>
        <p className="section-subtitle">Choose the cryptocurrency and amount you want to send</p>
        
        <div className="crypto-info">
          <div className="info-box">
            <p className="label">You send</p>
            <p className="value">{amount} BTC <FaBitcoin className="btc-icon" /></p>
          </div>
          <div className="info-box">
            <p className="label">They Get</p>
            <p className="value">{receivedAmount} {currency}</p>
          </div>
        </div>

        <div className="exchange-info">
          <p><strong>Phone Number</strong> <span>+254-xyz-xyzx</span></p>
          <p><strong>Network Provider</strong> <span>MNT</span></p>
          <p><strong>Exchange Rate</strong> <span>1 BTC = {exchangeRate} {currency}</span></p>
          <p><strong>Fee</strong> <span>1.6%</span></p>
          <p><strong>Transfer time</strong> <span>Within minutes</span></p>
        </div>

        <div className="buttons">
          <button className="back-btn" onClick={() => navigate("/recipient")}> Back</button>
          <button className="send-btn" onClick={() => navigate("/entering-phone-number")}>
            I've Sent the Crypto <IoArrowForwardOutline />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
