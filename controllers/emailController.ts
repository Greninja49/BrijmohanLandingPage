import { BookingData } from "../types/types";
import { sendEmail } from "../services/emailService";

export async function handleBooking(formData: any) {
  const bookingData: BookingData = {
    name: formData.name,
    phone: formData.phone,
    email: formData.email,
    eventType: formData.eventType,
    eventDate: formData.eventDate,
    guestCount: parseInt(formData.guestCount, 10),
    requirements: formData.requirements,
  };

  return sendEmail(bookingData);
}
