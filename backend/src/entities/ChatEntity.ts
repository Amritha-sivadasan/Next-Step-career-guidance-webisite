import { ObjectId, Document } from "mongoose";
import { IStudent } from "./StudentEntity";
import { IExpert } from "./ExpertEntity";
import { IBooking } from "./BookingEntity";

export interface IChat extends Document {
  _id: ObjectId;
  studentId:ObjectId |IStudent,
  expertId:ObjectId|IExpert,
  messages: ObjectId[],
  latestMessage:string,
  bookingId:ObjectId|IBooking
}
