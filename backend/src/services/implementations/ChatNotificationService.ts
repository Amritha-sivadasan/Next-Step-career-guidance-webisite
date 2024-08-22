import { IChatNotification } from "../../entities/NotificationEntity";
import { INotificationRepository } from "../../repositories/interface/INotificationRepository";
import ChatNotificationRepository from "../../repositories/implementations/NotificationRepository";
import { IChatNotificationService } from "../interface/IChatNotificationService";

export default class ChatNotificationService
  implements IChatNotificationService
{
  private chatNotificationRepository: INotificationRepository;
  constructor() {
    this.chatNotificationRepository = new ChatNotificationRepository();
  }

async addNotification(notification: Partial<IChatNotification>): Promise<IChatNotification | null> {
  return this.chatNotificationRepository.addNotification(notification);
}

  async findOne(userId: string, chatId: string): Promise<IChatNotification | null> {
      try {
        return this.chatNotificationRepository.findOne(userId, chatId);

      } catch (error) {
        throw error
      }
  }

  async incrementNotificationCount(notification: IChatNotification): Promise<IChatNotification | null> {
    return this.chatNotificationRepository.incrementNotificationCount(notification);
  }
   async updateNotificationCount(userId: string, chatId: string, count: number): Promise<IChatNotification | null> {
    return this.chatNotificationRepository.updateNotificationCount(userId,chatId,count);
   }
}
