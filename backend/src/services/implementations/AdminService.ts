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
      throw new Error("An error occurred while trying to log in.");
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
      throw new Error("An error occurred while trying to find the admin.");
    }
  }
}
