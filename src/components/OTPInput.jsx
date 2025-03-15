import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./OTPInput.css";

const OTPVerification = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isResending, setIsResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const email = localStorage.getItem("email"); // Get email from localStorage
  
  useEffect(() => {
    if (!email) {
      setErrorMessage("Session expired. Please sign up again.");
    }
  }, [email]);

  const handleChange = (index, event) => {
    const value = event.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");
    if (otpCode.length === 6) {
      try {
        const response = await axios.post("http://localhost:8000/auth/verify-email/", { email, otp_code: otpCode });

        if (response.data.message) {
          alert(response.data.message);
          navigate("/login");
        } else {
          setErrorMessage("Incorrect OTP. Please try again.");
        }
      } catch (error) {
        setErrorMessage("Error verifying OTP. Please try again.");
      }
    } else {
      setErrorMessage("Please enter all digits.");
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    try {
      const response = await axios.post("http://localhost:8000/auth/resend-otp/", { email });
      alert(response.data.success ? "OTP has been resent to your email." : "Failed to resend OTP. Try again.");
    } catch (error) {
      setErrorMessage("Failed to resend OTP. Try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="otp-container">
      <h2>Email Verification</h2>
      <p>Enter the 6-digit code sent to your email.</p>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

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
        <button onClick={handleVerify} className="verify-btn">Verify</button>
        <button onClick={handleResendOtp} className="resend-btn" disabled={isResending}>
          {isResending ? "Resending..." : "Resend OTP"}
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;
