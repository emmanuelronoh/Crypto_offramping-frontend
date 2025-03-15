// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie"; // Import js-cookie for JWT storage
// import "./login.css";
// import logo from "/src/assets/logo.png";

// const Login = ({ setIsLoggedIn }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isAuthChecked, setIsAuthChecked] = useState(false); // Track if auth check is complete
//   const navigate = useNavigate();

//   // Check if user is already authenticated
//   useEffect(() => {
//     const token = Cookies.get("jwt");

//     if (!token) {
//       setIsAuthChecked(true); // No token, proceed to render login page
//       return;
//     }

//     axios
//       .get("http://localhost:8000/auth/validate-token/", {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       })
//       .then((response) => {
//         if (response.status === 200) {
//           setIsLoggedIn(true);
//           navigate("/transfer-portal"); // Redirect if authenticated
//         }
//       })
//       .catch(() => {
//         Cookies.remove("jwt"); // Remove invalid token
//       })
//       .finally(() => {
//         setIsAuthChecked(true); // Auth check complete
//       });
//   }, [setIsLoggedIn, navigate]);

//   // Handle login request
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     try {
//       const response = await axios.post(
//         "http://localhost:8000/auth/login/",
//         { email, password },
//         { withCredentials: true }
//       );

//       if (response.status === 200) {
//         const token = response.data.accessToken; // Ensure backend sends 'accessToken'
//         Cookies.set("jwt", token, {
//           expires: 7,
//           secure: true,
//           sameSite: "Strict",
//         });

//         setIsLoggedIn(true);
//         navigate("/transfer-portal");
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || "Invalid email or password.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Render a loading spinner until auth check is complete
//   if (!isAuthChecked) {
//     return (
//       <div className="loading-container">
//         <div className="loading-spinner"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="container">
//       <div className="login-box">
//         <img src={logo} alt="Logo" className="logo" />
//         <h2 className="title">Login</h2>
//         <p className="subtitle">Welcome back! Please enter your details.</p>
//         {error && <p className="error-message">{error}</p>}

//         <form onSubmit={handleLogin}>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button type="submit" className="login-button" disabled={isLoading}>
//             {isLoading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p className="signup-text">
//           Don’t have an account? <a href="/signup">Sign up</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./login.css";
import logo from "/src/assets/logo.png";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Track authentication status
  const navigate = useNavigate();

  // Check if user is already authenticated
  useEffect(() => {
    const token = Cookies.get("jwt");

    if (!token) {
      setIsAuthenticated(false); // No token, proceed to login page
      return;
    }

    axios
      .get("http://localhost:8000/auth/validate-token/", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(true);
          setIsAuthenticated(true);
          navigate("/transfer-portal", { replace: true }); // Avoid flickering
        }
      })
      .catch(() => {
        Cookies.remove("jwt");
        setIsAuthenticated(false);
      });
  }, [setIsLoggedIn, navigate]);

  // Handle login request
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/login/",
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const token = response.data.accessToken; // Ensure backend sends 'accessToken'
        Cookies.set("jwt", token, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });

        setIsLoggedIn(true);
        setIsAuthenticated(true);
        navigate("/transfer-portal", { replace: true }); // Prevent flickering
      }
    } catch (err) {
      setError(err.response?.data?.error || "Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  // Prevent rendering flickering by only showing UI after auth check
  if (isAuthenticated === null) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="login-box">
        <img src={logo} alt="Logo" className="logo" />
        <h2 className="title">Login</h2>
        <p className="subtitle">Welcome back! Please enter your details.</p>
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

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