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

  async createSlots(id: string, slot: ISlots): Promise<ISlots> {
    try {
      const existingSlots = await this.slotRepository.alreadyExist(
        id,
        slot.consultationDate
      );
    

      function parseTime(timeString: string): Date {
        const [hours, minutes] = timeString.split(":").map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
      }

      const minGap = 1 * 60 * 60 * 1000;

      const newSlotStart = parseTime(slot.consultationStartTime);

      for (const existingSlot of existingSlots) {
        const existingSlotEnd = parseTime(existingSlot.consultationStartTime);

        const gap = newSlotStart.getTime() - existingSlotEnd.getTime();

        if (gap < minGap) {
          throw new Error(
            "New slot must start at least one hour after the end of the existing slot."
          );
        }
      }

      // Create the new slot if validation passes
      const result = await this.slotRepository.create(slot);
      return result;
    } catch (error) {
      // Handle or rethrow the error as needed
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
