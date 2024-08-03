import { ObjectId ,Document} from "mongoose";


export interface ICategory extends Document{
    _id:ObjectId
    catName:string
    catImage?:string,
    description:string
    is_delete:boolean
}