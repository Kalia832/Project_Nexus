import React, { useState } from "react";

// EventForm Component
const EventForm = ({ eventType, onClose }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form data
    const formData = {
      name: e.target[0].value,
      email: e.target[1].value,
      details: e.target[2].value,
      eventType,
    };

    try {
      const response = await fetch("http://localhost:5000/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        onClose(); // Close the modal
      } else {
        alert("Failed to submit the form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <h2>{eventType} Form</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label>Name</label>
            <input type="text" placeholder="Enter your name" required />
          </div>
          <div style={styles.formGroup}>
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div style={styles.formGroup}>
            <label>Details</label>
            <textarea placeholder="Enter details" required></textarea>
          </div>
          <button type="submit" style={styles.submitButton}>
            Submit
          </button>
          <button type="button" onClick={onClose} style={styles.closeButton}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

// EventList Component
const EventList = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = ["Sports", "Placement Drive", "Courses", "Workshops"];

  const handleEventClick = (eventType) => {
    setSelectedEvent(eventType);
  };

  const closeForm = () => {
    setSelectedEvent(null);
  };

  return (
    <div style={styles.container}>
      <h1>Upcoming Events</h1>
      <ul style={styles.eventList}>
        {events.map((event) => (
          <li
            key={event}
            style={styles.eventItem}
            onClick={() => handleEventClick(event)}
          >
            {event}
          </li>
        ))}
      </ul>

      {selectedEvent && (
        <EventForm eventType={selectedEvent} onClose={closeForm} />
      )}
    </div>
  );
};

// Styles (Inline CSS)
const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    margin: "20px",
  },
  eventList: {
    listStyle: "none",
    padding: 0,
  },
  eventItem: {
    margin: "10px 0",
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "400px",
    maxWidth: "90%",
  },
  formGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
  },
  closeButton: {
    backgroundColor: "#f44336",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default EventList;
