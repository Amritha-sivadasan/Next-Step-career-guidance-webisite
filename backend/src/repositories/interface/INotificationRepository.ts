import { IChatNotification } from "../../entities/NotificationEntity";

export interface INotificationRepository {
  addNotification(notification: Partial<IChatNotification>): Promise<IChatNotification>;
  findOne(userId: string, chatId: string):Promise<IChatNotification|null>
  updateNotification(notification: IChatNotification): Promise<IChatNotification|null>;
}
