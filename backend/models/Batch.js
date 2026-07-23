const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema(
  {
    courseName: { type: String, required: true, trim: true },
    startDate: { type: String, required: true, trim: true },
    endDate: { type: String, required: true, trim: true },
    timings: { type: String, required: true, trim: true },
    days: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Batch", batchSchema);
