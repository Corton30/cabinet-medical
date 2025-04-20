const express = require("express");
const router = express.Router();
const Ordonnance = require("../models/Ordonnance");

// Create a new ordonnance
router.post("/", async (req, res) => {
  try {
    const { ordonnance_number, patient_nss, medicaments } = req.body;

    // Validate required fields
    if (!ordonnance_number || !patient_nss) {
      return res.status(400).json({ error: "ordonnance_number and patient_nss are required." });
    }

    // Validate medicaments array
    if (!Array.isArray(medicaments) || medicaments.length === 0) {
      return res.status(400).json({ error: "At least one medicament is required." });
    }

    // Create and save the ordonnance
    const ordonnance = new Ordonnance(req.body);
    const savedOrdonnance = await ordonnance.save();
    res.status(201).json(savedOrdonnance);
  } catch (err) {
    console.error("Error creating ordonnance:", err);
    res.status(500).json({ error: "An error occurred while creating the ordonnance." });
  }
});

// Get all ordonnances
router.get("/", async (req, res) => {
  try {
    const ordonnances = await Ordonnance.find().populate("medicaments.id_medicament");
    res.status(200).json(ordonnances);
  } catch (err) {
    console.error("Error fetching ordonnances:", err);
    res.status(500).json({ error: "An error occurred while fetching ordonnances." });
  }
});

// Get a specific ordonnance by ID
router.get("/:id", async (req, res) => {
  try {
    const ordonnance = await Ordonnance.findById(req.params.id).populate("medicaments.id_medicament");
    if (!ordonnance) {
      return res.status(404).json({ error: "Ordonnance not found." });
    }
    res.status(200).json(ordonnance);
  } catch (err) {
    console.error("Error fetching ordonnance:", err);
    res.status(500).json({ error: "An error occurred while fetching the ordonnance." });
  }
});

// Update an ordonnance
router.put("/:id", async (req, res) => {
  try {
    const updatedOrdonnance = await Ordonnance.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedOrdonnance) {
      return res.status(404).json({ error: "Ordonnance not found." });
    }
    res.status(200).json(updatedOrdonnance);
  } catch (err) {
    console.error("Error updating ordonnance:", err);
    res.status(500).json({ error: "An error occurred while updating the ordonnance." });
  }
});

// Delete an ordonnance
router.delete("/:id", async (req, res) => {
  try {
    const deletedOrdonnance = await Ordonnance.findByIdAndDelete(req.params.id);
    if (!deletedOrdonnance) {
      return res.status(404).json({ error: "Ordonnance not found." });
    }
    res.status(200).json({ message: "Ordonnance deleted successfully." });
  } catch (err) {
    console.error("Error deleting ordonnance:", err);
    res.status(500).json({ error: "An error occurred while deleting the ordonnance." });
  }
});

module.exports = router;