const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  date_naissance: { type: Date, required: true },
  antecedents: { type: String },
  allergies_connues: { type: Boolean, default: false },
  date_creation: { type: Date, default: Date.now },
  nss: { type: Number, required: true, unique: true },
  telephone: { type: String, required: true },
  adresse: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  sexe: { type: String, enum: ["Homme", "Femme"], required: true }
});

module.exports = mongoose.model("Patient", patientSchema);
