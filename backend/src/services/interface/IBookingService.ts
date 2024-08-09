import { IBooking } from "../../entities/BookingEntity";

export interface IBookingService {
    getAllBooking():Promise<IBooking[]|null>
    getBookingById(id:string):Promise<IBooking|null>
    create(bookingData: Partial<IBooking>): Promise<{ sessionId: string; updatedBooking: IBooking | null }>
    getBookingByExpertId(id:string):Promise<IBooking[]|null>
    getBookingBystudentId(id:string):Promise<IBooking[]|null>

}