
import  { Schema ,model,Document } from "mongoose";
import { ICategory } from "../entities/CategoryEntity";
const CategoryShema:Schema=new Schema({
    catName:{ type: String, required: true },
    catImage: { type: String, default:""},
    description:{ type: String, required: true },
    is_delete:{type:Boolean,default:false }
})

const Category= model<ICategory & Document>('Category',CategoryShema)

export  {Category}