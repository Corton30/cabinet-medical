const mongoose = require("mongoose");

const patientAllergieSchema = new mongoose.Schema({
  id_patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  id_allergie: { type: mongoose.Schema.Types.ObjectId, ref: "Allergie", required: true },
  niveau_severite: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("PatientAllergie", patientAllergieSchema);
