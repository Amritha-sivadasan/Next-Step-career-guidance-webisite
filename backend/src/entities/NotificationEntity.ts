import { ObjectId ,Document} from "mongoose";

export interface IChatNotification extends Document{
    _id:ObjectId,
    userId:string,
    chatId:string,
    count:number,

}