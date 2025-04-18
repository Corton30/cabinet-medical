const express = require("express");
const router = express.Router();
const PatientMedicament = require("../models/PatientMedicament");

router.post("/", async (req, res) => {
  const link = new PatientMedicament(req.body);
  res.status(201).json(await link.save());
});

router.get("/", async (req, res) => {
  const links = await PatientMedicament.find().populate("id_patient id_medicament");
  res.json(links);
});

module.exports = router;
