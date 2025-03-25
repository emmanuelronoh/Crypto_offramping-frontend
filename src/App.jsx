import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/pages/Home/Home";
import AboutUs from "./components/common/AboutUs";
import Signup from "./components/auth/Signup";
import RecipientDetails from "./components/transactions/RecipientDetails";
import Login from "./components/auth/Login";
import ResetPassword from "./components/auth/ResetPassword";
import ForgotPassword from "./components/auth/ForgotPassword";
import SendMoney from "./components/transactions/SendMoney";
import Transactions from "./components/transactions/Transactions";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import Profile from "./components/pages/Profile/Profile";
import Settings from "./components/common/Settings";
import OTPInput from './components/auth/OTPInput';
import TransactionConfirmation from "./components/transactions/TransactionConfirmation";
import TransferPortal from "./components/transactions/TransferPortal";
import EnterRecipient from "./components/transactions/EnterRecipient";
import Notifications from "./components/common/Notifications";
import ContactUs from './components/common/ContactUs';
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
  
    checkAuth(); // Initial check
  
    window.addEventListener("storage", checkAuth); // Listen for changes in storage
  
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);
  

  return (
    <div className="app-container">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <main className="main-content">
        <AppRoutes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </main>
      <ConditionalFooter />

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

// **Protected Route Wrapper Component**
const ProtectedRoute = ({ children, isLoggedIn }) => {
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

function AppRoutes({ isLoggedIn, setIsLoggedIn }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<AboutUs />} /> 
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-otp" element={<OTPInput />} />
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:uidb64/:token" element={<ResetPassword />} />


      {/* Protected Routes (Only for Logged-In Users) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contact-us"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <ContactUs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/send-money"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <SendMoney />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transactions"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Transactions />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transfer-portal"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <TransferPortal />
          </ProtectedRoute>
        }
      />
      <Route
        path="/entering-phone-number"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <EnterRecipient />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transaction-confirmation"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <TransactionConfirmation />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Notifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recipient"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <RecipientDetails />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

// **Conditionally Hide Footer on Specific Pages**
function ConditionalFooter() {
  const location = useLocation();
  const hideFooterOnPages = ["/login", "/signup", "/verify-otp", "/profile"];
  return !hideFooterOnPages.includes(location.pathname) ? <Footer /> : null;
}

export default App;
