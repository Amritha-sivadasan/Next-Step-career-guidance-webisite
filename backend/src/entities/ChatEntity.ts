import { ObjectId, Document } from "mongoose";
import { IStudent } from "./StudentEntity";
import { IExpert } from "./ExpertEntity";
import { IBooking } from "./BookingEntity";
import { IMessage } from "./MessageEntity";

export interface IChat extends Document {
  _id: ObjectId;
  studentId:ObjectId |IStudent|string,
  expertId:ObjectId|IExpert|string,
  messages: ObjectId[],
  latestMessage:ObjectId|IMessage,
  bookingId:ObjectId|IBooking|string
}
