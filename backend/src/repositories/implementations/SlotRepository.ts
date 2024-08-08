import { ISlots } from "../../entities/SlotEntity";
import { ISlotRepository } from "../interface/ISlotRepository";
import { Slot } from "../../models/slotModel";

export default class SlotRepository implements ISlotRepository {
  async create(slot: ISlots): Promise<ISlots> {
    const newSlot = new Slot(slot);
    return newSlot.save()
  }

  async findById(id: string): Promise<ISlots | null> {
      return Slot.findById(id)
  }
  async findByExpertId(expertId: string): Promise<ISlots[] | null> {
      return Slot.find({expertId,slotStatus:"Available"})
  }
     
  async updateStatus(id:string,slotStatus: string): Promise<void> {
    try {
    await  Slot.findByIdAndUpdate(id,{$set:{slotStatus:slotStatus}})
    } catch (error) {
      console.log('error',error)
    }
   
    
}
async delteSlot(id: string): Promise<boolean> {
  const data= await Slot.findByIdAndDelete(id)
  if(data){
     return true
  }
  return false
}
}
