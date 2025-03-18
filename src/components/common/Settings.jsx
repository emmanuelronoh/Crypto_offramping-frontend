import React, { useState } from "react";
import "./Settings.css"; // Import the CSS file for styling

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  const handleNotificationsToggle = () => {
    setNotifications(!notifications);
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>

      <div className="setting-item">
        <label>Dark Mode</label>
        <input type="checkbox" checked={darkMode} onChange={handleDarkModeToggle} />
      </div>

      <div className="setting-item">
        <label>Enable Notifications</label>
        <input type="checkbox" checked={notifications} onChange={handleNotificationsToggle} />
      </div>

      <p className="info">Adjust your preferences for a personalized experience.</p>
    </div>
  );
};

export default Settings;
