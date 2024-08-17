import { IChatRepository } from "../interface/IChatRepository";
import { IChat } from "../../entities/ChatEntity";
import { Chat } from "../../models/chatSchema";

export default class ChatRepository implements IChatRepository {
  async createChat(chat: Partial<IChat>): Promise<void> {
    try {
      const newChat = new Chat(chat);
      await newChat.save();
    } catch (error) {
      throw error;
    }
  }

  async fetchChatById(id: string): Promise<IChat[]> {
    try {
      const result = await Chat.find({
        $or: [{ studentId: id }, { expertId: id }],
      })
        .populate("studentId")
        .populate("expertId");
      return result;
    } catch (error) {
      throw error;
    }
  }
  async updateMesssage(id: string, messageId: string): Promise<IChat | null> {
    try {
      const chat = await Chat.findByIdAndUpdate(id, {
        $addToSet: { messages: messageId },
      });
      return chat;
    } catch (error) {
      throw error;
    }
  }
  async fetOneChatByid(id: string): Promise<IChat | null> {
    try {
      return await Chat.findById(id)
        .populate("studentId")
        .populate("expertId")
        .populate("messages");
    } catch (error) {
      throw error;
    }
  }
}
