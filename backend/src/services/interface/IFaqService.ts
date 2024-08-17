import { IFAQ } from "../../entities/FAQEntity";

export interface IFaqService {
    saveQuestion(question:Partial<IFAQ>):Promise<IFAQ>
    fetchAllQuestion():Promise<IFAQ[]>
}