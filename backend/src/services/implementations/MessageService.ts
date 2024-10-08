import { IMessageService } from "../interface/IMessageService";
import { IMessageRepository } from "../../repositories/interface/IMessageRepository";
import MessageRepository from "../../repositories/implementations/MessageRepository";
import { IMessage } from "../../entities/MessageEntity";
import { IChatRepository } from "../../repositories/interface/IChatRepository";
import ChatRepository from "../../repositories/implementations/ChatRepository";
import cloudinary from "../../config/cloudinaryConfig";

export default class MessageService implements IMessageService {
  private messageRepository: IMessageRepository;
  private chatRepository: IChatRepository;
  constructor() {
    this.messageRepository = new MessageRepository();
    this.chatRepository = new ChatRepository();
  }

  async saveMessage(
    message: IMessage,
    files: { [fieldname: string]: Express.Multer.File[] }
  ): Promise<IMessage> {
    try {
      if (files.file && files.file[0]) {
        const fileUploadResult = await cloudinary.uploader.upload(
          files.file[0].path,
          {
            folder: "file",
          }
        );
        message.file = fileUploadResult.secure_url;
      }

      if (files.audio && files.audio[0]) {
        const audioUploadResult = await cloudinary.uploader.upload(
          files.audio[0].path,
          {
            folder: "audio",
            resource_type: "video",
          }
        );
        message.audio = {
          url: audioUploadResult.secure_url,
          duration: audioUploadResult.duration,
        };
      }

      const messageDetails = await this.messageRepository.saveMesssage(message);
      await this.chatRepository.updateMesssage(
        message.chatId.toString(),
        messageDetails._id.toString()
      );
      await this.chatRepository.updateLatestMessge(
        message.chatId.toString(),
        messageDetails._id.toString()
      );
      return messageDetails;
    } catch (error) {
      throw error;
    }
  }

  async deleteMessage(id: string): Promise<IMessage|null> {
    try {
    const result=  await this.messageRepository.deleteMessage(id);
    return result
    } catch (error) {
      throw error;
    }
  }

  async updateMessageStatus(chatId: string, userId: string): Promise<IMessage[]> {
    try {
   const response=   await this.messageRepository.updateMessageStatus(chatId,userId)
   return response
    } catch (error) {
      throw error;
    }
  }

   async updateMessageStatusUserOnline(messageId: string): Promise<IMessage> {
     try {
       const response= await this.messageRepository.updateMessageUserOnline(messageId)
       if(!response){
        throw new Error('Message Not found')
       }  

        return  response

     } catch (error) {
       throw error
     }
   }


   async findById(id: string): Promise<IMessage|null> {
     try {
      const response= await this.messageRepository.findById(id)
      return response
      
     } catch (error) {
      throw error
     }
   }
}
