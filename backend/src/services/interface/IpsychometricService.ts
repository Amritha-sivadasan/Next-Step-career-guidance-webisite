import { IPsychometric } from "../../entities/PsychometricEntity";
export interface IPsychometricService {
    createQuestion(question:IPsychometric):Promise<void>
    findAllQuestions():Promise<IPsychometric[]>
}