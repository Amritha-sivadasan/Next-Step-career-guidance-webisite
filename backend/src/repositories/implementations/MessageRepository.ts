import { IMessageRepository } from "../interface/IMessageRepository";
import { IMessage } from "../../entities/MessageEntity";
import { Message } from "../../models/messageModel";


export default class MessageRepository implements IMessageRepository{
    async saveMesssage(message: Partial<IMessage>): Promise<IMessage> {
        try {
            const newMessage= new Message(message)
            const savedMessage = await newMessage.save();
             const populatedMessage = await Message.findById(savedMessage._id).populate('chatId').exec();
    

             return populatedMessage!;
            
        } catch (error) {
            throw error
        }
    }
    async deleteMessage(messageId: string): Promise<void> {
        try {
        const res= await Message.findByIdAndUpdate(messageId,{is_delete:true})
            
        } catch (error) {
            throw error 
        }
    }

    async getMessageById(id: string): Promise<IMessage|null> {
        try {
            return await Message.findById(id)
           
            
        } catch (error) {
            throw error 
        }
    }
}