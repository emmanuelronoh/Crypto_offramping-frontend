import React from "react";
import "./SendMoney.css";
import { FaBitcoin } from "react-icons/fa";
import { IoArrowForwardOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SendMoney = () => {
  const navigate = useNavigate();
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
        <div className="progress-step">3</div>
      </div>
        <span className="step-label">Step 2 of 3</span>
      </div>
      <div className="send-crypto-box">
        <h3 className="section-title">Send Crypto</h3>
        <p className="section-subtitle">Choose the cryptocurrency and amount you want to send</p>
        <div className="crypto-info">
          <div className="info-box">
            <p className="label">You send</p>
            <p className="value">0.0023 BTC <FaBitcoin className="btc-icon" /></p>

          </div>
          <div className="info-box">
            <p className="label">They Get</p>
            <p className="value">1,28,590 🇰🇪 KES</p>
          </div>
        </div>
        <div className="exchange-info">
          <p><strong>Exchange Rate</strong> <span>1 BTC = 65,000 KES</span></p>
          <p><strong>Fee</strong> <span>1.6%</span></p>
          <p><strong>Transfer time</strong> <span>Within minutes</span></p>
        </div>
        <div className="buttons">
          <button className="back-btn" onClick={() => navigate("/transfer-portal")}> Back</button>
          <button className="send-btn" onClick={() => navigate("/entering-phone-number")}>
      I've Sent the Crypto <IoArrowForwardOutline />
    </button>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;

// import "./SendMoney.css";

// const SendMoney = () => {
//   return (
//     <div className="send-money-container">
//       <h1 className="title">Send Money</h1>
//       <p className="subtitle">Convert crypto to mobile money in a few simple steps</p>
      
//       <div className="progress-container">
//         <div className="progress-step completed">1</div>
//         <div className="progress-line active"></div>
//         <div className="progress-step active">2</div>
//         <div className="progress-line"></div>
//         <div className="progress-step">3</div>
//       </div>
//       <p className="step-indicator">Step 2 of 3</p>
      
//       <div className="send-crypto-card">
//         <h2>Send Crypto</h2>
//         <p>Choose the cryptocurrency and amount you want to send</p>
        
//         <div className="info-box">
//           <p className="label">You send</p>
//           <p className="value">0.0023 <span className="crypto">BTC</span></p>
//         </div>
        
//         <div className="info-box">
//           <p className="label">They Get</p>
//           <p className="value">1,28,590 <span className="currency">KES</span></p>
//         </div>
        
//         <div className="exchange-details">
//           <p>Exchange Rate: <span>1 BTC = 65,000 KES</span></p>
//           <p>Fee: <span>1.6%</span></p>
//           <p>Transfer time: <span>Within minutes</span></p>
//         </div>
        
//         <div className="button-group">
//           <button className="back-btn">Back</button>
//           <button className="confirm-btn">I've Sent the Crypto →</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SendMoney;
