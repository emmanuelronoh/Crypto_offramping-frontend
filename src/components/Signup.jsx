import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./signup.css";
import logo from "../assets/logo.png";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Use navigate to redirect on success

  const register = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = {
      full_name: fullName,
      email: email,
      password: password,
      confirm_password: confirmPassword, // Added confirm_password here
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/register/", // Your Django backend registration endpoint
        userData,
        {
          headers: {
            "Content-Type": "application/json", // Ensuring correct content type
          },
        }
      );
      console.log("User registered:", response.data);
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      setErrorMessage("Failed to register. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Create Account</h2>
        <p>Enter your information to create an account</p>

        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}

        <form onSubmit={register}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="johndoe@example.com"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
              autoComplete="new-password" // Added autocomplete for password
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              required
              autoComplete="new-password" // Added autocomplete for confirm password
            />
          </div>

          <button type="submit" className="signup-btn">Create account</button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
