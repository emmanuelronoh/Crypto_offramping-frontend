import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ResetPassword.css";

const ResetPassword = () => {
  const { uidb64, token } = useParams(); // Get UID and token from the URL
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("https://backend-github-code.onrender.com/auth/reset-password/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uidb64, token, new_password: newPassword, confirm_password: confirmPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Password reset successfully. Redirecting to login...");
        setTimeout(() => navigate("/login"), 3000); // Redirect after 3 seconds
      } else {
        setError(data.error || "Something went wrong. Try again.");
      }
    } catch (error) {
      setError("Failed to connect to the server.");
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        <h2>Reset Password</h2>
        <p>Enter your new password below.</p>

        {message && <p className="message success">{message}</p>}
        {error && <p className="message error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <label>New Password:</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <label>Confirm Password:</label>
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className="reset-button">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
