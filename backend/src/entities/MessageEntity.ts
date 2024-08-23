import {ObjectId,Document} from "mongoose";
export interface IAudio {
    url: string; 
    duration?: number;
  }

export interface IMessage extends Document{
    _id:ObjectId,
    chatId:ObjectId
    senderId:ObjectId
    text?:string,
    audio?:IAudio,
    file?:string
    timestamp: Date,
    is_delete:Boolean
}