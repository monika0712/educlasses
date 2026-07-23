const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const { requireStudentAuth } = require("../middleware/auth");

const router = express.Router();

function signStudentToken(student) {
  return jwt.sign(
    { id: student._id, role: "student" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, phone, password, course } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Full name, email and password are required." });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    const existing = await Student.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      fullName,
      email: email.toLowerCase(),
      phone,
      course,
      password: hashedPassword,
    });

    const token = signStudentToken(student);

    res.status(201).json({
      message: "Registration successful",
      token,
      student: {
        id: student._id,
        fullName: student.fullName,
        email: student.email,
        course: student.course,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during registration." });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const student = await Student.findOne({ email: email.toLowerCase() });
    if (!student) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const match = await bcrypt.compare(password, student.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = signStudentToken(student);

    res.json({
      message: "Login successful",
      token,
      student: {
        id: student._id,
        fullName: student.fullName,
        email: student.email,
        course: student.course,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during login." });
  }
});

// GET /api/auth/me - get logged in student's own profile
router.get("/me", requireStudentAuth, async (req, res) => {
  try {
    const student = await Student.findById(req.studentId).select("-password");
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }
    res.json({ student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
