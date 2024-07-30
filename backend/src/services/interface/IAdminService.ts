import { IAdmin } from "../../entities/AdminEntity";

export interface IAdminService{
    login(
        user_name: string,
        password: string
      ): Promise<{  user_name:string; accessToken: string; refreshToken: string }>
      findAdminById(id: string): Promise<Partial<IAdmin> | null>
}