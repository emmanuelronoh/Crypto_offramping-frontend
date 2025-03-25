// import React from "react";
// import "./Hero-section.css";
// import bitcoin from "../../../assets/bitcoin.png";
// import ethereum from "../../../assets/ethereum.png";
// import tether from "../../../assets/tether.png";
// import solana from "../../../assets/solana.png";
// import usdCoin from "../../../assets/usd-coin.png";

// const payoutOptions = [
//   { icon: "📲", name: "M-Pesa", description: "Instant mobile money withdrawal" },
//   { icon: "📞", name: "Airtel Money", description: "Quick & secure transfers" },
//   { icon: "🏦", name: "Bank Transfer", description: "Withdraw directly to your bank" },
//   { icon: "💳", name: "PayPal", description: "Receive money in your PayPal wallet" },
//   { icon: "💰", name: "Bitcoin", description: "Crypto to crypto payouts" },
// ];

// const coins = [
//   { name: "Celo Dollar", symbol: "CUSD", price: "$1.00", change: "-0.27%", color: "red", icon: "/assets/cardano.png" },
//   { name: "Stellar", symbol: "XLM", price: "$0.27", change: "-1.19%", color: "red", icon: "/assets/stellar.png" },
//   { name: "Polygon", symbol: "MATIC", price: "$0.22", change: "-0.92%", color: "red", icon: "/assets/polygon.png" },
//   {
//     name: "Gold Tether",
//     symbol: "XAUT",
//     price: "$2,993.30",
//     change: "+0.19%",
//     color: "green",
//     icon: "/assets/gold-tether.png",
//   },
//   { name: "Bitcoin", symbol: "BTC", price: "$2,993.30", change: "+0.19%", color: "green", icon: "/assets/bitcoin.png" },
//   { name: "Usd-coin", symbol: "USDT", price: "$2,993.30", change: "+0.19%", color: "green", icon: "/assets/usd-coin.png" },
//   { name: "Tether", symbol: "XAUT", price: "$2,993.30", change: "+0.19%", color: "green", icon: "/assets/tether.png" },
//   { name: "Ethereum", symbol: "ETH", price: "$2,993.30", change: "+0.19%", color: "green", icon: "/assets/ethereum.png" },
// ];

// const Home = () => {
//   return (
//     <div>


//       <div className="crypto-hero-container">
//         <div className="crypto-content">
//           <h1 className="crypto-title">Easily Convert Crypto to Cash Instantly!</h1>
//           <p className="crypto-description">
//             Easily convert your crypto to KES and withdraw directly to M-Pesa. Send and receive USDT, USDC, PYUSD, BTC, ETH, and more fast, secure, and hassle-free with Blif.
//           </p>
//           <button className="crypto-btn">Offramp Crypto</button>
//         </div>
//         <div className="crypto-icons">
//           <img src={solana} alt="Solana" className="crypto-icon solana" />
//           <img src={ethereum} alt="Ethereum" className="crypto-icon ethereum" />
//           <img src={bitcoin} alt="Bitcoin" className="crypto-icon bitcoin" />
//           <img src={tether} alt="Tether" className="crypto-icon tether" />
//           <img src={usdCoin} alt="USD Coin" className="crypto-icon usd-coin" />
//         </div>
//       </div>

//       <div className="steps-container">
//         <h2>Get Started in 3 Easy Steps</h2>
//         <div className="steps">
//           <h3>1. Create an Account</h3>
//           <p>Sign up with your email and secure your account.</p>
//           <h3>2. Connect Your Wallet</h3>
//           <p>Choose the currency and amount.</p>
//           <h3>3. Cash Out</h3>
//           <p>Receive your cash instantly.</p>
//         </div>
//       </div>
//       <div className="trade-container">
//         <h2>Send multiple coins on Blif</h2>
//         <p>Easily off-ramp your crypto and receive Ksh via Mobile Money.</p>

//         <div className="coins-list">
//           {coins.map((coin, index) => (
//             <div key={index} className="coin-card">
//               <img src={coin.icon} alt={coin.name} className="coin-icon" />  {/* ✅ Image Display */}
//               <div className="coin-info">
//                 <h3>{coin.name} ({coin.symbol})</h3>
//                 <p>{coin.price} <span style={{ color: coin.color }}>{coin.change}</span></p>
//               </div>
//             </div>
//           ))}
//         </div>

//         <button className="trade-btn">Start Offramping</button>
//       </div>

//       <div className="payout-container">
//         <h2>Choose Your Payout Option</h2>
//         <p>Withdraw your funds easily using your preferred method.</p>

//         <div className="payout-list">
//           {payoutOptions.map((option, index) => (
//             <div key={index} className="payout-card">
//               <span className="payout-icon">{option.icon}</span>
//               <div className="payout-info">
//                 <h3>{option.name}</h3>
//                 <p>{option.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         <button className="payout-btn">Withdraw Now</button>
//       </div>
//       <div className="security-container">
//         <h2>🔒 Why Choose Blif?</h2>
//         <div className="security-features">
//           <div className="security-card">
//             <h3>Secure Transactions</h3>
//             <p>End-to-end encryption ensures your funds and data are always safe.</p>
//           </div>
//           <div className="security-card">
//             <h3>Instant Withdrawals</h3>
//             <p>Withdraw your money instantly without unnecessary delays.</p>
//           </div>
//           <div className="security-card">
//             <h3>No Hidden Fees</h3>
//             <p>What you see is what you get. No surprise charges.</p>
//           </div>
//         </div>
//       </div>
//       <div className="trust-badges-container">
//         <h2 className="trust-title">Why Trust Us?</h2>
//         <div className="trust-badges">
//           <div className="badge">
//             <i className="fas fa-shield-alt"></i>
//             <h3>KYC/AML Compliance</h3>
//             <p>We follow strict regulations to ensure safe and secure transactions.</p>
//           </div>
//           <div className="badge">
//             <i className="fas fa-headset"></i>
//             <h3>24/7 Support</h3>
//             <p>Our team is available anytime to assist with your transactions.</p>
//           </div>
//           <div className="badge">
//             <i className="fas fa-users"></i>
//             <h3>Trusted by Users</h3>
//             <p>Read testimonials from satisfied users who trust our platform.</p>
//           </div>
//         </div>
//       </div>
//       <div className="faqs-container">
//         <h2>Frequently Asked Questions</h2>
//         <div className="faq-item">
//           <h3>🚀 How long do withdrawals take?</h3>
//           <p>Withdrawals to M-Pesa are instant in most cases but may take up to <strong>5 minutes</strong> depending on network congestion.</p>
//         </div>

//         <div className="faq-item">
//           <h3>🔍 Is KYC required?</h3>
//           <p>Yes, basic <strong>KYC verification</strong> is required for security and compliance. You'll need to provide a valid phone number and ID.</p>
//         </div>

//         <div className="faq-item">
//           <h3>🌍 Which regions are supported?</h3>
//           <p>Currently, Blif supports withdrawals to <strong>M-Pesa in Kenya</strong>, with plans to expand to other regions soon.</p>
//         </div>

//         <div className="faq-item">
//           <h3>💰 Are there any limits?</h3>
//           <p>Yes, daily withdrawal limits apply based on your verification level. Standard users can withdraw up to <strong>KES 150,000 per transaction</strong>, with higher limits available for verified accounts.</p>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Home;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Hero-section.css";

// const Home = () => {
//   const navigate = useNavigate();

//   const [amount, setAmount] = useState("");
//   const [coin, setCoin] = useState("BTC");
//   const [error, setError] = useState("");
//   const [currency, setCurrency] = useState("KES");
//   const [recipientName, setRecipientName] = useState("");
//   const [receiveMethod, setReceiveMethod] = useState("M-PESA");
//   const exchangeRates = { KES: 65000, TSH: 150000, UGX: 240000 }; // Sample rates
//   const feePercentage = 1.6;
//   const localCurrency = amount ? (parseFloat(amount) * exchangeRates[currency]).toLocaleString() : "";



//   const handleContinue = () => {
//     if (!amount || !coin || !recipientName) {
//       setError("Please enter an amount, recipient name, and select a cryptocurrency.");
//       return;
//     }
//     if (parseFloat(amount) <= 0) {
//       setError("Amount must be greater than zero.");
//       return;
//     }


//     setError("");

//     navigate("/send-money", {
//       state: {
//         amount,
//         currency,
//         exchangeRate: exchangeRates[currency],
//         recipientName,
//         coin,
//         receiveMethod
//       },
//     });    
//   };

//   const receiveMethodIcons = {
//     "M-PESA": "/assets/mpesa-logo.png",
//     "Airtel Money": "/assets/airtel-logo.png",
//     "Tigo Pesa": "/assets/tigo-logo.png"
//   };

//   return (
//     <div className="home">
//       {/* Sidebar Section */}
//       <div className="sidebar">
//         <h1>Send Crypto, Receive <br /> Mobile Money</h1>
//         <div className="buttons">
//           <button className="start-btn">Start Sending →</button>
//         </div>
//         <div className="buttons">
//           <button className="login-btn">Login</button>
//         </div>
//       </div>


//       {/* Send Crypto Form */}
//       <div className="send-container">
//         <h2>Send Crypto</h2>
//         <p>Choose the cryptocurrency and amount you want to send</p>

//         <div className="progress-bar">
//         <div className="step active">1</div>
//         <div className="line"></div>
//         <div className="step active">2</div>
//         <div className="line"></div>
//         <div className="step">3</div>
//         <div className="line"></div>
//         <div className="step">4</div>
//         <span className="step-info">Step 1 of 4</span>
//       </div>

//         {error && <p className="error">{error}</p>}
//         <label htmlFor="send-amount">You Send</label>
//         <div className="input-group">
//           <input
//             id="send-amount"
//             type="number"
//             placeholder="0.00"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//           />
//           <select value={coin} onChange={(e) => setCoin(e.target.value)}>
//             <option value="BTC">BTC</option>
//             <option value="ETH">ETH</option>
//             <option value="USDT">USDT</option>
//           </select>
//         </div>

//         <label htmlFor="local-currency">Local Currency</label>
//         <div className="input-group">
//           <input id="local-currency" type="text" value={localCurrency} readOnly />
//           <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
//             <option value="KES">KES</option>
//             <option value="TSH">TSH</option>
//             <option value="UGX">UGX</option>
//           </select>
//         </div>

//         <label htmlFor="receive-method">Receive Method</label>
//         <div className="input-group receive-method">
//           <img src={receiveMethodIcons[receiveMethod]} alt={receiveMethod} className="receive-icon" />
//           <select id="receive-method" value={receiveMethod} onChange={(e) => setReceiveMethod(e.target.value)}>
//             <option value="M-PESA">M-PESA</option>
//             <option value="Airtel Money">Airtel Money</option>
//             <option value="Tigo Pesa">Tigo Pesa</option>
//           </select>
//         </div>

//         {/* Exchange Rate Summary */}
//         <div className="summary">
//           <p>Exchange Rate: <span>1 {coin} = {exchangeRates[currency]} {currency}</span></p>
//           <p>Fee: <span>{feePercentage}%</span></p>
//           <p>Transfer time: <span>Within minutes</span></p>
//         </div>

//         <button className="continue-btn" onClick={handleContinue}>
//           Continue →
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero-section.css";

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
    if (!amount || !coin) {
      setError("Please enter an amount, and select a cryptocurrency.");
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
        <div className="buttons-send">
          <button className="start-btn">Start Sending →</button>
          <button className="login-btn-send">Login</button>
        </div>
      </div>

      {/* Send Crypto Form */}
      <div className="send-container-1">
        <h2>Send Crypto</h2>
        <p>Choose the cryptocurrency and amount you want to send</p>

        <div className="progress-bar">
          <div className="step active">1</div>
          <div className="line"></div>
          <div className="step active">2</div>
          <div className="line"></div>
          <div className="step">3</div>
          <div className="line"></div>
          <div className="step">4</div>
          <span className="step-info">Step 1 of 4</span>
        </div>

        {error && <p className="error">{error}</p>}
        <label htmlFor="send-amount">You Send</label>
        <div className="input-container">
          <input
            id="send-amount"
            type="number"
            className="amount-input"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="select-container">
            <select
              className="crypto-select"
              value={coin}
              onChange={(e) => setCoin(e.target.value)}
            >
              <option value="BTC">⚡ BTC</option>
              <option value="ETH">💎 ETH</option>
              <option value="USDT">💲 USDT</option>
            </select>
          </div>
        </div>

        <label htmlFor="local-currency">Local Currency</label>
        <div className="input-container">
          <input
            id="local-currenc"
            type="text"
            className="currency-input"
            value={localCurrency}
            readOnly
          />
          <div className="select-container">
            <select
              className="currency-select"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="KES">🇰🇪 KES</option>
              <option value="TSH">🇹🇿 TSH</option>
              <option value="UGX">🇺🇬 UGX</option>
            </select>
          </div>
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

