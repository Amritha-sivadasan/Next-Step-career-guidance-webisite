import mongoose, { Schema,model, Document } from "mongoose";
import { IReviewAndRating } from "../entities/RevieAndRating";

const reviewAndRatingSchema= new Schema({
    review:{type:String},
    rating:{type:Number},
    meetingId:{type:mongoose.Types.ObjectId,required:true},
    studentId:{type:mongoose.Types.ObjectId},
    expertId:{type:mongoose.Types.ObjectId},
    is_delete:{type:Boolean,default:false}
})

export const  ReviewAndRating= model<IReviewAndRating & Document>('ReviewAndRating',reviewAndRatingSchema)