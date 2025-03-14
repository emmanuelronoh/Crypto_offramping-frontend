import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Notifications.module.css";

const Notifications = () => {
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!email) {
        setError("User email not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://127.0.0.1:8000/api/users/${encodeURIComponent(email)}/notifications/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setNotifications(response.data);
      } catch (err) {
        setError("Failed to load notifications");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [email]); // Refetch when email changes

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://127.0.0.1:8000/api/users/${encodeURIComponent(email)}/notifications/`,
        {}, // No body needed
        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      // Update UI: Mark all notifications as read
      setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  return (
    <div className={styles.notificationsContainer}>
      <h2>{email}'s Notifications</h2>
      {loading ? (
        <p>Loading...</p>
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
              <li
                key={notif.id}
                className={notif.read ? styles.read : styles.unread}
              >
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
