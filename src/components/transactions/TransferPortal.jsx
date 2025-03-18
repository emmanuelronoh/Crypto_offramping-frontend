import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [coin, setCoin] = useState("BTC");
  const [error, setError] = useState("");
  const [currency, setCurrency] = useState("KES");
  const [recipientName, setRecipientName] = useState("");
  const [receiveMethod, setReceiveMethod] = useState("M-PESA");
  const exchangeRates = { KES: 65000, TSH: 150000, UGX: 240000 }; // Sample rates
  const feePercentage = 1.6;
  const localCurrency = amount ? (parseFloat(amount) * exchangeRates[currency]).toLocaleString() : "";



  const handleContinue = () => {
    if (!amount || !coin || !recipientName) {
      setError("Please enter an amount, recipient name, and select a cryptocurrency.");
      return;
    }
    if (parseFloat(amount) <= 0) {
      setError("Amount must be greater than zero.");
      return;
    }
    
    
    setError("");
    
    navigate("/send-money", {
      state: {
        amount,
        currency,
        exchangeRate: exchangeRates[currency],
        recipientName,
        coin,
        receiveMethod
      },
    });    
  };

  const receiveMethodIcons = {
    "M-PESA": "/assets/mpesa-logo.png",
    "Airtel Money": "/assets/airtel-logo.png",
    "Tigo Pesa": "/assets/tigo-logo.png"
  };

  return (
    <div className="home">
      {/* Sidebar Section */}
      <div className="sidebar">
        <h1>Send Crypto, Receive <br /> Mobile Money</h1>
        <div className="buttons">
          <button className="start-btn">Start Sending →</button>
        </div>
      </div>

      {/* Send Crypto Form */}
      <div className="send-container">
        <h2>Send Crypto</h2>
        <p>Choose the cryptocurrency and amount you want to send</p>

        {error && <p className="error">{error}</p>}
        
        <label htmlFor="recipient-name">Recipient Name</label>
        <div className="input-group">
          <input
            id="recipient-name"
            type="text"
            placeholder="Enter recipient name"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
          />
        </div>

        <label htmlFor="send-amount">You Send</label>
        <div className="input-group">
          <input
            id="send-amount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select value={coin} onChange={(e) => setCoin(e.target.value)}>
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
            <option value="USDT">USDT</option>
          </select>
        </div>

        <label htmlFor="local-currency">Local Currency</label>
        <div className="input-group">
          <input id="local-currency" type="text" value={localCurrency} readOnly />
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="KES">KES</option>
            <option value="TSH">TSH</option>
            <option value="UGX">UGX</option>
          </select>
        </div>

        <label htmlFor="receive-method">Receive Method</label>
        <div className="input-group receive-method">
          <img src={receiveMethodIcons[receiveMethod]} alt={receiveMethod} className="receive-icon" />
          <select id="receive-method" value={receiveMethod} onChange={(e) => setReceiveMethod(e.target.value)}>
            <option value="M-PESA">M-PESA</option>
            <option value="Airtel Money">Airtel Money</option>
            <option value="Tigo Pesa">Tigo Pesa</option>
          </select>
        </div>

        {/* Exchange Rate Summary */}
        <div className="summary">
          <p>Exchange Rate: <span>1 {coin} = {exchangeRates[currency]} {currency}</span></p>
          <p>Fee: <span>{feePercentage}%</span></p>
          <p>Transfer time: <span>Within minutes</span></p>
        </div>

        <button className="continue-btn" onClick={handleContinue}>
          Continue →
        </button>
      </div>
    </div>
  );
};

export default Home;