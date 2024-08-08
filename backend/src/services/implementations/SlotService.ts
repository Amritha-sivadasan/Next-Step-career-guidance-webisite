import { ISlots } from "../../entities/SlotEntity";
import { ISlotService } from "../interface/ISlotService";
import { ISlotRepository } from "../../repositories/interface/ISlotRepository";
import SlotRepository from "../../repositories/implementations/SlotRepository";
import ExpertService from "./ExpertService";
import { IExpertService } from "../interface/IExpertService";

export default class SlotService implements ISlotService {
  private slotRepository: ISlotRepository;
  private expertService:IExpertService
  constructor() {
    this.slotRepository = new SlotRepository();
    this.expertService= new ExpertService()
  }
  async getSlotsById(id: string): Promise<ISlots[] | null> {
    try {
      const result = await this.slotRepository.findByExpertId(id);

      return result;
    } catch (error) {
      throw error;
    }
  }

  async createSlots(slot: ISlots): Promise<ISlots> {
  
    try {
   
      const result = await this.slotRepository.create(slot);
      return result;
    } catch (error) {
    console.log('error in slot servive',error)
      throw error;
    }
  }
  async update(id: string, status: string): Promise<void> {
    try {
      const data= await this.slotRepository.updateStatus(id,status)
      
    } catch (error) {
      console.log('error in slot servive update',error)
      throw error;
    }
  }
  async deleteSlot(id: string): Promise<boolean> {
    try {
      const result = await this.slotRepository.delteSlot(id)
      return result
    } catch (error) {
      console.log('error in slot servive delte',error)
      throw error;
    }
  }
}
