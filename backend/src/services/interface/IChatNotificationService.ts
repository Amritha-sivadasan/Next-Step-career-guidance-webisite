import { IChatNotification } from "../../entities/NotificationEntity";

export interface IChatNotificationService {
    addNotification (notification:Partial<IChatNotification> ):Promise<IChatNotification|null>
    findOne(userId: string, chatId: string): Promise<IChatNotification | null> 
    incrementNotificationCount(notification: IChatNotification): Promise<IChatNotification | null>
    updateNotificationCount(
        userId: string,
        chatId: string,
        count: number
      ): Promise<IChatNotification | null> 
}