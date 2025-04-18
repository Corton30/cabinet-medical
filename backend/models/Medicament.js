const mongoose = require("mongoose");

const medicamentSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  substance_active: String,
  forme: String,
  laboratoire: String,
  description: String
});

module.exports = mongoose.model("Medicament", medicamentSchema);
