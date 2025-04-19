const express = require("express");
const router = express.Router();
const PatientAllergie = require("../models/PatientAllergie");

router.post("/", async (req, res) => {
  const link = new PatientAllergie(req.body);
  res.status(201).json(await link.save());
});

router.get("/", async (req, res) => {
  const list = await PatientAllergie.find().populate("id_patient id_allergie");
  res.json(list);
});

router.get("/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;

    // Find allergies for the given patient ID and populate allergy details
    const patientAllergies = await PatientAllergie.find({ id_patient: patientId }).populate("id_allergie");

    if (!patientAllergies || patientAllergies.length === 0) {
      return res.status(404).json({ message: "No allergies found for this patient." });
    }

    res.status(200).json(patientAllergies);
  } catch (err) {
    console.error("Error fetching patient allergies:", err);
    res.status(500).json({ error: "An error occurred while fetching patient allergies." });
  }
});

router.put("/:patientId", async (req, res) => {
  try {
    const { allergies } = req.body;

    // Log the received allergies for debugging
    console.log("Received allergies:", allergies);

    // Validate the allergies array
    if (!allergies || !Array.isArray(allergies) || allergies.some((id) => typeof id !== "string")) {
      return res.status(400).json({ error: "Invalid allergies data. Ensure it is an array of strings." });
    }

    // Remove existing allergies for the patient
    const deleteResult = await PatientAllergie.deleteMany({ id_patient: req.params.patientId });
    console.log("Deleted existing allergies:", deleteResult);

    // Add the new allergies
    const newAllergies = allergies.map((allergyId) => ({
      id_patient: req.params.patientId,
      id_allergie: allergyId,
    }));

    const insertResult = await PatientAllergie.insertMany(newAllergies);
    console.log("Inserted new allergies:", insertResult);

    res.status(200).json({ message: "Allergies updated successfully." });
  } catch (err) {
    console.error("Error updating allergies:", err);
    res.status(500).json({ error: "Error updating allergies." });
  }
});
module.exports = router;
