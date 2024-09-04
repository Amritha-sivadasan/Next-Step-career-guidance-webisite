import { IMessage } from "../../entities/MessageEntity";

export  interface IMessageRepository {
  saveMesssage(message:Partial<IMessage>):Promise<IMessage>    
  deleteMessage(messageId:string):Promise<IMessage|null>
  getMessageById(id:string):Promise<IMessage|null>
  updateMessageStatus( chatId:string,userId:string):Promise<IMessage[]>
  updateMessageUserOnline(messageId:string):Promise<IMessage|null>
  findById(id:string):Promise<IMessage|null>
}