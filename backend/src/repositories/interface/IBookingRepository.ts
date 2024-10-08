import { IBooking } from "../../entities/BookingEntity";

export interface IBookingRepository{
    create(booking:Partial<IBooking>):Promise<IBooking>
    findAll(page:number,limit:number):Promise<IBooking[]>
    findById(id:string):Promise<IBooking|null>
    findAllById(id:string):Promise<IBooking[]|null>
    updateBookingTransactionId(bookingId: string, transactionId: string): Promise<IBooking | null>
    updateBookingPaymentStatus(transactionId:string,status:string):Promise<void>
    updateBookingStatus(bookingId:string, status:string,reason?:string):Promise<IBooking|null>
    findConfirmBooking(id: string,page:number,limit:number): Promise<IBooking[] | null>
    findAllBookings(id:string): Promise<IBooking[] | null>
    findAllBookingsByUserId(id: string,page:number,limit:number): Promise<IBooking[] | null>
    findAllPaymentByUserId(id: string,page:number,limit:number): Promise<IBooking[] | null>
    countDocuments(): Promise<number>
    updatemeetingStatus(id:string,status:string):Promise<void>
    fetchAllBookings():Promise<IBooking[]>
    checkPaymentStatus(id:string):Promise<IBooking|null>
   
}