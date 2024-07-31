import { ObjectId ,Document} from "mongoose";


export interface ISubCategory extends Document{
    _id:ObjectId
    subCatName:string
    subCatImage:string,
    description:string,
    catName:string
}