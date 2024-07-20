import { ObjectId ,Document} from "mongoose";

export interface IAdmin extends Document{
    _id?:ObjectId,
    user_name:String,
    password:String
}