import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import Cookies from "js-cookie";
import "./signup.css";
import logo from "../../assets/logo.png";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRecaptcha = (token) => {
    setRecaptchaToken(token);
  };

  const register = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    if (!recaptchaToken) {
      setErrorMessage("Please verify that you are not a robot.");
      return;
    }

    const userData = {
      full_name: fullName,
      email: email,
      password: password,
      confirm_password: confirmPassword, // Ensure this is included
      recaptcha_token: recaptchaToken,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/register/",
        userData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201 || response.data.token) {
        const { token, user } = response.data;
        Cookies.set("token", token, { expires: 7 });
        Cookies.set("user", JSON.stringify(user), { expires: 7 });

        localStorage.setItem("email", email);
        navigate("/verify-otp");
      } else {
        setErrorMessage(response.data.message || "Registration failed. Try again.");
      }
    } catch (error) {
      // Handle server validation errors
      if (error.response && error.response.data) {
        const errors = error.response.data;
        setErrorMessage(errors.confirm_password?.[0] || "Failed to register. Please try again.");
      } else {
        setErrorMessage("Failed to register. Please try again.");
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Create Account</h2>
        <p>Enter your information to create an account</p>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              required
            />
          </div>
          <ReCAPTCHA
            sitekey="6LcbsfMqAAAAAMEmb8yEgEooLlqGP3LPLTosW-Ny"
            data-theme="dark"
            onChange={handleRecaptcha}
          />
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