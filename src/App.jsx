import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import SendMoney from "./components/SendMoney";
import Transactions from "./components/Transactions";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import TransactionConfirmation from "./components/TransactionConfirmation"; // New component
import "./App.css";
import TransferPortal from "./components/TransferPortal";
import EnterRecipient from "./components/EnterRecipient";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <main className="main-content">
          <AppRoutes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </main>
        <ConditionalFooter />
      </div>
    </Router>
  );
}

function AppRoutes({ isLoggedIn, setIsLoggedIn }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/send-money" element={<SendMoney />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/transfer-portal" element={<TransferPortal />} />
      <Route path="/entering-phone-number" element={<EnterRecipient />} />
      <Route path="/transaction-confirmation" element={<TransactionConfirmation />} />
    </Routes>
  );
}

function ConditionalFooter() {
  const location = useLocation();
  const hideFooterOnPages = ["/login", "/signup", "/profile"];
  return !hideFooterOnPages.includes(location.pathname) ? <Footer /> : null;
}

export default App;