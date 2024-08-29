import mongoose, { Schema,model, Document } from "mongoose";
import { IReviewAndRating } from "../entities/RevieAndRating";

const reviewAndRatingSchema= new Schema({
    review:{type:String},
    rating:{type:Number},
    meetingId:{type:mongoose.Types.ObjectId,required:true ,ref:'VideoCall'},
    studentId:{type:mongoose.Types.ObjectId,ref:"Student"},
    expertId:{type:mongoose.Types.ObjectId,ref:'Expert'},
    is_delete:{type:Boolean,default:false}
})

export const  ReviewAndRating= model<IReviewAndRating & Document>('ReviewAndRating',reviewAndRatingSchema)