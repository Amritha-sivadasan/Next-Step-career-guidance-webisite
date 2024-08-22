import { IChatNotification } from "../../entities/NotificationEntity";
import { INotificationRepository } from "../interface/INotificationRepository";
import { ChatNotification } from "../../models/notificationModel";

export default class ChatNotificationRepository
  implements INotificationRepository
{
  async addNotification(
    notification:Partial<IChatNotification> 
  ): Promise<IChatNotification> {
    try {
      const newNotification = new ChatNotification(notification);
      return newNotification.save();
    } catch (error) {
      throw error;
    }
  }

  async findOne(
    userId: string,
    chatId: string
  ): Promise<IChatNotification | null> {
    try {
      const result = await ChatNotification.findOne({ userId, chatId }).exec()
      return result;
    } catch (error) {
      throw error;
    }
  }

  async incrementNotificationCount(
    notification: IChatNotification
  ): Promise<IChatNotification | null> {
    try {
      const result = ChatNotification.findOneAndUpdate(
        { userId: notification.userId, chatId: notification.chatId },
        { $inc: { count: 1 } },
        { new: true }
      ).exec();

      return result;
    } catch (error) {
        throw error
    }
  }
 
  async updateNotificationCount(
    userId: string,
    chatId: string,
    count: number
  ): Promise<IChatNotification | null> {
    try {
      const result = await ChatNotification.findOneAndUpdate(
        { userId, chatId },
        { count },
        { new: true }
      ).exec();

      return result;
    } catch (error) {
      throw error;
    }
  }
}
