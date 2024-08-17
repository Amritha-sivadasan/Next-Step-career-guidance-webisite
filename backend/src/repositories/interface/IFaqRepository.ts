import { IFAQ } from "../../entities/FAQEntity";

export interface IFaqRepository {
    saveQuestion(question:Partial<IFAQ>):Promise<IFAQ>
    fetChQuestion():Promise<IFAQ[]>
}