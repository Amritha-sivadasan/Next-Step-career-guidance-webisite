import { IMessage } from "../../entities/MessageEntity";

export  interface IMessageRepository {
  saveMesssage(message:Partial<IMessage>):Promise<IMessage>    

}