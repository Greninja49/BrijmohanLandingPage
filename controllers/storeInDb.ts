import { BookingData } from "../types/types";
import { saveToDatabase } from "../repositories/storeDataRepo";

export async function storeBooking(formData: any) {
  const bookingData: BookingData = {
    name: formData.name,
    phone: formData.phone,
    email: formData.email,
    eventType: formData.eventType,
    eventDate: formData.eventDate,
    guestCount: parseInt(formData.guestCount, 10),
    requirements: formData.requirements,
  };

  return saveToDatabase(bookingData);
}
