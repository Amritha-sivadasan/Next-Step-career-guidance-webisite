import { IFaqService } from "../interface/IFaqService";
import { IFaqRepository } from "../../repositories/interface/IFaqRepository";
import FaqRepository from "../../repositories/implementations/FaqRepository";
import { IFAQ } from "../../entities/FAQEntity";


export default class  FaqService implements IFaqService{
    private faqRepository :IFaqRepository
    constructor(){
        this.faqRepository=new  FaqRepository()
    }

    async saveQuestion(question: Partial<IFAQ>): Promise<IFAQ> {
        try {
            const  result= await this.faqRepository.saveQuestion(question)
            return result
        } catch (error) {
            throw error
        }
    }
    async fetchAllQuestion(): Promise<IFAQ[]> {
        try {
            const data= await this.faqRepository.fetChQuestion()
            return data      
        } catch (error) {
            throw error
        }
    }

    async updateAnswer(id: string, answer: string): Promise<void> {
        try {
         await  this.faqRepository.updateAnswer(id,answer)
            
        } catch (error) {
            throw error
        }
    }

}