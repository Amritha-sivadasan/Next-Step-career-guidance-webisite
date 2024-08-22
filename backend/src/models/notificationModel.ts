import mongoose, { model, Schema, Document } from "mongoose";
import { IChatNotification } from "../entities/NotificationEntity";

const chatNotificationSchema:Schema = new Schema({
    chatId:{type:mongoose.Types.ObjectId,required:true},
    userId:{type:mongoose.Types.ObjectId,required:true},
    count: { type: Number, default:0 },
})

 export const ChatNotification = model<IChatNotification & Document>("Notification",chatNotificationSchema)