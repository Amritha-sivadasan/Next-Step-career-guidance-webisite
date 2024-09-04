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
    async deleteMessage(messageId: string): Promise<IMessage|null> {
        try {
        const response= await Message.findByIdAndUpdate(messageId,{is_delete:true},{new:true}).populate('chatId').exec()
        return response
            
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
    async updateMessageStatus(chatId: string, userId: string): Promise<IMessage[]> {
        try {
        await Message.updateMany(
                { chatId, senderId: { $ne: userId }, status: 'sent' },
                { $set: { status: 'seen' } }
              ).exec()
              return Message.find({ chatId, senderId: { $ne: userId }, status: 'seen' }).exec();
             
            
        } catch (error) {
            throw error 
        }
    }

    async findById(id: string): Promise<IMessage|null> {
        try {
        const response= await Message.findById(id)
        return response

        } catch (error) {
            throw error 
        }
    }
     
    
    async updateMessageUserOnline(messageId: string): Promise<IMessage|null> {
        try {
        const result = await Message.findByIdAndUpdate(messageId,{$set:{status:'seen'}}, { new: true } ).exec()

        return result
            
        } catch (error) {
            throw error 
        }
    }
}