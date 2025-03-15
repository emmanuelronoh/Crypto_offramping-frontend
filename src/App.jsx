import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
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
import OTPInput from './components/OTPInput';
import TransactionConfirmation from "./components/TransactionConfirmation";
import TransferPortal from "./components/TransferPortal";
import EnterRecipient from "./components/EnterRecipient";
import Notifications from "./components/Notifications";
import ContactUs from './components/ContactUs';
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="app-container">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <main className="main-content">
        <AppRoutes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </main>
      <ConditionalFooter />
    </div>
  );
}

// Route Protection Component
const ProtectedRoute = ({ element, isLoggedIn }) => {
  return isLoggedIn ? element : <Navigate to="/login" replace />;
};

function AppRoutes({ isLoggedIn, setIsLoggedIn }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-otp" element={<OTPInput />} />
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/contact-us" element={<ContactUs />} />

      {/* Protected Routes (Only for Logged-In Users) */}
      <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} isLoggedIn={isLoggedIn} />} />
      <Route path="/send-money" element={<ProtectedRoute element={<SendMoney />} isLoggedIn={isLoggedIn} />} />
      <Route path="/transactions" element={<ProtectedRoute element={<Transactions />} isLoggedIn={isLoggedIn} />} />
      <Route path="/profile" element={<ProtectedRoute element={<Profile />} isLoggedIn={isLoggedIn} />} />
      <Route path="/settings" element={<ProtectedRoute element={<Settings />} isLoggedIn={isLoggedIn} />} />
      <Route path="/transfer-portal" element={<ProtectedRoute element={<TransferPortal />} isLoggedIn={isLoggedIn} />} />
      <Route path="/entering-phone-number" element={<ProtectedRoute element={<EnterRecipient />} isLoggedIn={isLoggedIn} />} />
      <Route path="/transaction-confirmation" element={<ProtectedRoute element={<TransactionConfirmation />} isLoggedIn={isLoggedIn} />} />
      <Route path="/notifications" element={<ProtectedRoute element={<Notifications />} isLoggedIn={isLoggedIn} />} />
    </Routes>
  );
}

// Conditionally Hide Footer on Specific Pages
function ConditionalFooter() {
  const location = useLocation();
  const hideFooterOnPages = ["/login", "/signup", "/verify-otp", "/profile"];
  return !hideFooterOnPages.includes(location.pathname) ? <Footer /> : null;
}

export default App;
