import { IChatService } from "../interface/IChatService";
import { IChatRepository } from "../../repositories/interface/IChatRepository";
import { IChat } from "../../entities/ChatEntity";
import ChatRepository from "../../repositories/implementations/ChatRepository";


export default class ChatService implements IChatService{
    private chatRepository :IChatRepository

    constructor(){
        this.chatRepository=new ChatRepository()
    }

    async findAllChatById(id: string): Promise<IChat[]> {
        try {
          const result = await this.chatRepository.fetchChatById(id)
          return result  
        } catch (error) {
            throw error
        }
    }
}