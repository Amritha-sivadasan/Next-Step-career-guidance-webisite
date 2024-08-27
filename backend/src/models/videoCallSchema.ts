import mongoose, { Schema,model, Document } from "mongoose";
import { IVideoCall } from "../entities/VideoCallEntity";

const videoCallSchema= new Schema({
    bookingId:{type:mongoose.Types.ObjectId,required:true ,ref:"Booking"},
    expertId:{type:mongoose.Types.ObjectId,required:true,ref:'Expert'},
    studentId:{type:mongoose.Types.ObjectId,required:true,ref:'Student'},
    url:{type:String},
    duration :{type:Number}
},{timestamps:true})


export  const VideoCall= model<IVideoCall & Document>('VideoCall',videoCallSchema)