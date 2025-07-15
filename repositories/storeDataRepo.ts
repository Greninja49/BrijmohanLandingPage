import { Pool } from "pg";
import { BookingData } from "../types/types";
import dotenv from "dotenv";

dotenv.config();

const db = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 5432,
});

// Create the table if it doesn't exist
async function ensureTableExists() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      phone VARCHAR(20),
      email VARCHAR(100),
      event_type VARCHAR(50),
      event_date DATE,
      guest_count INT,
      requirements TEXT,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log("✅ bookings table is ready");
}

// Test connection at startup
db.connect()
  .then((client) => {
    console.log("✅ Connected to PostgreSQL");
    client.release();
  })
  .catch((err) => {
    console.error("❌ Failed to connect to PostgreSQL:", err);
  });

export async function saveToDatabase(booking: BookingData) {
  await ensureTableExists();

  await db.query(
    `INSERT INTO bookings (name, phone, email, event_type, event_date, guest_count, requirements)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [
      booking.name,
      booking.phone,
      booking.email,
      booking.eventType,
      booking.eventDate,
      booking.guestCount,
      booking.requirements,
    ]
  );

  console.log("✅ Booking saved to database");
}
