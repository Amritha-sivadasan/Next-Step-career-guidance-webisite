import { IExpertRepository } from "../../repositories/interface/IExpertRepository";
import { IExpert } from "../../entities/ExpertEntity";
import { IExpertService } from "../interface/IExpertService";
import ExpertRepository from "../../repositories/implementations/ExpertRepository";
import hashPassword from "../../utils/bcrypt";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import bcrypt from "bcryptjs";

// Helper function to transform Mongoose documents to plain objects and exclude the password
function excludePassword(expert: any): IExpert {
  const expertObj = expert.toObject();
  delete expertObj.password;
  return expertObj;
}

export default class ExpertService implements IExpertService {
  private expertRepository: IExpertRepository;
  
  constructor() {
    this.expertRepository = new ExpertRepository();
  }

  async getAllExperts(): Promise<IExpert[]> {
    const experts = await this.expertRepository.findAll();
    return experts.map(expert => excludePassword(expert));
  }

  async getExpertById(id: string): Promise<IExpert | null> {
    const expert = await this.expertRepository.findById(id);
    return expert ? excludePassword(expert) : null;
  }

  async createExpert(
    expert: IExpert
  ): Promise<{ expert: IExpert; accessToken: string; refreshToken: string }> {
    try {
      const hashedPassword = hashPassword(expert.password);
      const expertWithHashedPassword = {
        ...expert,
        password: hashedPassword,
      };
      const newExpert = await this.expertRepository.create(expertWithHashedPassword);
      const expertId = newExpert._id.toString();
      const accessToken = generateAccessToken(expertId, "expert");
      const refreshToken = generateRefreshToken(expertId, "expert");

      return { expert: excludePassword(newExpert), accessToken, refreshToken };
    } catch (error) {
      console.log("Error occurred in expert repository while creating an expert", error);
      throw error;
    }
  }

  async exitExpert(email: string): Promise<IExpert | null> {
    const expert = await this.expertRepository.findOne(email);
    return expert ? excludePassword(expert) : null;
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
    const accessToken = generateAccessToken(expertId, "expert");
    const refreshToken = generateRefreshToken(expertId, "expert");

    return { expert: excludePassword(expert), accessToken, refreshToken };
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
      const existingExpert = await this.expertRepository.findById(id);
      if (!existingExpert) {
        throw new Error("User not found");
      }
      const updatedData = {
        ...expert,
        is_data_entered: true,
      };

      const updatedExpert = await this.expertRepository.update(id, updatedData);
      return updatedExpert ? excludePassword(updatedExpert) : null;
    } catch (error) {
      console.log('Error during update expert', error);
      throw error;
    }
  }
}
