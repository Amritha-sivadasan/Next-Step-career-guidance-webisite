import { Schema, model, Document } from "mongoose";
import { ISlots } from "../entities/SlotEntity";

const SlotSchema: Schema = new Schema({
  expertId: { type: Schema.Types.ObjectId, required: true },
  consultationStartTime: { type: String, required: true },
  consultationEndTime: { type: String, required: true },
  consultationDate: { type: String, required: true },
  slotStatus: { type: String, required: true }
});

export const Slot = model<ISlots & Document>("Slot", SlotSchema);
