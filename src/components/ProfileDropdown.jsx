// ProfileDropdown.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import styles from "./ProfileDropdown.module.css"; // Import CSS module

const ProfileDropdown = ({ handleLogout }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

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
              <p className={styles.userName}>John Doe</p>
              <p className={styles.userEmail}>johndoe@example.com</p>
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
