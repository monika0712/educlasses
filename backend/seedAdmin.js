// One-time script to create/update the admin account in the database.
// Run with: npm run seed:admin
//
// It reads the admin's details from .env (or the defaults below) so you
// don't have to hardcode credentials in the codebase.

require("dotenv").config();
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const Admin = require("./models/Admin");

const ADMIN_NAME = process.env.ADMIN_NAME || "Admin";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

async function seedAdmin() {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in your .env file.");
    process.exit(1);
  }

  await connectDB();

  const email = ADMIN_EMAIL.toLowerCase();
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

  const existing = await Admin.findOne({ email });

  if (existing) {
    existing.fullName = ADMIN_NAME;
    existing.password = hashedPassword;
    await existing.save();
    console.log(`Admin account updated for ${email}`);
  } else {
    await Admin.create({ fullName: ADMIN_NAME, email, password: hashedPassword });
    console.log(`Admin account created for ${email}`);
  }

  process.exit(0);
}

seedAdmin().catch((err) => {
  console.error("Failed to seed admin:", err);
  process.exit(1);
});
