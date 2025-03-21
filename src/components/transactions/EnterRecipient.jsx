import React, { useState } from "react";
import "./EnterRecipient.css";
import { FaQrcode, FaClipboard } from "react-icons/fa";
import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

const SendMoney = () => {
  const navigate = useNavigate();
  const btcAddress = "1FfmbHfnpaZjKFvyi1okTjJJusN455paPH";
  const [showQR, setShowQR] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const location = useLocation();
  const { recipientName = "Unknown Recipient" } = location.state || {};
  console.log("Recipient Name:", recipientName);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(btcAddress);
    toast.success("Address copied to clipboard!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="header-section">
        <h2 className="title">Send Money</h2>
        <p className="subtitle">Convert crypto to mobile money in a few simple steps</p>

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
            <span className="step active">3</span>
            <div className="line"></div>
          </div>
          <div className="step-container">
            <span className="step">4</span>
          </div>
          <span className="step-text">Step 4 of 4</span>
        </div>
      </div>

      <div className="container">
        <div className="card">
          <h3 className="section-title">Recipient Details</h3>
          <p>Enter the recipient mobile money information</p>


          <p className="btc-info">
            Send <strong>0.23 BTC</strong> to
            <span className="rate">1 BTC = 65,000 KES</span>
          </p>

          <div className="address-box">{btcAddress}</div>

          <div className="buttons">
            <button className="btn" onClick={copyToClipboard}>
              <FaClipboard /> Copy Address
            </button>
            <button className="btn" onClick={() => setShowQR(!showQR)}>
              <FaQrcode /> {showQR ? "Hide QR Scan" : "Show QR Scan"}
            </button>
          </div>

          {showQR && (
            <div className="qr-container">
              <QRCodeCanvas value={btcAddress} size={150} />
            </div>
          )}
        </div>

        <div className="card transaction-summary">
          <h3 className="section-title">Transaction Summary</h3>

          <div className="summary-row">
            <span className="summary-label">Amount:</span>
            <span className="summary-value">20 BTC</span>
          </div>

          <div className="summary-row">
            <span className="summary-label">Recipient:</span>
            <span className="summary-value">{recipientName || "Not specified"}</span>
          </div>

          <div className="summary-row">
            <span className="summary-label">Phone Number:</span>
            <span className="summary-value">{phoneNumber || "Not specified"}</span>
          </div>

          <div className="summary-row">
            <span className="summary-label">Mobile Money:</span>
            <span className="summary-value">M-Pesa</span>
          </div>
        </div>

        <div className="warning">
          Please wait for at least 1 confirmation before proceeding to the next step
        </div>

        <div className="actions">
          <button className="btn back" onClick={() => navigate("/transfer-portal")}>
            Back
          </button>
          <button className="btn complete" onClick={() => navigate("/transaction-confirmation")}>
            Complete Transfer ➜
          </button>
        </div>
      </div>
    </>
  );
};

export default SendMoney;