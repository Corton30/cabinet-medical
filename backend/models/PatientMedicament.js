const mongoose = require("mongoose");

const patientMedicamentSchema = new mongoose.Schema({
  id_patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  id_medicament: { type: mongoose.Schema.Types.ObjectId, ref: "Medicament", required: true },
  dose: String,
  frequence: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("PatientMedicament", patientMedicamentSchema);
