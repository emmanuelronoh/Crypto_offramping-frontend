import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import logo from "/src/assets/logo.png";

const BASE_URL = "https://backend-github-code.onrender.com";
const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("jwt");
    if (token) {
      axios
        .get(`${BASE_URL}/auth/validate-token/`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        })
        .then((response) => {
          if (response.status === 200) {
            setIsLoggedIn(true);
            navigate("/transfer-portal", { replace: true });
          }
        })
        .catch(() => {
          Cookies.remove("jwt");
        });
    }
  }, [setIsLoggedIn, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/login/`,
        { email, password },
        { withCredentials: true }
      );
      if (response.status === 200) {
        Cookies.set("jwt", response.data.accessToken, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });
        setIsLoggedIn(true);
        toast.success("Login successful! Redirecting...");
        navigate("/transfer-portal", { replace: true });
      }
    } catch (err) {
      toast.error("Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="Logo" className="logo" />
        <h2 className="title">Login</h2>
        <p className="subtitle">Welcome back! Please enter your details.</p>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="options">
            <label>
              <input type="checkbox" /> Remember for 30 days
            </label>
            <a href="/forgot-password" className="forgot-password">
              Forgot password
            </a>
          </div>
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="signup-text">
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
