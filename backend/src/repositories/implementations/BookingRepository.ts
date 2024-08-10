import Booking from "../../models/bookingModel";
import { IBookingRepository } from "../interface/IBookingRepository";
import { IBooking } from "../../entities/BookingEntity";

export default class BookingRepository implements IBookingRepository {
  async create(booking: Partial<IBooking>): Promise<IBooking> {
    const newBooking = new Booking(booking);
    return newBooking.save();
  }

  async updateBookingTransactionId(
    bookingId: string,
    transactionId: string
  ): Promise<IBooking | null> {
    return Booking.findByIdAndUpdate(
      bookingId,
      { transactionId },
      { new: true }
    );
  }

  async findAll(): Promise<IBooking[]> {
    return Booking.find();
  }
  async findById(id: string): Promise<IBooking | null> {
    return Booking.findById(id);
  }
  async findAllById(id: string): Promise<IBooking[] | null> {
    return Booking.find({ expertId: id,bookingStatus:'pending' })
      .populate("studentId")
      .populate("slotId")
      .exec();
  }

  async findConfirmBooking(id: string): Promise<IBooking[] | null> {
    return Booking.find({ expertId: id,bookingStatus:'confirmed' })
      .populate("studentId")
      .populate("slotId")
      .exec();
  }
  async updateBookingPaymentStatus(
    transactionId: string,
    status: string
  ): Promise<void> {
    try {
      const result = await Booking.findOneAndUpdate(
        { transactionId },
        { paymentStatus: status }
      );
    } catch (error) {
      console.log("eror", error);
    }
  }
  async updateBookingStatus(bookingId: string, status: string): Promise<void> {
    await Booking.findByIdAndUpdate(bookingId, { bookingStatus: status });
  }
}
