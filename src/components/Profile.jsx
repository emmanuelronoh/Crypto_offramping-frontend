import React, { useEffect, useState } from "react";
import axios from "axios"; // Axios for making API requests
import "./Profile.css"; // Import the CSS file for styling

const Profile = () => {
  const [user, setUser] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from local storage
        const response = await axios.get("http://localhost:8000/auth/profile/", {
          headers: {
            Authorization: `Token ${token}`, // Send token for authentication
          },
        });
        setUser(response.data); // Set user data
        setLoading(false);
      } catch (err) {
        setError("Failed to load user data");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {user ? (
        <div className="profile-details">
          <p><strong>Name:</strong> {user.full_name || "N/A"}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
          <p><strong>Address:</strong> {user.address || "N/A"}</p>

          {/* Mobile Money & Crypto Wallets */}
          <h3>Accounts</h3>
          <p><strong>Mobile Money:</strong> {user.mobile_money_number || "Not Linked"}</p>
          <p><strong>Crypto Wallet:</strong> {user.crypto_wallet_address || "Not Linked"}</p>

          {/* KYC Verification */}
          <h3>Verification</h3>
          <p><strong>KYC Status:</strong> {user.kyc_status || "Not Verified"}</p>

          {/* Security Settings */}
          <h3>Security</h3>
          <p><strong>Two-Factor Authentication (2FA):</strong> {user.two_factor_enabled ? "Enabled" : "Disabled"}</p>
          <button>Change Password</button>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default Profile;
