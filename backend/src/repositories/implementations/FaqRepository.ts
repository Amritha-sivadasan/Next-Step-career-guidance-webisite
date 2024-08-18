import { IFaqRepository } from "../interface/IFaqRepository";
import { IFAQ } from "../../entities/FAQEntity";
import { FAQ } from "../../models/FAQSchema";

export default class FaqRepository implements IFaqRepository {
  async saveQuestion(question: Partial<IFAQ>): Promise<IFAQ> {
    try {
      const newquestion = new FAQ(question);
      return await newquestion.save();
    } catch (error) {
      throw error;
    }
  }

  async fetChQuestion(): Promise<IFAQ[]> {
    try {
      const result = await FAQ.find().sort({ _id: -1 }).populate("studentId");
      return result;
    } catch (error) {
      throw error;
    }
  }
  async updateAnswer(id: string, answer: string): Promise<void> {
    try {
      await  FAQ.findByIdAndUpdate(id,{answer:answer})
    } catch (error) {
      throw error;
    }
  }
}
