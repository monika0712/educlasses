const express = require("express");
const Batch = require("../models/Batch");

const router = express.Router();

// GET /api/batches - public list of all upcoming batches, for the Batch Schedule page
router.get("/", async (req, res) => {
  try {
    const batches = await Batch.find().sort({ createdAt: -1 });
    res.json({ batches });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching batches." });
  }
});

module.exports = router;
