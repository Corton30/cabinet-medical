const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  date_naissance: { type: Date, required: true },
  antecedents: { type: String },
  allergies_connues: { type: Boolean, default: false },
  date_creation: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Patient", patientSchema);
