import { IPsychometricRepository } from "../interface/IPsychometricRepository";
import { Psychometric } from "../../models/psychometrictSchema";
import { IPsychometric } from "../../entities/PsychometricEntity";

export default class PsychometricRepository implements IPsychometricRepository {
  async createQuestrion(question: IPsychometric): Promise<void> {
    try {
      const newTest = new Psychometric(question);
      await newTest.save();
    } catch (error) {
      throw error;
    }
  }
  async findAllQuestion(): Promise<IPsychometric[]> {
    try {
      return Psychometric.find();
    } catch (error) {
      throw error;
    }
  }
  async deletePsychometricQuestion(id: string): Promise<void> {
      try {
         await Psychometric.findByIdAndDelete(id)
      } catch (error) {
        throw error;
      }
  }
}
