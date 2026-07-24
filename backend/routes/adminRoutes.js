const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const Enquiry = require("../models/Enquiry");
const Admin = require("../models/Admin");
const Batch = require("../models/Batch");
const { requireAdminAuth } = require("../middleware/auth");

const router = express.Router();


// ================= ADMIN LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin) {
      return res.status(401).json({ message: "Invalid admin credentials." });
    }

    const match = await bcrypt.compare(password, admin.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid admin credentials." });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: "admin"
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.json({
      message: "Admin login successful",
      token,
      admin: {
        id: admin._id,
        fullName: admin.fullName,
        email: admin.email
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error during admin login."
    });
  }
});


// ================= STUDENTS =================
router.get("/students", requireAdminAuth, async (req, res) => {
  try {

    const students = await Student.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.json({ students });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Server error fetching students."
    });
  }
});


// ================= ENQUIRIES =================
router.get("/enquiries", requireAdminAuth, async (req, res) => {
  try {

    const enquiries = await Enquiry.find().sort({
      createdAt: -1
    });

    res.json({ enquiries });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Server error fetching enquiries."
    });
  }
});

router.patch("/enquiries/:id", requireAdminAuth, async (req, res) => {
  try {

    const { status } = req.body;

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!enquiry) {
      return res.status(404).json({
        message: "Enquiry not found."
      });
    }

    res.json({ enquiry });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Server error updating enquiry."
    });
  }
});


// ================= BATCHES =================

// GET ALL
router.get("/batches", requireAdminAuth, async (req, res) => {
  try {

    const batches = await Batch.find().sort({
      createdAt: -1
    });

    res.json({ batches });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Server error fetching batches."
    });
  }
});


// ADD NEW
router.post("/batches", requireAdminAuth, async (req, res) => {

  try {

    const {
      courseName,
      startDate,
      endDate,
      timings,
      days,
      location,
      status
    } = req.body;

    if (
      !courseName ||
      !startDate ||
      !endDate ||
      !timings ||
      !days ||
      !location
    ) {

      return res.status(400).json({
        message: "All fields are required."
      });
    }

    const batch = await Batch.create({
      courseName,
      startDate,
      endDate,
      timings,
      days,
      location,
      status
    });

    res.status(201).json({
      message: "Batch added successfully.",
      batch
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Server error adding batch."
    });
  }
});


// UPDATE
router.put("/batches/:id", requireAdminAuth, async (req, res) => {

  try {

    const {
      courseName,
      startDate,
      endDate,
      timings,
      days,
      location,
      status
    } = req.body;

    const batch = await Batch.findByIdAndUpdate(
      req.params.id,
      {
        courseName,
        startDate,
        endDate,
        timings,
        days,
        location,
        status
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!batch) {

      return res.status(404).json({
        message: "Batch not found."
      });
    }

    res.json({
      message: "Batch updated successfully.",
      batch
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Server error updating batch."
    });
  }
});


// DELETE
router.delete("/batches/:id", requireAdminAuth, async (req, res) => {

  try {

    const batch = await Batch.findByIdAndDelete(req.params.id);

    if (!batch) {

      return res.status(404).json({
        message: "Batch not found."
      });
    }

    res.json({
      message: "Batch deleted successfully."
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Server error deleting batch."
    });
  }
});


module.exports = router;