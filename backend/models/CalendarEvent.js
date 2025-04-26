const mongoose = require("mongoose");

const calendarEventSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Event title
  start: { type: Date, required: true }, // Start date and time
  end: { type: Date, required: true }, // End date and time
  id_patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true }, // Reference to Patient
  created_at: { type: Date, default: Date.now }, // Timestamp for creation
});

module.exports = mongoose.model("CalendarEvent", calendarEventSchema);