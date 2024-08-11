import { IBooking } from "../../entities/BookingEntity";

export interface IBookingRepository{
    create(booking:Partial<IBooking>):Promise<IBooking>
    findAll():Promise<IBooking[]>
    findById(id:string):Promise<IBooking|null>
    findAllById(id:string):Promise<IBooking[]|null>
    updateBookingTransactionId(bookingId: string, transactionId: string): Promise<IBooking | null>
    updateBookingPaymentStatus(transactionId:string,status:string):Promise<void>
    updateBookingStatus(bookingId:string, status:string):Promise<IBooking|null>
    findConfirmBooking(id: string,page:number,limit:number): Promise<IBooking[] | null>
    findAllBookings(id:string): Promise<IBooking[] | null>
    findAllBookingsByUserId(id: string): Promise<IBooking[] | null>
   
}