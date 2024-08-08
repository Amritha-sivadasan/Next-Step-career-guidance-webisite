import { ISlots } from "../../entities/SlotEntity";


export interface ISlotRepository{
    create(slots:ISlots):Promise <ISlots>
    findById(id:string):Promise<ISlots|null>
    findByExpertId(id:string):Promise<ISlots[]|null>
}