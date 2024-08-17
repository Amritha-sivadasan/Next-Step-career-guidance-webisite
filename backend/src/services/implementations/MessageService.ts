import { IMessageService } from "../interface/IMessageService";
import { IMessageRepository } from "../../repositories/interface/IMessageRepository";
import MessageRepository from "../../repositories/implementations/MessageRepository";
import { IMessage } from "../../entities/MessageEntity";
import { IChatRepository } from "../../repositories/interface/IChatRepository";
import ChatRepository from "../../repositories/implementations/ChatRepository";

export default class MessageService implements IMessageService{
    private messageRepository :IMessageRepository
    private chatRepository :IChatRepository
    constructor(){
        this.messageRepository = new MessageRepository()
        this.chatRepository= new ChatRepository()
    }

    async saveMessage(message: IMessage): Promise<IMessage> {
        try {
        const messageDetails = await this.messageRepository.saveMesssage(message)
       await  this.chatRepository.updateMesssage(message.chatId.toString(),messageDetails._id.toString())   
         return messageDetails
            
        } catch (error) {
            throw error
        }
    }
}