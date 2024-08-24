import { ObjectId,Document } from "mongoose";
import { IBooking } from "./BookingEntity";
import { IExpert } from "./ExpertEntity";

export interface IVideoCall extends Document{
    _id:ObjectId
    bookindId:ObjectId|IBooking
    expertId:ObjectId |IExpert
    url:String
    duration :number

}