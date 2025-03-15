import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";
import "./TransactionConfirmation.css";

const TransactionConfirmation = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Processing");

  useEffect(() => {
    const checkTransactionStatus = async () => {
      try {
        const response = await fetch("YOUR_YELLOW_CARD_API_ENDPOINT"); // Replace with actual API
        const data = await response.json();

        if (data.status === "success") {
          setStatus("Successful");
          setTimeout(() => navigate("/transactions"), 2000); // Redirect after 2 sec
        }
      } catch (error) {
        console.error("Error checking transaction status:", error);
      }
    };

    const interval = setInterval(checkTransactionStatus, 5000); // Check every 5s

    return () => clearInterval(interval); // Cleanup on unmount
  }, [navigate]);

  return (
    <div className="transaction-container">
      <h2 className="transaction-title">Transaction Confirmation</h2>
      <p className="transaction-subtitle">Your transfer is being processed</p>

      <div className="transaction-box">
        {/* Left Side: Status Indicator */}
        <div className="transaction-status">
          <Clock size={50} className="clock-icon" />
          <h3 className="processing-title">
            {status === "Processing" ? "Processing Your Transfer" : "Transaction Successful"}
          </h3>
          <p className="processing-subtitle">
            {status === "Processing"
              ? "We're processing your transaction. This will take a few minutes."
              : "Your transaction was successful! Redirecting..."}
          </p>
        </div>

        {/* Right Side: Transaction Details */}
        <div className="transaction-details">
          <h4 className="details-title">Transaction Details</h4>
          <div className="transaction-info">
            <span className="label">Transaction ID:</span>
            <span className="value">TXN-405VCKLX</span>

            <span className="label">Date:</span>
            <span className="value">3/9/2025 1:06:28</span>

            <span className="label">Status:</span>
            <span className={`value ${status === "Processing" ? "status-processing" : "status-success"}`}>
              {status}
            </span>

            <span className="label">Amount Sent:</span>
            <span className="value">0.01 BTC</span>

            <span className="label">Recipient:</span>
            <span className="value">John Doe</span>

            <span className="label">Mobile Money:</span>
            <span className="value">M-Pesa (Kenya)</span>

            <span className="label">Phone Number:</span>
            <span className="value">+254 712 345 678</span>
          </div>
        </div>
      </div>

      <p className="transaction-footer">
        {status === "Processing"
          ? "Please wait while we process your transaction. This page will update automatically."
          : "Redirecting..."}
      </p>
    </div>
  );
};

export default TransactionConfirmation;
