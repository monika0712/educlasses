// One-time script to load the original demo batch schedule into the database,
// so it shows up on batch.html alongside anything added later from the admin panel.
// Run with: npm run seed:batches
//
// Safe to run more than once - it skips any batch that already exists
// (matched by courseName + startDate) instead of creating duplicates.

require("dotenv").config();
const connectDB = require("./config/db");
const Batch = require("./models/Batch");

const DEFAULT_BATCHES = [
  { courseName: "Full Stack Web Development", startDate: "01 Apr'26", endDate: "30 Sep'26", timings: "09:00 - 17:00", days: "Mon-Fri", location: "Pune" },
  { courseName: "Java Programming", startDate: "05 Apr'26", endDate: "30 Jul'26", timings: "10:00 - 16:00", days: "Mon-Fri", location: "Pune" },
  { courseName: "Python Programming", startDate: "10 Apr'26", endDate: "10 Aug'26", timings: "09:00 - 15:00", days: "Mon-Sat", location: "Mumbai" },
  { courseName: "Data Analytics", startDate: "15 Apr'26", endDate: "15 Sep'26", timings: "10:00 - 17:00", days: "Mon-Fri", location: "Pune" },
  { courseName: "Data Science", startDate: "20 Apr'26", endDate: "20 Oct'26", timings: "09:00 - 17:00", days: "Mon-Sat", location: "Nagpur" },
  { courseName: ".NET Developer", startDate: "25 Apr'26", endDate: "25 Sep'26", timings: "10:00 - 16:00", days: "Mon-Fri", location: "Pune" },
  { courseName: "UI / UX Design", startDate: "01 May'26", endDate: "31 Jul'26", timings: "09:30 - 15:30", days: "Mon-Fri", location: "Mumbai" },
  { courseName: "Cyber Security", startDate: "05 May'26", endDate: "30 Sep'26", timings: "10:00 - 17:00", days: "Mon-Fri", location: "Pune" },
  { courseName: "Artificial Intelligence", startDate: "10 May'26", endDate: "10 Nov'26", timings: "09:00 - 17:00", days: "Mon-Sat", location: "Nagpur" },
];

async function seedBatches() {
  await connectDB();

  let created = 0;
  let skipped = 0;

  for (const b of DEFAULT_BATCHES) {
    const existing = await Batch.findOne({ courseName: b.courseName, startDate: b.startDate });
    if (existing) {
      skipped++;
      continue;
    }
    await Batch.create(b);
    created++;
  }

  console.log(`Batch seed complete: ${created} added, ${skipped} already existed and were skipped.`);
  process.exit(0);
}

seedBatches().catch((err) => {
  console.error("Failed to seed batches:", err);
  process.exit(1);
});
