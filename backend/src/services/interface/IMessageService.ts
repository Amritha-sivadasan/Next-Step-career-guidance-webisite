import { IMessage } from "../../entities/MessageEntity";

export interface IMessageService {
    saveMessage(message:IMessage):Promise<IMessage>
    deleteMessage(id:string):Promise<void>

}