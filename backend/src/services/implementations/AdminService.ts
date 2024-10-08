import { IAdmin } from "../../entities/AdminEntity";
import { IAdminRepository } from "../../repositories/interface/IAdminRepository";
import AdminRepository from "../../repositories/implementations/AdminRepository";
import { IAdminService } from "../interface/IAdminService";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import bcrypt from "bcryptjs";
import { IBooking } from "../../entities/BookingEntity";
import { IExpert } from "../../entities/ExpertEntity";
import { IStudent } from "../../entities/StudentEntity";
import { IVideoCall } from "../../entities/VideoCallEntity";
import { IBookingRepository } from "../../repositories/interface/IBookingRepository";
import BookingRepository from "../../repositories/implementations/BookingRepository";
import { IStudentRepository } from "../../repositories/interface/IStudentRepository";
import StudentRepository from "../../repositories/implementations/StudentRepository";
import { IExpertRepository } from "../../repositories/interface/IExpertRepository";
import ExpertRepository from "../../repositories/implementations/ExpertRepository";
import { IVideoCallRepository } from "../../repositories/interface/IVideoCallRepository";
import VideoCallRepository from "../../repositories/implementations/VideoCallRepository";

export default class AdminService implements IAdminService {
  private adminRepository: IAdminRepository;
  private bookingRepository:IBookingRepository
  private studentRepository:IStudentRepository
  private expertRespository:IExpertRepository
  private videoCallrepository:IVideoCallRepository

  constructor() {
    this.adminRepository = new AdminRepository();
    this.bookingRepository= new BookingRepository()
    this.studentRepository= new StudentRepository()
    this.expertRespository= new ExpertRepository()
    this.videoCallrepository= new VideoCallRepository()
  }

  async login(
    userName: string,
    password: string
  ): Promise<{ user_name: string; accessToken: string; refreshToken: string }> {
    try {
      const admin = await this.adminRepository.findAdmin(userName);
      if (!admin) {
        throw new Error("Invalid username or password");
      }
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        throw new Error("Invalid username or password");
      }
      const adminId = admin._id.toString();
      const accessToken = generateAccessToken(adminId, "admin");
      const refreshToken = generateRefreshToken(adminId, "admin")
      const {user_name}=admin

      return {user_name,accessToken, refreshToken };
    } catch (error) {
      console.error("Login error:", error);
      throw  error
    }
  }

  async findAdminById(id: string): Promise<Partial<IAdmin> | null> {
    try {
      const result = await this.adminRepository.findById(id);
      if (!result) {
        throw new Error("Admin not found");
      }
      return result;
    } catch (error) {
      console.error("Find admin error:", error);
      throw  error
    }
  }

 async fetchAllDetail(): Promise<{ bookings: IBooking[]; students: number; experts:number; meetings: IVideoCall[]; }> {
   try {
    const allbookings= await this.bookingRepository.fetchAllBookings()
    const allstudents=await this.studentRepository.countDocuments()
    const allexpert=await this.expertRespository.countDocuments()
    const allvideoCall=await this.videoCallrepository.findAllVideoCall()

  return {
    bookings:allbookings,
    students:allstudents,
    experts:allexpert,
    meetings:allvideoCall
  }
    
   } catch (error) {
    throw  error
   }
 }
   
}
