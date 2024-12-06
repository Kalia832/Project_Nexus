const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const EventForm = require("./models/EventForms"); // Import the model

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/event_forms", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.post("/api/forms", async (req, res) => {
  try {
    const { name, email, details, eventType } = req.body;

    // Create a new form entry
    const formEntry = new EventForm({
      name,
      email,
      details,
      eventType,
    });

    // Save the form entry in MongoDB
    await formEntry.save();

    res.status(201).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error saving form:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch all records grouped by category
app.get("/api/forms", async (req, res) => {
  try {
    const forms = await EventForm.find();

    // Group the records by category (eventType)
    const groupedForms = forms.reduce((acc, form) => {
      if (!acc[form.eventType]) acc[form.eventType] = [];
      acc[form.eventType].push(form);
      return acc;
    }, {});

    res.status(200).json(groupedForms);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
