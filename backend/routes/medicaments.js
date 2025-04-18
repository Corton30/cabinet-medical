const express = require("express");
const router = express.Router();
const Medicament = require("../models/Medicament");

router.post("/", async (req, res) => {
  const medicament = new Medicament(req.body);
  res.status(201).json(await medicament.save());
});

router.get("/", async (req, res) => {
  const meds = await Medicament.find();
  res.json(meds);
});

module.exports = router;
