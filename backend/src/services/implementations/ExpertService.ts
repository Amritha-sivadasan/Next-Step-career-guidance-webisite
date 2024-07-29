import { IExpertRepository } from "../../repositories/interface/IExpertRepository";
import { IExpert } from "../../entities/ExpertEntity";
import { IExpertService } from "../interface/IExpertService";
import ExpertRepository from "../../repositories/implementations/ExpertRepository";
import hashPassword from "../../utils/bcrypt";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import bcrypt from "bcryptjs";
import cloudinary from "../../config/cloudinaryConfig";

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
    return experts.map((expert) => excludePassword(expert));
  }

  async getExpertById(id: string): Promise<IExpert | null> {
    const expert = await this.expertRepository.findById(id);
    return expert ? excludePassword(expert) : null;
  }

  async createExpert(
    expert: IExpert
  ): Promise<{ expert: IExpert; accessToken: string; refreshToken: string }> {
    try {
      let hashedPassword=""
       if(expert.password!==""){
        hashedPassword = hashPassword(expert.password);
       }
       const expertWithHashedPassword = {
         ...expert,
         password: hashedPassword,
       };
    
      const newExpert = await this.expertRepository.create(
        expertWithHashedPassword
      );
      const expertId = newExpert._id.toString();
      const accessToken = generateAccessToken(expertId, "expert");
      const refreshToken = generateRefreshToken(expertId, "expert");

      return { expert: excludePassword(newExpert), accessToken, refreshToken };
    } catch (error) {
      console.log(
        "Error occurred in expert repository while creating an expert",
        error
      );
      throw error;
    }
  }

  async existsExpert(email: string): Promise<IExpert | null> {
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
    const expertId = expert._id.toString();

    await this.expertRepository.update(expertId, expert);
  }

  async updateExpertData(
    id: string,
    expert: Partial<IExpert>,
    files: { [fieldname: string]: Express.Multer.File[] }
  ): Promise<IExpert | null> {
    try {
      const existingExpert = await this.expertRepository.findById(id);
      if (!existingExpert) {
        throw new Error("User not found");
      }


      let profile_picture = existingExpert.profile_picture;
      if (files.profilePicture && files.profilePicture[0]) {
        const result = await cloudinary.uploader.upload(
          files.profilePicture[0].path,
          {
            folder: "profile_pictures",
          }
        );
    
        profile_picture = result.secure_url;
      }

      let credentialImage;
      if (files.credential && files.credential[0]) {
        const result = await cloudinary.uploader.upload(
          files.credential[0].path,
          {
            folder: "credential",
          }
        );
        
        credentialImage = result.secure_url;
      }
      const updatedData = {
        ...expert,
        is_data_entered: true,
        profile_picture,
        credential:credentialImage,
      
      };
      const updatedExpert = await this.expertRepository.update(id, updatedData);
      return updatedExpert ? excludePassword(updatedExpert) : null;
    } catch (error) {
      console.log("Error during update expert", error);
      throw error;
    }
  }
}
