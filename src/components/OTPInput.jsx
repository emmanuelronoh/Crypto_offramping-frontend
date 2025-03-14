import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // For navigation after verification
import axios from "axios"; // For sending requests to the backend
import "./OTPInput.css"; // Styling for OTP input and buttons

const OTPVerification = () => {
  const [otp, setOtp] = useState(Array(6).fill("")); // OTP length set to 6
  const [isResending, setIsResending] = useState(false);
  const [verified, setVerified] = useState(false); // Track if OTP is verified
  const inputRefs = useRef([]);
  const navigate = useNavigate(); // to redirect to other pages
  const email = localStorage.getItem("email"); // Get email from localStorage

  // Check if OTP is already verified on page load
  useEffect(() => {
    const otpVerified = localStorage.getItem("otpVerified");
    if (otpVerified === "true") {
      setVerified(true); // OTP already verified
      navigate("/login"); // Redirect to the dashboard
    }
  }, [navigate]);

  // Handle OTP input change
  const handleChange = (index, event) => {
    const value = event.target.value;
    if (!/^\d*$/.test(value)) return; // Allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus next input field if the current one is filled
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace key to focus the previous input
  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Verify OTP by sending a request to the backend
  const handleVerify = async () => {
    const otpCode = otp.join("");
    if (otpCode.length === 6) {
      try {
        // Make a POST request to the backend for OTP verification
        const response = await axios.post(
          "http://localhost:8000/auth/verify-email/", // Update with your backend path
          { email, otp_code: otpCode }
        );

        if (response.data.message) {
            // If OTP is verified successfully
            localStorage.setItem("otpVerified", "true");
            setVerified(true);
            alert(response.data.message); // Show success message from backend
            navigate("/login"); // Redirect to the login page
          } else {
            alert("Incorrect OTP. Please try again.");
          }
          
      } catch (error) {
        console.error("Error verifying OTP:", error);
        alert("Error verifying OTP. Please try again.");
      }
    } else {
      alert("Please enter all digits.");
    }
  };

  // Resend OTP by calling the backend
  const handleResendOtp = async () => {
    setIsResending(true);
    try {
      // Send request to the backend to resend OTP
      const response = await axios.post(
        "http://localhost:8000/auth/resend-otp/", // Update with your backend path
        { email }
      );

      if (response.data.success) {
        alert("OTP has been resent to your email.");
      } else {
        alert("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      alert("Failed to resend OTP. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="otp-container">
      <h2>Email Verification</h2>
      <p>Enter the 6-digit code sent to your email.</p>

      <div className="otp-inputs">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            ref={(el) => (inputRefs.current[index] = el)}
            className="otp-input"
            autoFocus={index === 0}
          />
        ))}
      </div>

      <div className="otp-buttons">
        <button onClick={handleVerify} className="verify-btn">
          Verify
        </button>
        <button
          onClick={handleResendOtp}
          className="resend-btn"
          disabled={isResending}
        >
          {isResending ? "Resending..." : "Resend OTP"}
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;
