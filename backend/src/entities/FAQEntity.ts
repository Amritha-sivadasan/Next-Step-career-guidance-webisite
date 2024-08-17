import { ObjectId,Document } from "mongoose";

export interface IFAQ extends Document{
    _id:ObjectId,
    studentId:ObjectId,
    question:string,
    answer:string
}