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
// async function initDB() {
//   const conn = await db.getConnection();
//   try {
//     console.log("✅ Connected to MySQL server");

//     // Create DB if not exists
//     await conn.query(`CREATE DATABASE IF NOT EXISTS eventdb`);
//     await conn.query(`USE eventdb`);

//     // Create table if not exists
//     await conn.query(`
//       CREATE TABLE IF NOT EXISTS bookings (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(100),
//         phone VARCHAR(20),
//         email VARCHAR(100),
//         event_type VARCHAR(50),
//         event_date DATE,
//         guest_count INT,
//         requirements TEXT,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )
//     `);

//     console.log("✅ Database and table ready");
//   } finally {
//     conn.release();
//   }
// }

// // Call it once at startup
// initDB().catch((err) => {
//   console.error("❌ Failed to initialize database:", err);
// });

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
