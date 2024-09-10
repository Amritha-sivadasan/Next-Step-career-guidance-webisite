import { ISlots } from "../../entities/SlotEntity";


export interface ISlotService {
    getSlotsById(id:string):Promise<ISlots[]|null>
    createSlots(id:string,slot:ISlots):Promise<ISlots>
    update(id:string,status:string):Promise<void>
    deleteSlot(id:string) :Promise<boolean>
}