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
      const updatedData = {
        ...expert,
        is_data_entered: true,
      };
      existingExpert.set(updatedData);
      const updatedExpert = await existingExpert.save();

      return updatedExpert;
    } catch (error) {
      console.log("Error occurred in update repository", error);
      throw error;
    }
  }
  async findAll(): Promise<IExpert[]> {
    return Expert.find();
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


  async findUserByAuthId(authentication_id: string): Promise<IExpert | null> {
    return Expert.findOne({ authentication_id });
  }

}
