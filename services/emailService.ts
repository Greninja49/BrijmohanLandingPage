import nodemailer from "nodemailer";
import { BookingData } from "../types/types";
import dotenv from "dotenv";
dotenv.config();
export async function sendEmail(booking: BookingData) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.RECIPIENT_EMAIL,
    subject: "New Event Booking",
    html: `
      <h3>New Booking Request</h3>
      <p><strong>Name:</strong> ${booking.name}</p>
      <p><strong>Phone:</strong> ${booking.phone}</p>
      <p><strong>Event Type:</strong> ${booking.eventType}</p>
      <p><strong>Event Date:</strong> ${booking.eventDate}</p>
      <p><strong>Guest Count:</strong> ${booking.guestCount}</p>
      <p><strong>Requirements:</strong> ${booking.requirements}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}
