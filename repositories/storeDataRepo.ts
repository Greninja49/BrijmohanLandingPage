import mysql from "mysql2/promise";
import { BookingData } from "../types/types";
import dotenv from "dotenv";
dotenv.config();
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.getConnection()
  .then((conn) => {
    console.log("✅ Connected to MySQL database");
    conn.release();
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MySQL:", err);
  });

export async function saveToDatabase(booking: BookingData) {
  await db.execute(
    `INSERT INTO bookings (name, phone, email, event_type, event_date, guest_count, requirements)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
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
}
