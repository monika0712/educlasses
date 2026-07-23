const express = require("express");
const Enquiry = require("../models/Enquiry");

const router = express.Router();

// POST /api/enquiry - public, used by Contact.html form
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, branch, course, message } = req.body;

    if (!firstName || !lastName || !email || !phone || !branch) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    const enquiry = await Enquiry.create({
      firstName,
      lastName,
      email,
      phone,
      branch,
      course,
      message,
    });

    res.status(201).json({
      message: "Thank you! Your enquiry has been submitted successfully.",
      enquiry,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while submitting enquiry." });
  }
});

module.exports = router;
