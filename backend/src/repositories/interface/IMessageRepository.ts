import { IMessage } from "../../entities/MessageEntity";

export  interface IMessageRepository {
  saveMesssage(message:Partial<IMessage>):Promise<IMessage>    
  deleteMessage(messageId:string):Promise<void>
  getMessageById(id:string):Promise<IMessage|null>  
}