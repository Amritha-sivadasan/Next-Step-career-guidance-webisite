import { IBookingRepository } from "../../repositories/interface/IBookingRepository";
import BookingRepository from "../../repositories/implementations/BookingRepository";
import { IBooking } from "../../entities/BookingEntity";
import { IBookingService } from "../interface/IBookingService";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });
export default class BookingService implements IBookingService {
  private bookingRepository: IBookingRepository;
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  async create(bookingData: Partial<IBooking>): Promise<{ sessionId: string; updatedBooking: IBooking | null }> {
    try {

      const newBooking = await this.bookingRepository.create(bookingData);
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Consultation Slot',
                description: `Booking slot with expert ${bookingData.expertId}`,
              },
              unit_amount: bookingData.paymentAmount,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
        metadata: {
          bookingId: newBooking._id.toString(),
        },
      });

      const updatedBooking = await this.bookingRepository.updateBookingTransactionId(newBooking._id.toString(), session.id)
 
      return {
        sessionId: session.id,
        updatedBooking,
      };
    } catch (error) {
      console.error('Error creating booking and Stripe session:', error);
      throw new Error('Failed to create booking and Stripe session');
    }
  }
  async getAllBooking(): Promise<IBooking[] | null> {
    try {
      const result = await this.bookingRepository.findAll();
      return result;
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
}
