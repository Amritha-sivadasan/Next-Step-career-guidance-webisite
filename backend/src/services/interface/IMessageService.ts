import { IMessage } from "../../entities/MessageEntity";

export interface IMessageService {
    saveMessage(message:IMessage, files: { [fieldname: string]: Express.Multer.File[] }):Promise<IMessage>
    deleteMessage(id:string):Promise<void>
    updateMessageStatus(chatId:string, userId:string):Promise<IMessage[]>
    updateMessageStatusUserOnline(messageId:string):Promise<IMessage>
}