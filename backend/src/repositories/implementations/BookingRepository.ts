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

  async findAll(page: number, limit: number): Promise<IBooking[]> {
    const skip = (page - 1) * limit;
    return Booking.find()
      .populate("expertId")
      .populate("studentId")
      .populate("slotId")
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);
  }
  async findById(id: string): Promise<IBooking | null> {
    return Booking.findById(id)
      .populate("expertId")
      .populate("studentId")
      .populate("slotId");
  }
  async findAllById(id: string): Promise<IBooking[] | null> {
    return Booking.find({ expertId: id, bookingStatus: "pending" })
      .populate("studentId")
      .populate("slotId")
      .exec();
  }
  async countDocuments(): Promise<number> {
    return Booking.countDocuments().exec();
  }
  async findConfirmBooking(
    id: string,
    page: number,
    limit: number
  ): Promise<IBooking[] | null> {
    const skip = (page - 1) * limit;

    const result=await Booking.find({
      expertId: id,
      bookingStatus: {$ne: "pending" },
      meetingStatus: "pending",
      paymentStatus:{$in:["completed", "refund"]}
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("studentId")
      .populate("slotId")
      .exec();

    
      return result
  }

  async findAllBookings(id: string): Promise<IBooking[] | null> {
    return Booking.find({ expertId: id })
      .populate("studentId")
      .populate("slotId")
      .exec();
  }
  async findAllBookingsByUserId(
    id: string,
    page: number,
    limit: number
  ): Promise<IBooking[] | null> {
    const skip = (page - 1) * limit;
    return Booking.find({
      studentId: id,
      meetingStatus: "pending",
      paymentStatus:{$in:["completed", "refund"]},
      bookingStatus: { $ne: "pending" },
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("expertId")
      .populate("slotId")
      .exec();
  }

  async findAllPaymentByUserId(
    id: string,
    page: number,
    limit: number
  ): Promise<IBooking[] | null> {
    const skip = (page - 1) * limit;
    return Booking.find({ studentId: id })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("expertId")
      .exec();
  }
  async updateBookingPaymentStatus(
    id: string,
    status: string
  ): Promise<void> {
    try {
      const result = await Booking.findByIdAndUpdate(
       id,
        { paymentStatus: status }
      );
    } catch (error) {
      console.log("eror", error);
    }
  }
  async updateBookingStatus(
    bookingId: string,
    status: string,
    reason: string
  ): Promise<IBooking | null> {
    const result = await Booking.findByIdAndUpdate(bookingId, {
      bookingStatus: status,
      cancelReason: reason,
    }).populate("studentId");
    return result;
  }
  async updatemeetingStatus(id: string, status: string): Promise<void> {
    try {
      await Booking.findByIdAndUpdate(id, { meetingStatus: status });
    } catch (error) {
      throw error;
    }
  }
  async fetchAllBookings(): Promise<IBooking[]> {
    try {
      const result = await Booking.find().populate("expertId");
      return result;
    } catch (error) {
      throw error;
    }
  }

  async checkPaymentStatus(id: string): Promise<IBooking |null> {
    try {
      const result = await Booking.findById(id)
      return result
    } catch (error) {
      throw error;
    }
  }
}
