import { IExpertRepository } from "../interface/IExpertRepository";
import { IExpert } from "../../entities/ExpertEntity";
import { Expert } from "../../models/expertSchema";

export default class ExpertRepository implements IExpertRepository {
  async findById(id: string): Promise<IExpert | null> {
    return Expert.findById(id);
  }
  async update(id: string, expert: Partial<IExpert>): Promise<IExpert | null> {
    try {
      const existingExpert = await Expert.findById(id);
      if (!existingExpert) {
        throw new Error("Student not found");
      }
      existingExpert.set(expert);
      const updatedExpert = await existingExpert.save();

      return updatedExpert;
    } catch (error) {
      console.log("Error occurred in update repository", error);
      throw error;
    }
  }
  async findAll(page: number, limit: number): Promise<IExpert[]> {
    const skip = (page - 1) * limit;
    return Expert.find().sort({ _id: -1 }).skip(skip).limit(limit).exec();
  }
  async findOne(email: string): Promise<IExpert | null> {
    return Expert.findOne({ email });
  }

  async create(expert: IExpert): Promise<IExpert> {
    try {
      const newExprt = new Expert(expert);
      return newExprt.save();
    } catch (error) {
      console.log("Error occur in create repository");
      throw error;
    }
  }
  async countDocuments(): Promise<number> {
    return Expert.countDocuments().exec();
  }
  async findUserByAuthId(authentication_id: string): Promise<IExpert | null> {
    return Expert.findOne({ authentication_id, is_active: true });
  }

  async findExpertBySubCatName(subCatName: string): Promise<IExpert[] | null> {
    return Expert.find({ subCatName, is_active: true,is_credential_validate:true });
  }
  async findAllExpert(): Promise<IExpert[]> {
    return Expert.find({ is_credential_validate: true, is_active: true });
  }
  async checkExpertStatus(id: string): Promise<IExpert | null> {
    try {

      const student = await Expert.findById(id);
      return student
      
    } catch (error) {
      throw error
    }
  }
}
