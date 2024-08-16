import { IChat } from "../../entities/ChatEntity";

export interface IChatRepository {
   createChat(chat:Partial<IChat>):Promise<void>
   fetchChatById(id:string):Promise<IChat[]>

}