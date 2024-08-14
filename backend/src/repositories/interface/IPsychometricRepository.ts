import { IPsychometric } from "../../entities/PsychometricEntity";

export interface IPsychometricRepository{
    createQuestrion(question:IPsychometric):Promise<void>
    findAllQuestion():Promise<IPsychometric[]>

}