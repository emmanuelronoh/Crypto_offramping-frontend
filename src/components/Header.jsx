import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa"; 
import ProfileDropdown from "./ProfileDropdown"; 
import styles from "./Header.module.css";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
    closeMenu();
  };

  const handleLogoClick = (e) => {
    e.preventDefault(); 
    navigate(isLoggedIn ? "/transfer-portal" : "/");
  };

  return (
    <header className={styles.header}>
      {/* Hamburger Menu Button */}
      <button className={styles.hamburger} onClick={toggleMenu}>
        ☰
      </button>

      {/* Logo */}
      <div className={styles.logo}>
        <Link to="#" onClick={handleLogoClick}>
          <img src="/src/assets/logo.png" alt="Logo" className={styles.logoImg} />
        </Link>
      </div>

      {/* Navigation + Icons */}
      <div className={styles.navRight}>
        <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ""}`}>
          {isLoggedIn ? (
            <>
              <Link to="/send-money" className={styles.navLink} onClick={closeMenu}>
                Dashboard
              </Link>
              <Link to="/transfer-portal" className={styles.navLink} onClick={closeMenu}>
                Send Money
              </Link>
              <Link to="/transactions" className={styles.navLink} onClick={closeMenu}>
                Transactions
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu}>
                <button className={styles.login}>Login</button>
              </Link>
              <Link to="/signup" onClick={closeMenu}>
                <button className={styles.signup}>Sign Up</button>
              </Link>
            </>
          )}
        </nav>

        {/* Icons for Logged-In Users */}
        {isLoggedIn && (
          <div className={styles.icons}>
            <Link to="/notifications">
              <FaBell className={`${styles.icon} ${styles.notificationIcon}`} />
            </Link>
            <ProfileDropdown handleLogout={handleLogout} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
