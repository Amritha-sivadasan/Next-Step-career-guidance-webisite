import { IPsychometricService } from "../interface/IpsychometricService";
import { IPsychometricRepository } from "../../repositories/interface/IPsychometricRepository";
import { IPsychometric } from "../../entities/PsychometricEntity";
import PsychometricRepository from "../../repositories/implementations/PsychometricRepository";


export default class PsychometricService implements IPsychometricService{
    private psychometricRepositry:IPsychometricRepository
    constructor(){
        this.psychometricRepositry= new PsychometricRepository()
    }


  async  createQuestion(question: IPsychometric): Promise<void> {
        try {
          return  this.psychometricRepositry.createQuestrion(question)
            
        } catch (error) {
            throw error;
        }
    }

   async findAllQuestions(): Promise<IPsychometric[]> {
        try {
         const response= await this.psychometricRepositry.findAllQuestion()
            return response
        } catch (error) {
            throw error;
        }
    }
    async deleteQuestion(id: string): Promise<void> {
        try {
            return  this.psychometricRepositry.deletePsychometricQuestion(id)
        } catch (error) {
            throw error;
        }
    }
}