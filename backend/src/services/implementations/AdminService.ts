import { IAdmin } from "../../entities/AdminEntity";
import { IAdminRepository } from "../../repositories/interface/IAdminRepository";
import AdminRepository from "../../repositories/implementations/AdminRepository";
import { IAdminService } from "../interface/IAdminService";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import bcrypt from "bcryptjs";

export default class AdminService implements IAdminService {
  private adminRepository: IAdminRepository;

  constructor() {
    this.adminRepository = new AdminRepository();
  }

  async login(
    userName: string,
    password: string
  ): Promise<{ admin: IAdmin; accessToken: string; refreshToken: string }> {
    try {
      const admin = await this.adminRepository.findAdmin(userName);
      if (!admin) {
        throw new Error("Invalid username or password");
      }
      const isMatch = bcrypt.compare(password, admin.password);
      if (!isMatch) {
        throw new Error("Invalid username or password");
      }
   
      const adminId = admin._id.toString()
      const accessToken = generateAccessToken(adminId, "admin");
      const refreshToken = generateRefreshToken(adminId, "admin");
      return { admin, accessToken, refreshToken };
     
     

    } catch (error) {
    
      console.error("Login error:", error);
      throw new Error("An error occurred while trying to log in.");
    }
  }
}
