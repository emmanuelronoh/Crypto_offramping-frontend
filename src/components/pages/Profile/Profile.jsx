import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie to manage cookies
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("jwt"); // Get token from cookies
        if (!token) {
          setError("Unauthorized: No token found");
          setLoading(false);
          return;
        }

        const response = await axios.get("https://backend-github-code.onrender.com/auth/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        setUser(response.data);
      } catch (err) {
        setError("Failed to load user data");
      } finally {
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

          <h3>Accounts</h3>
          <p><strong>Mobile Money:</strong> {user.mobile_money_number || "Not Linked"}</p>
          <p><strong>Crypto Wallet:</strong> {user.crypto_wallet_address || "Not Linked"}</p>

          <h3>Verification</h3>
          <p><strong>KYC Status:</strong> {user.kyc_status || "Not Verified"}</p>

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
