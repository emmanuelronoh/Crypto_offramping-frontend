import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-otp" element={<OTPInput />} />
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/contact-us" element={<ContactUs />} />

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
