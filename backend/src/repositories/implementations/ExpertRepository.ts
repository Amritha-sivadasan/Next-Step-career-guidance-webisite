import { IExpertRepository } from "../interface/IExpertRepository";
import { IExpert } from "../../entities/ExpertEntity";
import { Expert } from "../../models/expertSchema";

export default class ExpertRepository implements IExpertRepository {
  async findById(id: string): Promise<IExpert | null> {
    throw new Error("Method not implemented.");
  }
  async update(id: string, student: Partial<IExpert>): Promise<IExpert | null> {
    throw new Error("Method not implemented.");
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
}
