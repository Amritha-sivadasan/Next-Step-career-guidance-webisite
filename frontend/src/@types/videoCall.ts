import { IBooking } from "./booking";
import { IExpert } from "./expert";
import { IStudent } from "./user";

export interface IvidoeCall{
    studentId: string|IStudent;
    _id?:string,
    expertId:string|IExpert,
    bookingId:string |IBooking,
    duration:number,
    url:string
}