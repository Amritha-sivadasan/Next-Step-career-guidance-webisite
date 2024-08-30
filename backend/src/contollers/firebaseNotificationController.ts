import NotificationService from "../utils/NotificationService";
import { Request, Response } from "express";

export const sendFirebaseNotification = async (req: Request, res: Response) => {
  try {
    const { title, body, deviceToken ,role} = req.body;
    await NotificationService.sendNotification(deviceToken,title,body,role);
    res.status(200).json({ message: "Notification send successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
