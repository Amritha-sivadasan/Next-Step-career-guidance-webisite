import { Server } from "socket.io";
import http from "http";
import ChatService from "../services/implementations/ChatService";
import ChatNotificationService from "../services/implementations/ChatNotificationService";
import { IChatNotification } from "../entities/NotificationEntity";
import { IStudent } from "../entities/StudentEntity";
import { IExpert } from "../entities/ExpertEntity";

interface OnlineUsers {
  [userId: string]: string; 
}

const onlineUsers: OnlineUsers = {};

export const createSocketServer = (server: http.Server) => {
  const chatSerive = new ChatService();
  const notificationService = new ChatNotificationService();
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("joinChat", async({ chatId, userId }) => {
      socket.join(chatId);
      onlineUsers[userId] = socket.id;
      if (chatId) {
        const notification = await notificationService.findOne(userId, chatId);
        if (notification) {
          await notificationService.updateNotificationCount(userId, chatId, 0);
        }
      }
    });

    socket.on("sendMessage", async ({ chatId, message }) => {
      io.to(chatId).emit("receiveMessage", message);
      const chat = await chatSerive.fetchChatById(chatId);
      if (chat) {
        const student = chat.studentId as IStudent;
        const expert = chat.expertId as IExpert;

        const recipientId =
          student._id.toString() === message.senderId
            ? expert._id.toString()
            : student._id.toString();

        if (!Object.keys(onlineUsers).includes(recipientId)) {
          const notification = await notificationService.findOne(
            recipientId,
            chatId
          );

          if (notification) {
            await notificationService.incrementNotificationCount(
              notification.toObject() as IChatNotification
            );
          } else {
            await notificationService.addNotification({
              userId: recipientId,
              chatId: chatId,
              count: 1,
            });
          }
        }
      }
    });

    socket.on("leaveChat", ({ chatId, userId }) => {
      socket.leave(chatId);
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId];
      }
    });

    socket.on("deleteMessage", ({ chatId, messageId }) => {
      io.to(chatId).emit("messageDeleted", messageId);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
      const userId = Object.keys(onlineUsers).find(
        (key) => onlineUsers[key] === socket.id
      );
      if (userId) {
        delete onlineUsers[userId];
        console.log(`User disconnected: UserId ${userId}`);
      }
    });
  });

  return io;
};
