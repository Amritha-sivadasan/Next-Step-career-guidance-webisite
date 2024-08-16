import mongoose, { Schema, model, Document } from "mongoose";
import { IChat } from "../entities/ChatEntity";

const ChatSchema: Schema = new Schema(
  {
    studentId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Student",
    },
    expertId: { type: mongoose.Types.ObjectId, required: true, ref: "Expert" },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    bookingId: { type: mongoose.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

export const Chat = model<IChat & Document>("Chat", ChatSchema);
