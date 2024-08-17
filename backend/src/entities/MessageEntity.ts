import {ObjectId,Document} from "mongoose";

export interface IMessage extends Document{
    _id:ObjectId,
    chatId:ObjectId
    senderId:ObjectId
    text?:string,
    audio:string,
    timestamp: Date,
    is_delete:Boolean
}