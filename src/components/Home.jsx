import React from "react";
import "./home.css";

const Home = () => {
  return (
    <div className="home">
      <section className="intro">
        <h1>Send Crypto, Receive <br /> Mobile Money</h1>
        <div className="buttons">
          <button className="start">Start Sending <span className="arrow">→</span></button>
          <button className="login" onClick={() => (window.location.href = "/login")}>
             Login
           </button>


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

            <label>Contact Person</label>
            <input type="text" placeholder="John Doe" />

            <label>Email</label>
            <input type="email" placeholder="johndoe@example.com" />

            <label>Amount</label>
            <input type="number" placeholder="0.00" />

            <label>Coin</label>
            <select>
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

            <button className="continue">Continue →</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
