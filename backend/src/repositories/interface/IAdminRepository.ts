import { IAdmin } from "../../entities/AdminEntity";

export interface IAdminRepository{
    findAdmin(user_name:String):Promise<IAdmin|null>
}