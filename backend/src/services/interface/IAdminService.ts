import { IAdmin } from "../../entities/AdminEntity";
import { IBooking } from "../../entities/BookingEntity";
import { IExpert } from "../../entities/ExpertEntity";
import { IStudent } from "../../entities/StudentEntity";
import { IVideoCall } from "../../entities/VideoCallEntity";

export interface IAdminService{
    login(
        user_name: string,
        password: string
      ): Promise<{  user_name:string; accessToken: string; refreshToken: string }>
      findAdminById(id: string): Promise<Partial<IAdmin> | null>
  
      fetchAllDetail():Promise<{bookings:IBooking[],students:number,experts:number,meetings:IVideoCall[]}>
}