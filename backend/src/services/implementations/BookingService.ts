import { IBookingRepository } from "../../repositories/interface/IBookingRepository";
import BookingRepository from "../../repositories/implementations/BookingRepository";
import { IBooking } from "../../entities/BookingEntity";
import { IBookingService } from "../interface/IBookingService";
import Stripe from "stripe";
import { SendMail } from "../../utils/sendOtp";
import { IStudent } from "../../entities/StudentEntity";
import { ISlotRepository } from "../../repositories/interface/ISlotRepository";
import SlotRepository from "../../repositories/implementations/SlotRepository";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});
export default class BookingService implements IBookingService {
  private bookingRepository: IBookingRepository;
  private slotRepository:ISlotRepository
  constructor() {
    this.bookingRepository = new BookingRepository();
    this.slotRepository= new SlotRepository()
  }

  async create(
    bookingData: Partial<IBooking>
  ): Promise<{ sessionId: string; updatedBooking: IBooking | null }> {
    try {
      const updateBookingData={
        ...bookingData,
        bookingStatus:"confirmed"
      }
      const newBooking = await this.bookingRepository.create(updateBookingData);

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: "Consultation Slot",
                description: `Booking slot with expert ${bookingData.expertId}`,
              },
              unit_amount: bookingData.paymentAmount! * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
        metadata: {
          bookingId: newBooking._id.toString(),
        },
      });

      const updatedBooking =
        await this.bookingRepository.updateBookingTransactionId(
          newBooking._id.toString(),
          session.id
        );

      return {
        sessionId: session.id,
        updatedBooking,
      };
    } catch (error) {
      console.error("Error creating booking and Stripe session:", error);
      throw new Error("Failed to create booking and Stripe session");
    }
  }

  async refundPayment(id: string,reason:string): Promise<{sessionId:string}> {
    try {
      const bookingDetails = await this.bookingRepository.findById(id);
      if (!bookingDetails) {
        throw new Error("Booking details not found");
      }
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: "Consultation Slot cancel",
                description: ` Cancel Booking slot with expert ${bookingDetails.expertId}`,
              },
              unit_amount: bookingDetails.paymentAmount! * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.FRONTEND_URL}/expert/booking-details`,
        cancel_url: `${process.env.FRONTEND_URL}/expert/payment-cancel`,
        metadata: {
          bookingId: bookingDetails._id.toString(),
        },
      });

    
      await this.updateBookingStatus(id,'cancelled',reason)
      await this.updateBookingPaymentStatus(bookingDetails.transactionId,"refund")
     
    
    
      return {
        sessionId: session.id,
      
      };

    } catch (error) {
      console.error("Error creating booking and Stripe session:", error);
      throw new Error("Failed to refund payment");
    }
  }

  async getAllBooking(page:number,limit:number): Promise<{items:IBooking [];
    totalCount: number;
    totalPages: number;
    currentPage: number;}> {
    try {
      const result = await this.bookingRepository.findAll(page,limit);
      const totalCount = await this.bookingRepository.countDocuments();
      return {
        items: result,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
      }
    
    } catch (error) {
      throw error;
    }
  }

  async getBookingByExpertId(id: string): Promise<IBooking[] | null> {
    try {
      const result = await this.bookingRepository.findAllById(id);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAllBookingByExpertId(id: string): Promise<IBooking[] | null> {
    try {
      const result = await this.bookingRepository.findAllBookings(id);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAllBookingByStudentId(id: string,page:number, limit:number): Promise<IBooking[] | null> {
    try {
      const result = await this.bookingRepository.findAllBookingsByUserId(id,page,limit);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async getBookingById(id: string): Promise<IBooking | null> {
    try {
      const result = await this.bookingRepository.findById(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async getBookingBystudentId(id: string): Promise<IBooking[] | null> {
    try {
      const result = await this.bookingRepository.findAllById(id);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateBookingStatus(id: string, status: string,reason?:string): Promise<void> {
    try {
      const response = await this.bookingRepository.updateBookingStatus(
        id,
        status,
        reason
      );
      const studentId = response?.studentId as IStudent;

      const email = studentId?.email;
      const subject = "Booking Status updated please check";
      const Reason= reason||""
      SendMail(
        subject,
        email,
        Reason
      );
    } catch (error) {
      throw error;
    }
  }

  async updateBookingPaymentStatus(id: string, status: string): Promise<void> {
    try {
      await this.bookingRepository.updateBookingPaymentStatus(id, status);
    } catch (error) {
      throw error;
    }
  }
  async getConfirmBooking(id: string,page:number,limit:number): Promise<IBooking[] | null> {
    try {
      const result = await this.bookingRepository.findConfirmBooking(id,page,limit);
      return result;
    } catch (error) {
      throw error;
    }
  }
  
}
