
import  { Schema ,model,Document } from "mongoose";
import { ISubCategory } from "../entities/SubCategoryEntity";
const SubCategoryShema:Schema=new Schema({
    subCatName:{ type: String, required: true },
    SubCatImage: { type: String, default:""},
    description:{ type: String, required: true },
    categoryId:{ type: String, required: true }
})

const SubCategory= model<ISubCategory & Document>('Subcategory',SubCategoryShema)

export  {SubCategory}