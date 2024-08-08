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
  async findByExpertId(id: string): Promise<ISlots[] | null> {
      return Slot.findById(id)
  }
}
