import mongoose, { model, Schema, Document } from "mongoose";

import { IMessage } from "../entities/MessageEntity";

const MessageSchema: Schema = new Schema(
  {
    chatId: { type: mongoose.Types.ObjectId, required: true, ref:'Chat' },
    senderId: { type: mongoose.Types.ObjectId, required: true },
    text: { type: String, trim: true },
    audio: {
      url: String,
      duration: Number,
    },
    file:{type:String},
  
    timestamp: {
      type: Date,
      default: Date.now,
    },
    is_delete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Message = model<IMessage & Document>("Message", MessageSchema);
