import React from "react";
import "./Dashboard.css"; // Import the CSS file

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>Welcome to Your Dashboard</h2>
      <div className="dashboard-widgets">
        <div className="widget balance">
          <h3>Account Balance</h3>
          <p>$5,200.00</p>
        </div>
        <div className="widget transactions">
          <h3>Recent Transactions</h3>
          <ul>
            <li>+ $200 - Salary (Mar 12)</li>
            <li>- $50 - Grocery Shopping (Mar 10)</li>
            <li>+ $300 - Freelance Payment (Mar 08)</li>
          </ul>
        </div>
        <div className="widget quick-actions">
          <h3>Quick Actions</h3>
          <button>Send Money</button>
          <button>View Transactions</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
