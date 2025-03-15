import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import Cookies from "js-cookie";
import styles from "./ProfileDropdown.module.css";

const ProfileDropdown = ({ handleLogout }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState({ full_name: "Guest", email: "No email provided" });
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("jwt");
    if (token) {
      fetch("http://127.0.0.1:8000/auth/profile/", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, // ✅ Send token in headers
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch profile");
        return response.json();
      })
      .then((data) => {
        setUser({
          full_name: data.full_name || "User",
          email: data.email || "No email",
        });
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        Cookies.remove("jwt"); // ✅ Remove invalid token
      });
    }
  }, []);

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogoutClick = () => {
    Cookies.remove("jwt");
    setUser({ full_name: "Guest", email: "No email provided" });
    handleLogout();
    navigate("/login");
  };

  return (
    <div className={styles.profileMenu}>
      <FaUserCircle className={styles.profileIcon} onClick={toggleProfileMenu} />
      {isProfileOpen && (
        <div className={styles.dropdownMenu}>
          <div className={styles.profileHeader}>
            <img src="/src/assets/image.png" alt="User" className={styles.profileImage} />
            <div>
              <p className={styles.userName}>{user.full_name}</p>
              <p className={styles.userEmail}>{user.email}</p>
            </div>
          </div>
          <hr />
          <Link to="/profile" onClick={toggleProfileMenu}>Profile</Link>
          <Link to="/settings" onClick={toggleProfileMenu}>Settings</Link>
          <button onClick={handleLogoutClick} className={styles.logoutBtn}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
