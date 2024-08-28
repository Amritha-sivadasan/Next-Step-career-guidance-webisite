import { ObjectId,Document } from "mongoose";
import { IBooking } from "./BookingEntity";
import { IExpert } from "./ExpertEntity";

export interface IVideoCall extends Document{
    _id:ObjectId
    bookingId:ObjectId
    expertId:ObjectId
    studentId:ObjectId,
    url:String
    duration :number

}