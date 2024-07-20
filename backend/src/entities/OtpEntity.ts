import { ObjectId,Document } from "mongoose";

export interface IOtp  {
  id?: ObjectId;
  email: String;
  context: String;
  otp:String
  createdAt:Date
}
