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

  async saveMessage(message: IMessage, files: { [fieldname: string]: Express.Multer.File[]}): Promise<IMessage> {
    try {
      console.log('files ',files)
      if (files.file && files.file[0]) {
        const fileUploadResult = await cloudinary.uploader.upload(files.file[0].path, {
          folder: 'file', 
        });
        message.file = fileUploadResult.secure_url; 
      }

      if (files.audio && files.audio[0]) {
        const audioUploadResult = await cloudinary.uploader.upload(files.audio[0].path, {
          folder: 'audio', 
          resource_type: 'video', 
        });
        console.log('audioUploadResult',audioUploadResult.secure_url)
        message.audio = { url: audioUploadResult.secure_url, duration: audioUploadResult.duration }
      }
       
      console.log('Updated message object:', message);

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

  async deleteMessage(id: string): Promise<void> {
    try {

      await this.messageRepository.deleteMessage(id);
    } catch (error) {
      throw error;
    }
  }
}
