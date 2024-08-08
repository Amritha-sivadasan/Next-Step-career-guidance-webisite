import { ISlots } from "../../entities/SlotEntity";


export interface ISlotService {
    getSlotsById(id:string):Promise<ISlots[]|null>
    createSlots(slot:ISlots):Promise<ISlots>
}