// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import ReCAPTCHA from "react-google-recaptcha"; // Import reCAPTCHA
// import "./signup.css";
// import logo from "../assets/logo.png";

// const Signup = () => {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [recaptchaToken, setRecaptchaToken] = useState(""); // Store reCAPTCHA token
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();

//   // Function to handle reCAPTCHA verification
//   const handleRecaptcha = (token) => {
//     setRecaptchaToken(token);
//   };

//   const register = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     if (!recaptchaToken) {
//       alert("Please verify that you are not a robot.");
//       return;
//     }

//     const userData = {
//       full_name: fullName,
//       email: email,
//       password: password,
//       confirm_password: confirmPassword,
//       recaptcha_token: recaptchaToken, // Send reCAPTCHA token to backend
//     };

//     try {
//       const response = await axios.post(
//         "http://localhost:8000/auth/register/", // Your Django backend registration endpoint
//         userData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("User registered:", response.data);

//       // Redirect to OTP verification page and pass email
//       navigate("/verify-otp", { state: { email: email } });

//     } catch (error) {
//       setErrorMessage("Failed to register. Please try again.");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-card">
//         <img src={logo} alt="Logo" className="logo" />
//         <h2>Create Account</h2>
//         <p>Enter your information to create an account</p>

//         {errorMessage && <p className="error-message">{errorMessage}</p>}

//         <form onSubmit={register}>
//           <div className="input-group">
//             <label>Full Name</label>
//             <input
//               type="text"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               placeholder="John Doe"
//               required
//             />
//           </div>

//           <div className="input-group">
//             <label>Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="johndoe@example.com"
//               required
//             />
//           </div>

//           <div className="input-group">
//             <label>Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="********"
//               required
//             />
//           </div>

//           <div className="input-group">
//             <label>Confirm Password</label>
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               placeholder="********"
//               required
//             />
//           </div>

//           {/* Google reCAPTCHA Widget */}
//           <ReCAPTCHA
//             sitekey="6LcbsfMqAAAAAMEmb8yEgEooLlqGP3LPLTosW-Ny" // Replace with your actual site key
//             data-theme="dark"
//             onChange={handleRecaptcha}
//           />

//           <button type="submit" className="signup-btn">Create account</button>
//         </form>

//         <p className="login-link">
//           Already have an account? <Link to="/login">Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha"; // Import reCAPTCHA
import "./signup.css";
import logo from "../assets/logo.png";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState(""); // Store reCAPTCHA token
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Function to handle reCAPTCHA verification
  const handleRecaptcha = (token) => {
    setRecaptchaToken(token);
  };

  const register = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!recaptchaToken) {
      alert("Please verify that you are not a robot.");
      return;
    }

    const userData = {
      full_name: fullName,
      email: email,
      password: password,
      confirm_password: confirmPassword,
      recaptcha_token: recaptchaToken, // Send reCAPTCHA token to backend
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/register/", // Your Django backend registration endpoint
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("User registered:", response.data);

      // Save email to localStorage
      localStorage.setItem("email", email);

      // Redirect to OTP verification page after successful registration
      navigate("/verify-otp");

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

          {/* Google reCAPTCHA Widget */}
          <ReCAPTCHA
            sitekey="6LcbsfMqAAAAAMEmb8yEgEooLlqGP3LPLTosW-Ny" // Replace with your actual site key
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
