import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./signup.css";
import logo from "../assets/logo.png";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const navigate = useNavigate();

  const handleRecaptcha = (token) => {
    setRecaptchaToken(token);
  };

  const register = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // Check reCAPTCHA verification
    if (!recaptchaToken) {
      toast.error("Please verify that you are not a robot.");
      return;
    }

    const userData = {
      full_name: fullName,
      email: email,
      password: password,
      confirm_password: confirmPassword,
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
        toast.success("Registration successful! Check your email for OTP.");
        navigate("/verify-otp");
      } else {
        toast.error(response.data.message || "Registration failed. Try again.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errors = error.response.data;

        if (errors.email) toast.error(errors.email[0]);
        else if (errors.password) toast.error(errors.password[0]);
        else if (errors.confirm_password) toast.error(errors.confirm_password[0]);
        else if (errors.error) toast.error(errors.error);
        else toast.error("Failed to register. Please try again.");
      } else {
        toast.error("Network error. Please try again later.");
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Create Account</h2>
        <p>Enter your information to create an account</p>
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
