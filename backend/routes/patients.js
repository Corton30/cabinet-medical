const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");
const PatientAllergie = require("../models/PatientAllergie");


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

// router.put("/:patientId", async (req, res) => {
//   try {
//     const { allergies } = req.body;

//     console.log("Received allergies:", allergies); // Debugging

//     if (!allergies || !Array.isArray(allergies)) {
//       return res.status(400).json({ error: "Invalid allergies data." });
//     }

//     // Remove existing allergies for the patient
//     await PatientAllergie.deleteMany({ id_patient: req.params.patientId });

//     // Add the new allergies
//     const newAllergies = allergies.map((allergyId) => ({
//       id_patient: req.params.patientId,
//       id_allergie: allergyId,
//     }));
//     await PatientAllergie.insertMany(newAllergies);

//     res.status(200).json({ message: "Allergies updated successfully." });
//   } catch (err) {
//     console.error("Error updating allergies:", err); // Log the error
//     res.status(500).json({ error: "Error updating allergies." });
//   }
// });

router.put("/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;
    const { allergies, ...patientData } = req.body;

    // Update patient's basic information (excluding allergies)
    const updatedPatient = await Patient.findByIdAndUpdate(patientId, patientData, { new: true });

    if (!updatedPatient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Update patient's allergies if provided
    if (allergies) {
      // Remove existing allergies for the patient
      await PatientAllergie.deleteMany({ id_patient: patientId });

      // Add the new allergies
      const newAllergies = allergies.map((allergyId) => ({
        id_patient: patientId,
        id_allergie: allergyId,
      }));
      await PatientAllergie.insertMany(newAllergies);
    }

    res.status(200).json({ message: "Patient updated successfully", patient: updatedPatient });
  } catch (err) {
    console.error("Error updating patient:", err);
    res.status(500).json({ error: "Error updating patient" });
  }
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
    // Fetch the patient's allergies
    const allergies = await PatientAllergie.find({ id_patient: patient._id }).populate("id_allergie");

    res.json({ ...patient.toObject(), allergies });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
