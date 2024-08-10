import { IExpert } from "./expert";
import { ISlot } from "./slot";
import { IStudent } from "./user";

export interface IBooking{
    _id: string;
    studentId: string  | IStudent;
    expertId: string |IExpert;
    slotId:string|ISlot,
    bookingStatus: string;
    subCatName: string;
    paymentAmount: number;
    paymentStatus: string;
    transactionId:string;
    paymentMethod:string;
    meetingStatus:string
}