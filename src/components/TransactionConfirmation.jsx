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
        <div className="transaction-icon">
          <Clock size={50} color={status === "Processing" ? "#d4af37" : "green"} />
        </div>
        <h3 className="processing-title">{status === "Processing" ? "Processing Your Transfer" : "Transaction Successful"}</h3>
        <p className="processing-subtitle">
          {status === "Processing"
            ? "We're processing your transaction. This will take a few minutes."
            : "Your transaction was successful! Redirecting..."}
        </p>

        <div className="transaction-details">
          <p><strong>Transaction ID:</strong> TXN-405VCKLX</p>
          <p><strong>Date:</strong> 3/9/2025 1:06:28</p>
          <p><strong>Status:</strong> <span className={status === "Processing" ? "status-processing" : "status-success"}>{status}</span></p>
          <p><strong>Amount Sent:</strong> 0.01 BTC</p>
          <p><strong>Recipient:</strong> John Doe</p>
          <p><strong>Mobile Money:</strong> M-Pesa (Kenya)</p>
          <p><strong>Phone Number:</strong> +254 712 345 678</p>
        </div>

        <p className="transaction-footer">
          {status === "Processing" ? "Please wait while we process your transaction. This page will update automatically." : "Redirecting..."}
        </p>
      </div>
    </div>
  );
};

export default TransactionConfirmation;
