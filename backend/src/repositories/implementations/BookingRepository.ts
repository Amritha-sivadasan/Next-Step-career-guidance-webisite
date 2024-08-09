import Booking from "../../models/bookingModel";
import { IBookingRepository } from "../interface/IBookingRepository";
import { IBooking } from "../../entities/BookingEntity";

export default class BookingRepository implements IBookingRepository{
    async create(booking:Partial<IBooking>): Promise<IBooking> {
    const newBooking = new Booking(booking)
    return newBooking.save()
    }

    async updateBookingTransactionId(bookingId: string, transactionId: string): Promise<IBooking | null> {
        return Booking.findByIdAndUpdate(
          bookingId,
          { transactionId },
          { new: true }
        );
      }

    async findAll(): Promise<IBooking[]> {
        return Booking.find()
    }
    async findById(id: string): Promise<IBooking| null> {
        return Booking.findById(id)
    }
    async findAllById(id: string): Promise<IBooking[] | null> {
        return Booking.findById(id)
    }
   
}