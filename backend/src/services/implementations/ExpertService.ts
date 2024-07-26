import { IExpertRepository } from "../../repositories/interface/IExpertRepository";
import { IExpert } from "../../entities/ExpertEntity";
import { IExpertService } from "../interface/IExpertService";
import ExpertRepository from "../../repositories/implementations/ExpertRepository";
import hashPassword from "../../utils/bcrypt";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import bcrypt from "bcryptjs";

export default class ExpertService implements IExpertService {
  private expertRepository: IExpertRepository;
  constructor() {
    this.expertRepository = new ExpertRepository();
  }
  async getAllExprt(): Promise<IExpert[]> {
    return this.expertRepository.findAll();
  }

  async getExpertById(id: string): Promise<IExpert | null> {
    return this.expertRepository.findById(id);
  }

  async createdExpert(
    expert: IExpert
  ): Promise<{ expert: IExpert; accessToken: string; refreshToken: string }> {
    try {
      const hashedPassword = hashPassword(expert.password);
      const expertWithHashedPassword = { ...expert, password: hashedPassword };
      const newExpert = await this.expertRepository.create(
        expertWithHashedPassword
      );
      const expertId = newExpert._id.toString();
      const accessToken = generateAccessToken(expertId, "expert");
      const refreshToken = generateRefreshToken(expertId, "expert");

      return { expert: newExpert, accessToken, refreshToken };
    } catch (error) {
      console.log(
        "error occur in student repository while creating a student",
        error
      );

      throw error;
    }
  }

  async exitExpert(email: string): Promise<IExpert | null> {
    return this.expertRepository.findOne(email);
  }

  async login(
    email: string,
    password: string
  ): Promise<{ expert: IExpert; accessToken: string; refreshToken: string }> {
    const expert = await this.expertRepository.findOne(email);
    if (!expert) {
      throw new Error("Invalid email or password");
    }
    const isPasswordValid = bcrypt.compareSync(password, expert.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }
    const expertId = expert._id.toString();
    const accessToken = generateAccessToken(expertId, "student");
    const refreshToken = generateRefreshToken(expertId, "student");

    return { expert, accessToken, refreshToken };
  }

  async updatePassword(email: string, newPassword: string): Promise<void> {
    const expert = await this.expertRepository.findOne(email);
    if (!expert) {
      throw new Error("User not found");
    }

    const hashedPassword = hashPassword(newPassword);
    expert.password = hashedPassword;
    const userId = expert._id.toString();

    await this.expertRepository.update(userId, expert);
  }

  async updateExpertData(
    id: string,
    expert: Partial<IExpert>
  ): Promise<IExpert | null> {
    try {
      const userExist= await this.expertRepository.findById(id)
      if(!userExist){
        throw new Error("User not found");
      }
      const updatedData = {
        ...expert,
        is_data_entered: true,
      };
      return this.expertRepository.update(id, updatedData);
      
    } catch (error) {
      console.log('error during update student',error);
      throw error
    }
  }
}
