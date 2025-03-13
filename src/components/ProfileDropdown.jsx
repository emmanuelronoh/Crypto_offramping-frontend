import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import styles from "./ProfileDropdown.module.css";

const ProfileDropdown = ({ handleLogout }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState({ full_name: "", email: "" });

  useEffect(() => {
    // Fetch user details from storage
    const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <div className={styles.profileMenu}>
      <FaUserCircle className={styles.profileIcon} onClick={toggleProfileMenu} />
      {isProfileOpen && (
        <div className={styles.dropdownMenu}>
          <div className={styles.profileHeader}>
            <img src="/src/assets/image.png" alt="User" className={styles.profileImage} />
            <div>
              <p className={styles.userName}>{user.full_name || "Guest"}</p>
              <p className={styles.userEmail}>{user.email || "No email provided"}</p>
            </div>
          </div>
          <hr />
          <Link to="/profile" onClick={toggleProfileMenu}>Profile</Link>
          <Link to="/settings" onClick={toggleProfileMenu}>Settings</Link>
          <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;

