import { IChatNotification } from "../../entities/NotificationEntity";

export interface IChatNotificationService {
    addNotification (notification:Partial<IChatNotification> ):Promise<IChatNotification|null>
    findOne(userId: string, chatId: string): Promise<IChatNotification | null> 
    updateNotification(notification: IChatNotification): Promise<IChatNotification | null>
}