import { IBooking } from "../../entities/BookingEntity";

export interface IBookingService {
    getAllBooking():Promise<IBooking[]|null>
    getBookingById(id:string):Promise<IBooking|null>
    create(bookingData: Partial<IBooking>): Promise<{ sessionId: string; updatedBooking: IBooking | null }>
    getBookingByExpertId(id:string):Promise<IBooking[]|null>
    getBookingBystudentId(id:string):Promise<IBooking[]|null>
    updateBookingStatus(id:string,status:string):Promise<void>
    updateBookingPaymentStatus(id:string, status:string):Promise<void>
    getConfirmBooking(id: string): Promise<IBooking[] | null>

}