import { IBookingRepository } from "../../repositories/interface/IBookingEntity";
import BookingRepository from "../../repositories/implementations/BookingRepository";
import { IBooking } from "../../entities/BookingEntity";
import { IBookingService } from "../interface/IBookingService";


export default class BookingService implements IBookingService{
    private bookingRepository:IBookingRepository
    constructor(){
        this.bookingRepository=new BookingRepository()
    }


    async create(booking: IBooking): Promise<IBooking> {
        try {
          const result= await this.bookingRepository.create(booking)
          return result

        } catch (error) {
            throw error
        }
    }
    async getAllBooking(): Promise<IBooking[] | null> {
        try {
            const result= await this.bookingRepository.findAll()
            return result
            
        } catch (error) {
            throw error
        }
    }
    async getBookingByExpertId(id: string): Promise<IBooking[] | null> {
        try {
            const result= await this.bookingRepository.findAllById(id)
            return result
            
        } catch (error) {
           throw error  
        }
    }
    async getBookingById(id: string): Promise<IBooking | null> {
         try {
            const result = await this.bookingRepository.findById(id)
            return result
            
         } catch (error) {
            throw error
         }
    }
    async getBookingBystudentId(id: string): Promise<IBooking[] | null> {
         try {
            const result = await this.bookingRepository.findAllById(id)
            return result
            
         } catch (error) {
            throw error
         }
    }
}