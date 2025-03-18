import React, { useState } from "react";
import styles from "./Transaction.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const transactions = [
  { id: "TXN-1A2B3C4D", amount: "0.01 BTC", date: "2025-03-13T14:30:00", name: "John Deo", phone: "+254 712 345 678", status: "Completed" },
  { id: "TXN-2A2B3C4E", amount: "0.5 ETH", date: "2025-03-08T13:00:00", name: "John Deo", phone: "+254 712 345 678", status: "Pending" },
  { id: "TXN-3A2B3C4F", amount: "0.01 BTC", date: "2025-03-01T17:45:00", name: "John Deo", phone: "+254 712 345 678", status: "Failed" }
];

const Transaction = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [timeFilter, setTimeFilter] = useState("All Time");
  const [activeMenuId, setActiveMenuId] = useState(null);

  const filterByTime = (transactionDate) => {
    const now = new Date();
    const txDate = new Date(transactionDate);

    if (timeFilter === "Today") {
      return txDate.toDateString() === now.toDateString();
    } else if (timeFilter === "This Week") {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      return txDate >= oneWeekAgo;
    } else if (timeFilter === "This Month") {
      return txDate.getMonth() === now.getMonth() && txDate.getFullYear() === now.getFullYear();
    }
    return true;
  };

  const filteredTransactions = transactions.filter(
    (tx) => (filter === "All" || tx.status === filter) &&
      tx.id.toLowerCase().includes(search.toLowerCase()) &&
      filterByTime(tx.date)
  );

  const handleDelete = (id) => {
    alert(`Transaction ${id} deleted.`);
    setActiveMenuId(null); // Close the menu after action
  };

  const handleRetry = (id) => {
    alert(`Retrying transaction ${id}...`);
    setActiveMenuId(null); // Close the menu after action
  };

  const handleCancel = (id) => {
    alert(`Transaction ${id} cancelled.`);
    setActiveMenuId(null); // Close the menu after action
  };

  const handleCheckWhy = (id) => {
    alert(`Checking why transaction ${id} failed.`);
    setActiveMenuId(null); // Close the menu after action
  };

  const toggleMenu = (id, event) => {
    event.stopPropagation(); // Stop event propagation
    setActiveMenuId((prev) => (prev === id ? null : id)); // Toggle menu
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Transaction Confirmation</h2>
      <p className={styles.subtitle}>Your transfer is being processed</p>

      <div className={styles.filtersWrapper}>
        <div className={styles.searchWrapper}>
          <i className="fas fa-search"></i>
          <input
            type="text"
            className={styles.searchBar}
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select className={styles.timeFilter} value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)}>
          <option>All Time</option>
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>

      <div className={styles.filterButtons}>
        {["All", "Pending", "Completed", "Failed"].map((status) => (
          <button
            key={status}
            className={`${styles.filterButton} ${filter === status ? styles.active : ""}`}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Recipient Name</th>
              <th>Phone Number</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx) => (
              <tr key={tx.id}>
                <td>{tx.id}</td>
                <td>{tx.amount}</td>
                <td>{new Date(tx.date).toLocaleString()}</td>
                <td>{tx.name}</td>
                <td>{tx.phone}</td>
                <td>
                  <span className={`${styles.status} ${styles[tx.status.toLowerCase()]}`}>
                    {tx.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actionWrapper}>
                    <button className={styles.actionButton} onClick={(e) => toggleMenu(tx.id, e)}>
                      <i className="fas fa-ellipsis-h"></i>
                    </button>

                    {/* Add the .active class conditionally */}
                    <div className={`${styles.actionMenu} ${activeMenuId === tx.id ? styles.active : ""}`}>
                      <button className={styles.deleteButton} onClick={() => handleDelete(tx.id)}>
                        <i className="fas fa-trash"></i> Delete
                      </button>

                      {tx.status === "Pending" && (
                        <>
                          <button className={styles.retryButton} onClick={() => handleRetry(tx.id)}>
                            <i className="fas fa-redo"></i> Retry
                          </button>
                          <button className={styles.cancelButton} onClick={() => handleCancel(tx.id)}>
                            <i className="fas fa-ban"></i> Cancel
                          </button>
                        </>
                      )}

                      {tx.status === "Failed" && (
                        <>
                          <button className={styles.cancelButton} onClick={() => handleCancel(tx.id)}>
                            <i className="fas fa-ban"></i> Cancel
                          </button>
                          <button className={styles.infoButton} onClick={() => handleCheckWhy(tx.id)}>
                            <i className="fas fa-info-circle"></i> Check Why
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    </div >
  );
};

export default Transaction;