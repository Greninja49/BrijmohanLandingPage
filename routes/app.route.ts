import express, { Router, Request, Response } from "express";
import path from "path";
import { handleBooking } from "../controllers/emailController";
const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../views/index.html"));
});

router.get("/thankyou", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../views/thankyou.html"));
});

router.post("/submit", async (req, res) => {
  const { name, phone, eventDate, guestCount } = req.body;

  const errors: Record<string, string> = {};

  if (!/^[a-zA-Z\s]+$/.test(name)) {
    errors.name = "Name must only contain letters.";
  }

  if (!/^\d{10}$/.test(phone)) {
    errors.phone = "Phone must be a valid 10-digit number.";
  }

  if (!eventDate) {
    errors.eventDate = "Event date is required.";
  }

  if (!guestCount || isNaN(guestCount) || guestCount <= 0) {
    errors.guestCount = "Guest count must be a positive number.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    await Promise.all([handleBooking(req.body)]);
    res.status(200).json({ success: true, redirect: "/thankyou" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

router.use((req, res) => {
  res.redirect("/");
});

export default router;
