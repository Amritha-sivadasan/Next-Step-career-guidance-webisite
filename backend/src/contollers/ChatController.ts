import { IChatService } from "../services/interface/IChatService";
import ChatService from "../services/implementations/ChatService";
import { Response } from "express";
import { CustomRequest } from "../entities/jwtEntity";

class ChatController {
  private chatService: IChatService;
  constructor() {
    this.chatService = new ChatService();
  }

  public fetchChatById = async (
    req: CustomRequest,
    res: Response
  ): Promise<void> => {
    const userId = req.user?.userId;
    try {
      const result = await this.chatService.findAllChatById(userId!);
      res
        .status(200)
        .json({ success: true, data: result, messsage: "successufull" });
    } catch (error) {
      console.log("error in finding Chat");
      res
        .status(500)
        .json({ success: false, message: "cannot find any Chat", error });
    }
  };
}

export default new ChatController();
