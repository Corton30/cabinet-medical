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

router.put("/:patientId", async (req, res) => {
  try {
    const { allergies } = req.body;

    // Validate the allergies array
    if (!allergies || !Array.isArray(allergies)) {
      return res.status(400).json({ error: "Invalid allergies data." });
    }

    // Remove existing allergies for the patient
    await PatientAllergie.deleteMany({ id_patient: req.params.patientId });

    // Add the new allergies
    const newAllergies = allergies.map((allergyId) => ({
      id_patient: req.params.patientId,
      id_allergie: allergyId,
    }));
    await PatientAllergie.insertMany(newAllergies);

    res.status(200).json({ message: "Allergies updated successfully." });
  } catch (err) {
    console.error("Error updating allergies:", err);
    res.status(500).json({ error: "Error updating allergies." });
  }
});
module.exports = router;
