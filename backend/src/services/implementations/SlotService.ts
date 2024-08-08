import { ISlots } from "../../entities/SlotEntity";
import { ISlotService } from "../interface/ISlotService";
import { ISlotRepository } from "../../repositories/interface/ISlotRepository";
import SlotRepository from "../../repositories/implementations/SlotRepository";

export default class SlotService implements ISlotService {
  private slotRepository: ISlotRepository;
  constructor() {
    this.slotRepository = new SlotRepository();
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
      throw error;
    }
  }
}
