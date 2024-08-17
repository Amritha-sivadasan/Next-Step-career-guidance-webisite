import { IMessage } from "../../entities/MessageEntity";

export interface IMessageService {
    saveMessage(message:IMessage):Promise<IMessage>
}