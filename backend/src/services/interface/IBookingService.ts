import { IBooking } from "../../entities/BookingEntity";

export interface IBookingService {
    getAllBooking():Promise<IBooking[]|null>
    getBookingById(id:string):Promise<IBooking|null>
    create(booking:IBooking):Promise<IBooking>
    getBookingByExpertId(id:string):Promise<IBooking[]|null>
    getBookingBystudentId(id:string):Promise<IBooking[]|null>

}