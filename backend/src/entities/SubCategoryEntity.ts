import { ObjectId ,Document} from "mongoose";


export interface ISubCategory extends Document{
    _id:ObjectId
    subCatName:string
    SubCatImage:string,
    description:string,
    categoryId:ObjectId
}