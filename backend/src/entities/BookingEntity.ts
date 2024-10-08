import { ObjectId, Document } from "mongoose";
import { IStudent } from "./StudentEntity";
import { IExpert } from "./ExpertEntity";
import { ISlots } from "./SlotEntity";

export interface IBooking extends Document {
  _id: ObjectId;
  bookingId:string,
  studentId: ObjectId|IStudent;
  expertId: ObjectId|IExpert;
  slotId:ObjectId|ISlots |string,
  bookingStatus: string;
  subCatName: string;
  paymentAmount: number;
  paymentStatus: string;
  transactionId:string;
  paymentMethod:string
  meetingStatus:string
}
