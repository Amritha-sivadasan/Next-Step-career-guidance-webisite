import { IChat } from "../../entities/ChatEntity";

export interface IChatRepository {
   createChat(chat:Partial<IChat>):Promise<void>
   fetchChatById(id:string):Promise<IChat[]>
   updateMesssage(id:string,message:string):Promise<IChat|null>
   fetOneChatByid(id:string):Promise<IChat|null>
   updateLatestMessge(id:string,message:string):Promise<void>
   checkUserExist(studentId:string,expertId:string):Promise<IChat|null>

}