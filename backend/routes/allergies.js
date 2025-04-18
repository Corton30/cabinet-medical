const express = require("express");
const router = express.Router();
const Allergie = require("../models/Allergie");

router.post("/", async (req, res) => {
  const allergie = new Allergie(req.body);
  res.status(201).json(await allergie.save());
});

router.get("/", async (req, res) => {
  const list = await Allergie.find();
  res.json(list);
});

module.exports = router;
