const express = require("express");
const router = express.Router();
const Medicament = require("../models/Medicament");

router.post("/", async (req, res) => {
  const medicament = new Medicament(req.body);
  res.status(201).json(await medicament.save());
});


router.get("/", async (req, res) => {
  try {
    const medicaments = await Medicament.find();
    res.json(medicaments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch medicaments" });
  }
});

module.exports = router;



module.exports = router;