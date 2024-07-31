
import  { Schema ,model,Document } from "mongoose";
import { ISubCategory } from "../entities/SubCategoryEntity";
const SubCategoryShema:Schema=new Schema({
    subCatName:{ type: String, required: true },
    subCatImage: { type: String, default:""},
    description:{ type: String, required: true },
     catName:{ type: String, required: true }
})

const SubCategory= model<ISubCategory & Document>('Subcategory',SubCategoryShema)

export  {SubCategory}