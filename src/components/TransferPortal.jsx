import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();

  // State variables to store input values
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [coin, setCoin] = useState("");
  const [error, setError] = useState("");

  // Function to validate and proceed
  const handleContinue = () => {
    if (!contactPerson || !email || !amount || !coin) {
      setError("Please fill in all fields before proceeding.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (amount <= 0) {
      setError("Amount must be greater than zero.");
      return;
    }

    // If all checks pass, redirect user
    setError(""); // Clear any previous error messages
    navigate("/entering-phone-number");
  };

  return (
    <div className="home">
      <section className="intro">
        <h1>Send Crypto, Receive <br /> Mobile Money</h1>
        <div className="buttons">
          <button className="start">Start Sending <span className="arrow">→</span></button>
        </div>
      </section>

      <section className="send-money">
        <div className="card">
          <h2>Send Money</h2>
          <p>Convert crypto to mobile money in a few simple steps</p>

          <div className="steps">
            <span className="step active">1</span>
            <div className="line"></div>
            <span className="step">2</span>
            <div className="line"></div>
            <span className="step">3</span>
          </div>

          <div className="form">
            <h3>Send Crypto</h3>
            <p>Choose the cryptocurrency and amount you want to send</p>

            {error && <p className="error-message">{error}</p>} {/* Display error message */}

            <label>Contact Person</label>
            <input
              type="text"
              placeholder="John Doe"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
            />

            <label>Email</label>
            <input
              type="email"
              placeholder="johndoe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Amount</label>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <label>Coin</label>
            <select value={coin} onChange={(e) => setCoin(e.target.value)}>
              <option value="">Select a coin</option>
              <option>Bitcoin (BTC)</option>
              <option>Ethereum (ETH)</option>
              <option>Tether (USDT)</option>
              <option>Binance Coin (BNB)</option>
              <option>USD Coin (USDC)</option>
              <option>XRP (Ripple)</option>
              <option>Dogecoin (DOGE)</option>
              <option>Cardano (ADA)</option>
              <option>Solana (SOL)</option>
              <option>Polygon (MATIC)</option>
            </select>

            <button className="continue" onClick={handleContinue}>Continue →</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
