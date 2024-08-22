import { Request, Response } from "express";
import { IChatNotificationService } from "../services/interface/IChatNotificationService";
import ChatNotificationService from "../services/implementations/ChatNotificationService";

class ChatNotificationController {
  private chatNotificationService: IChatNotificationService;
  constructor() {
    this.chatNotificationService = new ChatNotificationService();
  }

  public addNotification = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const resposne = await this.chatNotificationService.addNotification(
        req.body
      );
      res.status(200).json({
        success: true,
        message: "Message send successfully",
        data: resposne,
      });
    } catch (error) {
      res.status(500).json({
        message: "something went wrong on ",
        success: false,
      });
    }
  };

  public findNotificationById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { chatId, userId } = req.query;

      if (!chatId || !userId) {
        res.status(400).json({
          success: false,
          message: "chatId and userId are required",
        });
        return;
      }

      const chatIdStr = chatId as string;
      const userIdStr = userId as string;

      const resposne = await this.chatNotificationService.findOne(
        userIdStr,
        chatIdStr
      );
      res.status(200).json({
        success: true,
        message: "Message send successfully",
        data: resposne,
      });
    } catch (error) {
      res.status(500).json({
        message: "something went wrong on finding notification",
        success: false,
      });
    }
  };
}

export default new ChatNotificationController();
