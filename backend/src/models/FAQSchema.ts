import mongoose, { model,Schema,Document } from "mongoose";
import { IFAQ } from "../entities/FAQEntity";


const FaqSchema:Schema = new Schema({
    studentId:{type:mongoose.Types.ObjectId,required:true},
    question:{type:String,required:true},
    answer:{type:String}

})

export const FAQ= model<IFAQ & Document>('FAQ',FaqSchema)