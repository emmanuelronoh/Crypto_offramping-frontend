import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();

  // State variables to store input values
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [coin, setCoin] = useState("");
  const [error, setError] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  // Function to validate and proceed
  const handleContinue = () => {
    if (!contactPerson || !email || !amount || !coin) {
      setError("Please fill in all fields before proceeding.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (amount <= 0) {
      setError("Amount must be greater than zero.");
      return;
    }

    // If all checks pass, redirect user
    setError(""); // Clear any previous error messages
    navigate("/entering-phone-number");
  };

  return (
    <div className="home">
      <section className="intro">
        <h1>Send Crypto, Receive <br /> Mobile Money</h1>
        <div className="buttons">
          <button className="start">Start Sending <span className="arrow">→</span></button>
        </div>
      </section>

      <section className="send-money">
        <div className="card">
          <h2>Send Money</h2>
          <p>Convert crypto to mobile money in a few simple steps</p>

          <div className="steps">
            <span className="step active">1</span>
            <div className="line"></div>
            <span className="step">2</span>
            <div className="line"></div>
            <span className="step">3</span>
          </div>

          <div className="form">
            <h3>Send Crypto</h3>
            <p>Choose the cryptocurrency and amount you want to send</p>

            {error && <p className="error-message">{error}</p>} {/* Display error message */}

            <label>Contact Person</label>
            <input
              type="text"
              placeholder="John Doe"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
            />

            <label>Email</label>
            <input
              type="email"
              placeholder="johndoe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Amount</label>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <label>Coin</label>
            <select value={coin} onChange={(e) => setCoin(e.target.value)}>
              <option value="">Select a coin</option>
              <option>Bitcoin (BTC)</option>
              <option>Ethereum (ETH)</option>
              <option>Tether (USDT)</option>
              <option>Binance Coin (BNB)</option>
              <option>USD Coin (USDC)</option>
              <option>XRP (Ripple)</option>
              <option>Dogecoin (DOGE)</option>
              <option>Cardano (ADA)</option>
              <option>Solana (SOL)</option>
              <option>Polygon (MATIC)</option>
            </select>

            <label>Mobile Number</label>
            <input
              type="text"
              placeholder="0712345678"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            <button className="continue" onClick={handleContinue}>Continue →</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./home.css";

// const Home = () => {
//   const navigate = useNavigate();

//   // State variables to store input values
//   const [contactPerson, setContactPerson] = useState("");
//   const [email, setEmail] = useState("");
//   const [amount, setAmount] = useState("");
//   const [coin, setCoin] = useState("");
//   const [mobileNumber, setMobileNumber] = useState(""); // For mobile money withdrawal
//   const [error, setError] = useState("");
//   const [kshAmount, setKshAmount] = useState(null); // For storing KSH equivalent of the crypto amount

//   // Function to validate and proceed
//   const handleContinue = async () => {
//     if (!contactPerson || !email || !amount || !coin || !mobileNumber) {
//       setError("Please fill in all fields before proceeding.");
//       return;
//     }

//     if (!/\S+@\S+\.\S+/.test(email)) {
//       setError("Please enter a valid email address.");
//       return;
//     }

//     if (amount <= 0) {
//       setError("Amount must be greater than zero.");
//       return;
//     }

//     if (!/^\d{10}$/.test(mobileNumber)) { // Validate mobile number (Kenya's phone number format)
//       setError("Please enter a valid Kenyan phone number.");
//       return;
//     }

//     // If all checks pass, clear any previous error messages
//     setError("");

//     // Convert the crypto amount to KSH (using a predefined rate or an API call)
//     // For simplicity, let's assume a conversion rate of 1 BTC = 4,000,000 KSH (replace with actual rate)
//     const conversionRate = {
//       BTC: 4000000,
//       ETH: 350000,
//       USDT: 110,
//       BNB: 50000,
//       USDC: 110,
//       XRP: 110,
//       DOGE: 10,
//       ADA: 80,
//       SOL: 6000,
//       MATIC: 60,
//     };

//     const ksh = amount * conversionRate[coin]; 
//     setKshAmount(ksh);

//     // Send the data to the backend for Yellow Card API processing
//     const data = {
//       contactPerson,
//       email,
//       amount,
//       coin,
//       mobileNumber,
//       kshAmount, // Send the KSH equivalent as part of the payload
//     };

//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/offramp/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         // On success, redirect to the next page
//         navigate("/entering-phone-number");
//       } else {
//         // On error, display the error message
//         setError(result.error || "Something went wrong. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error during API request:", error);
//       setError("Internal server error. Please try again later.");
//     }
//   };

//   return (
//     <div className="home">
//       <section className="intro">
//         <h1>Send Crypto, Receive <br /> Mobile Money</h1>
//         <div className="buttons">
//           <button className="start">Start Sending <span className="arrow">→</span></button>
//         </div>
//       </section>

//       <section className="send-money">
//         <div className="card">
//           <h2>Send Money</h2>
//           <p>Convert crypto to mobile money in a few simple steps</p>

//           <div className="steps">
//             <span className="step active">1</span>
//             <div className="line"></div>
//             <span className="step">2</span>
//             <div className="line"></div>
//             <span className="step">3</span>
//           </div>

//           <div className="form">
//             <h3>Send Crypto</h3>
//             <p>Choose the cryptocurrency and amount you want to send</p>

//             {error && <p className="error-message">{error}</p>} {/* Display error message */}

//             <label>Contact Person</label>
//             <input
//               type="text"
//               placeholder="John Doe"
//               value={contactPerson}
//               onChange={(e) => setContactPerson(e.target.value)}
//             />

//             <label>Email</label>
//             <input
//               type="email"
//               placeholder="johndoe@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />

//             <label>Amount</label>
//             <input
//               type="number"
//               placeholder="0.00"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//             />

//             <label>Coin</label>
//             <select value={coin} onChange={(e) => setCoin(e.target.value)}>
//               <option value="">Select a coin</option>
//               <option>Bitcoin (BTC)</option>
//               <option>Ethereum (ETH)</option>
//               <option>Tether (USDT)</option>
//               <option>Binance Coin (BNB)</option>
//               <option>USD Coin (USDC)</option>
//               <option>XRP (Ripple)</option>
//               <option>Dogecoin (DOGE)</option>
//               <option>Cardano (ADA)</option>
//               <option>Solana (SOL)</option>
//               <option>Polygon (MATIC)</option>
//             </select>

//             <label>Mobile Number (for Mobile Money Withdrawal)</label>
//             <input
//               type="text"
//               placeholder="0712345678"
//               value={mobileNumber}
//               onChange={(e) => setMobileNumber(e.target.value)}
//             />

//             <button className="continue" onClick={handleContinue}>Continue →</button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;
