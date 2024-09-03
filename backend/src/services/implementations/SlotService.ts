import { ISlots } from "../../entities/SlotEntity";
import { ISlotService } from "../interface/ISlotService";
import { ISlotRepository } from "../../repositories/interface/ISlotRepository";
import SlotRepository from "../../repositories/implementations/SlotRepository";
import ExpertService from "./ExpertService";
import { IExpertService } from "../interface/IExpertService";

export default class SlotService implements ISlotService {
  private slotRepository: ISlotRepository;
  private expertService: IExpertService;
  constructor() {
    this.slotRepository = new SlotRepository();
    this.expertService = new ExpertService();
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
      const existingSlots = await this.slotRepository.alreadyExist(
        slot.consultationDate
      );

      function parseString(timeString: string) {
        const [hours, minutes] = timeString.split(":").map(Number);
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
      }
      const newSlot = parseString(slot.consultationStartTime);

      for (let existSlot of existingSlots) {
        const startingTime = parseString(existSlot.consultationStartTime);
        const timeDifferenceHours =
          Math.abs(newSlot.getTime() - startingTime.getTime()) / (1000 * 60 * 60);
        if (timeDifferenceHours < 1) {
          throw new Error(
            "New slot must end at least one hour before the next slot starts. "
          );
        }
      }

      const result = await this.slotRepository.create(slot);
      return result;
    } catch (error) {
    
      throw error;
    }
  }
  async update(id: string, status: string): Promise<void> {
    try {
      const data = await this.slotRepository.updateStatus(id, status);
    } catch (error) {
      console.log("error in slot servive update", error);
      throw error;
    }
  }
  async deleteSlot(id: string): Promise<boolean> {
    try {
      const result = await this.slotRepository.delteSlot(id);
      return result;
    } catch (error) {
      console.log("error in slot servive delte", error);
      throw error;
    }
  }
}
