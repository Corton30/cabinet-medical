const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");

router.post("/", async (req, res) => {
  try {
    const patient = new Patient(req.body);
    const saved = await patient.save();
    res.status(201).json(saved);
  } catch (err) {
    if (err.code === 11000) {
      // Check which field caused the duplicate key error
      const duplicateField = Object.keys(err.keyValue)[0]; // Get the field name
      if (duplicateField === "nss") {
        res.status(400).json({ error: "Le NSS est déjà utilisé." });
      } else if (duplicateField === "email") {
        res.status(400).json({ error: "L'email est déjà utilisé." });
      } else {
        res.status(400).json({ error: "Une clé unique est déjà utilisée." });
      }
    } else {
      res.status(400).json({ error: err.message });
    }
  }
});

router.get("/", async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
});

router.get("/:id", async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  res.json(patient);
});

router.put("/:id", async (req, res) => {
  const updated = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Patient.findByIdAndDelete(req.params.id);
  res.json({ message: "Patient supprimé" });
});

// Find a patient by NSS
router.get("/nss/:nss", async (req, res) => {
  try {
    const patient = await Patient.findOne({ nss: req.params.nss });
    if (!patient) {
      return res.status(404).json({ message: "Patient non trouvé" });
    }
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
