const mongoose = require("mongoose");

const ordonnanceSchema = new mongoose.Schema({
  ordonnance_id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Auto-generated unique ID
  ordonnance_number: { type: String, required: true, unique: true }, // Serial number
  patient_nss: { type: Number, required: true, ref: "Patient" }, // Link to Patient by NSS
  comments: { type: String }, // Optional comments
  medicaments: [
    {
      id_medicament: { type: mongoose.Schema.Types.ObjectId, ref: "Medicament", required: true }, // Link to Medicament
      dose: { type: String }, // Dose for the medication
      frequence: { type: String }, // Frequency of administration
    },
  ],
  created_at: { type: Date, default: Date.now }, // Timestamp for creation
});

module.exports = mongoose.model("Ordonnance", ordonnanceSchema);