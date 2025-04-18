const mongoose = require("mongoose");

const allergieSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: String
});

module.exports = mongoose.model("Allergie", allergieSchema);
