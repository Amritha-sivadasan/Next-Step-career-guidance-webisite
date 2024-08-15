import { IPsychometric } from "../../entities/PsychometricEntity";
import { IStudent } from "../../entities/StudentEntity";
export interface IPsychometricService {
    createQuestion(question:IPsychometric):Promise<void>
    findAllQuestions():Promise<IPsychometric[]>
    deleteQuestion(id:string):Promise<void>
    submitAnswer(id:string,answers:string[]):Promise<IStudent|null>
}