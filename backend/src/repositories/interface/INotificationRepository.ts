import { IChatNotification } from "../../entities/NotificationEntity";

export interface INotificationRepository {
  addNotification(notification: Partial<IChatNotification>): Promise<IChatNotification>;
  findOne(userId: string, chatId: string):Promise<IChatNotification|null>
  incrementNotificationCount(notification: IChatNotification): Promise<IChatNotification|null>;
  updateNotificationCount(
    userId: string,
    chatId: string,
    count: number
  ): Promise<IChatNotification | null> 
}
