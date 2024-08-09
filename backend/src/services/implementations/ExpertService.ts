import { IExpertRepository } from "../../repositories/interface/IExpertRepository";
import { CredentialStatus, IExpert } from "../../entities/ExpertEntity";
import { IExpertService } from "../interface/IExpertService";
import ExpertRepository from "../../repositories/implementations/ExpertRepository";
import hashPassword from "../../utils/bcrypt";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import bcrypt from "bcryptjs";
import cloudinary from "../../config/cloudinaryConfig";
import { SendMail } from "../../utils/sendOtp";
import { resourceUsage } from "process";

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

  async getAllExperts(
    page: number,
    limit: number
  ): Promise<{
    items: IExpert[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
  }> {
    const experts = await this.expertRepository.findAll(page, limit);
    const totalCount = await this.expertRepository.countDocuments();
    return {
      items: experts.map((expert) => excludePassword(expert)),
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    };
  }

  async getExpertById(id: string): Promise<IExpert | null> {
    const expert = await this.expertRepository.findById(id);
    return expert ? excludePassword(expert) : null;
  }

  async createExpert(
    expert: IExpert
  ): Promise<{ expert: IExpert; accessToken: string; refreshToken: string }> {
    try {
      let hashedPassword = "";
      if (expert.password !== "") {
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

  async verifyExpert(id: string): Promise<Boolean> {
    try {
      const expert = await this.expertRepository.findById(id);
      if (!expert) {
        throw new Error("expert not found");
      }
      expert.is_credential_validate = CredentialStatus.True;
      const result = await this.expertRepository.update(id, expert);
      const reason = "Your Next Step Account is  verifies";
      const subject = "Your Next-Step credential is verified";
      await SendMail(subject, expert.email, reason);
      if (result) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  async rejectExpert(id: string, reason: string): Promise<boolean> {
    try {
      const expert = await this.expertRepository.findById(id);
      if (expert) {
        expert.is_credential_validate = CredentialStatus.False;
        const result = await this.expertRepository.update(id, expert);
        const subject = "Rejection mail for your Next-Step Registration";
        await SendMail(subject, expert.email, reason);
        if (result) {
          return true;
        }
      }
      return false;
    } catch (error) {
      throw error;
    }
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
      if (existingExpert.credential) {
        credentialImage = existingExpert.credential;
      }
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
        credential: credentialImage,
      };
      const updatedExpert = await this.expertRepository.update(id, updatedData);
      return updatedExpert ? excludePassword(updatedExpert) : null;
    } catch (error) {
      console.log("Error during update expert", error);
      throw error;
    }
  }

  async findExpertBySubCatName(subCatName: string): Promise<IExpert[] | null> {
    try {
      const data = await this.expertRepository.findExpertBySubCatName(
        subCatName
      );

      return data;
    } catch (error) {
      throw error;
    }
  }

  async fetchAllExpert(): Promise<IExpert[] | null>{
    try {
      const data = await this.expertRepository.findAllExpert()
        return data
    } catch (error) {
      throw error;
    }
  }
}
