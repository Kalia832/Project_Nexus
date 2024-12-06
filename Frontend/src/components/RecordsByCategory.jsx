import React, { useEffect, useState } from "react";

const RecordsByCategory = () => {
  const [records, setRecords] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch records from the backend
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/forms"); // Backend API
        if (!response.ok) {
          throw new Error("Failed to fetch records");
        }
        const data = await response.json();
        setRecords(data); // Data is grouped by category
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  // Show loading or error message
  if (loading) return <p>Loading records...</p>;
  if (error) return <p>Error: {error}</p>;

  // Display records grouped by category
  return (
    <div style={styles.container}>
      <h1>Event Records</h1>
      {Object.keys(records).length === 0 ? (
        <p>No records found.</p>
      ) : (
        Object.keys(records).map((category) => (
          <div key={category} style={styles.categorySection}>
            <h2>{category}</h2>
            {records[category].map((record) => (
              <div key={record._id} style={styles.recordContainer}>
                <p>
                  <strong>Name:</strong> {record.name}
                </p>
                <p>
                  <strong>Email:</strong> {record.email}
                </p>
                <p>
                  <strong>Details:</strong> {record.details}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(record.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  categorySection: {
    marginBottom: "30px",
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f4f4f4",
  },
  recordContainer: {
    padding: "10px",
    marginBottom: "10px",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
};

export default RecordsByCategory;
