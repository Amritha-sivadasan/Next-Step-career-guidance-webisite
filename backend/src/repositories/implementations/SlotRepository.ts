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
      const result= Slot.find({expertId:expertId,slotStatus:"available"})
      
      return result 
  }
     
  async updateStatus(id:string,slotStatus: string): Promise<void> {
    try {
    await  Slot.findByIdAndUpdate(id,{$set:{slotStatus:slotStatus}})
    } catch (error) {
      console.log('error',error)
      throw error
    }
   
    
}

async alreadyExist(id:string, date: string): Promise<ISlots[] > {
  try {
    const result= await Slot.find({expertId: id,consultationDate:date})
    return result
    
    
  } catch (error) {
    throw error
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
