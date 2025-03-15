import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "./Notifications.module.css";

const Notifications = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to check if JWT token is expired
  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 < Date.now(); // Check if token expiration time is in the past
    } catch {
      return true; // If token is invalid, treat it as expired
    }
  };

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      const token = Cookies.get("jwt"); // Extract token from cookies

      if (!token || isTokenExpired(token)) {
        setError("Session expired. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000); // Redirect to login after 2 seconds
        setLoading(false);
        return;
      }

      if (!email) {
        setError("User email not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/users/${encodeURIComponent(email)}/notifications/`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setNotifications(response.data);
      } catch (err) {
        setError("Failed to load notifications. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [email, navigate]);

  // Mark all notifications as read
  const markAllAsRead = async () => {
    const token = Cookies.get("jwt");

    if (!token || isTokenExpired(token)) {
      setError("Session expired. Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/users/${encodeURIComponent(email)}/notifications/mark-all-read/`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      setError("Failed to mark notifications as read.");
    }
  };

  return (
    <div className={styles.notificationsContainer}>
      <h2>{email}'s Notifications</h2>
      {loading ? (
        <p>Loading notifications...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : notifications.length === 0 ? (
        <p>No new notifications.</p>
      ) : (
        <>
          <button className={styles.markAllBtn} onClick={markAllAsRead}>
            Mark All as Read
          </button>
          <ul>
            {notifications.map((notif) => (
              <li key={notif.id} className={notif.read ? styles.read : styles.unread}>
                {notif.message}
              </li>
            ))}
          </ul>
        </>
      )}
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default Notifications;
