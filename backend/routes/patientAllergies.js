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

module.exports = router;
