import { IMessageRepository } from "../interface/IMessageRepository";
import { IMessage } from "../../entities/MessageEntity";
import { Message } from "../../models/messageModel";


export default class MessageRepository implements IMessageRepository{
    async saveMesssage(message: Partial<IMessage>): Promise<IMessage> {
        try {
            const newMessage= new Message(message)
             return await newMessage.save()
            
        } catch (error) {
            throw error
        }
    }
}