const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    password: { type: String, required: true },
    course: { type: String, default: "" },
    enrolledCourses: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
