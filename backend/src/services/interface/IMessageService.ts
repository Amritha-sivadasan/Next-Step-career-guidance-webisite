import { IMessage } from "../../entities/MessageEntity";

export interface IMessageService {
    saveMessage(message:IMessage, files: { [fieldname: string]: Express.Multer.File[] }):Promise<IMessage>
    deleteMessage(id:string):Promise<IMessage|null>
    updateMessageStatus(chatId:string, userId:string):Promise<IMessage[]>
    updateMessageStatusUserOnline(messageId:string):Promise<IMessage>
    findById(id:string):Promise<IMessage|null>
}