import { IAdmin } from "../../entities/AdminEntity";
import { IAdminRepository } from "../interface/IAdminRepository";
import { Admin } from "../../models/adminSchema";

export  default class AdminRepository implements IAdminRepository{
    async findAdmin(user_name:string):Promise<IAdmin|null>{
      
      return Admin.findOne({user_name})
    }
    async findById(id: string): Promise<IAdmin | null> {
      return Admin.findById(id)
    }
}