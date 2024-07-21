import { IAdmin } from "../../entities/AdminEntity";

export interface IAdminService{
    login(
        user_name: string,
        password: string
      ): Promise<{  admin: IAdmin; accessToken: string; refreshToken: string }>
}