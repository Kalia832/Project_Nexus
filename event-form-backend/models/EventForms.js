const mongoose = require("mongoose");

// Schema for the Event Form
const EventFormSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  details: { type: String, required: true },
  eventType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Export the model
module.exports = mongoose.model("EventForm", EventFormSchema);
