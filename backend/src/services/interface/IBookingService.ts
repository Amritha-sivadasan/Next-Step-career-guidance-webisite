import { IBooking } from "../../entities/BookingEntity";

export interface IBookingService {
    getAllBooking(page:number,limit:number):Promise<{items:IBooking [];
        totalCount: number;
        totalPages: number;
        currentPage: number;}>
    getBookingById(id:string):Promise<IBooking|null>
    create(bookingData: Partial<IBooking>): Promise<{ sessionId: string; updatedBooking: IBooking | null }>
    getBookingByExpertId(id:string):Promise<IBooking[]|null>
    getBookingBystudentId(id:string):Promise<IBooking[]|null>
    updateBookingStatus(id:string,status:string):Promise<void>
    updateBookingPaymentStatus(id:string, status:string):Promise<void>
    getConfirmBooking(id: string,page:number,limit:number): Promise<IBooking[] | null>
    getAllBookingByExpertId(id:string):Promise<IBooking[]|null>
    refundPayment(id:string):Promise<{sessionId:string}>
    getAllBookingByStudentId(id: string,page:number,limit:number): Promise<IBooking[] | null>
}