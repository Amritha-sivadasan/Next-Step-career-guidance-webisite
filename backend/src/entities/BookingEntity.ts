import { ObjectId, Document } from "mongoose";

export interface IBooking extends Document {
  _id: ObjectId;
  studentId: ObjectId;
  expertId: ObjectId;
  slotId:ObjectId,
  bookingStatus: string;
  subCatName: string;
  paymentAmount: number;
  paymentStatus: string;
  transactionId:string;
  paymentMethod:string
}
