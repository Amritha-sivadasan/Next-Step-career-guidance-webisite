import { Server } from "socket.io";
import http from "http";
import ChatService from "../services/implementations/ChatService";
import ChatNotificationService from "../services/implementations/ChatNotificationService";
import { IChatNotification } from "../entities/NotificationEntity";
import { IStudent } from "../entities/StudentEntity";
import { IExpert } from "../entities/ExpertEntity";
import { sendFirebaseNotification } from "../contollers/firebaseNotificationController";
import NotificationService from "../utils/NotificationService";
import MessageService from "../services/implementations/MessageService";
// import { sendPushNotification } from "../utils/google-auth-token";

interface OnlineUsers {
  [userId: string]: string;
}

const onlineUsers: OnlineUsers = {};

export const createSocketServer = (server: http.Server) => {
  const chatSerive = new ChatService();
  const notificationService = new ChatNotificationService();
  const  messageService= new MessageService()
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("joinChat", async ({ chatId, userId }) => {
      socket.join(chatId);
      onlineUsers[userId] = socket.id;
     const result= await messageService.updateMessageStatus(chatId,userId)
      io.to(chatId).emit('seenMessage',userId,result)
      if (chatId) {
        const notification = await notificationService.findOne(userId, chatId);
        if (notification) {
          await notificationService.updateNotificationCount(userId, chatId, 0);
        }
      }
    });
   
      
  

    socket.on("sendMessage", async ({ chatId, message }) => {
     
      
      const chat = await chatSerive.fetchChatById(chatId);
    
      if (chat) {
        const student = chat.studentId as IStudent;
        const expert = chat.expertId as IExpert;

        const recipientId =
          student._id.toString() === message.senderId
            ? expert._id.toString()
            : student._id.toString();
            
           
        if (!Object.keys(onlineUsers).includes(recipientId)) {
          
          const notificationExist = await notificationService.findOne(
            recipientId,
            chatId
          );
          let notification;
          if (notificationExist) {
            notification = await notificationService.incrementNotificationCount(
              notificationExist.toObject() as IChatNotification
            );
          } else {
            notification = await notificationService.addNotification({
              userId: recipientId,
              chatId: chatId,
              count: 1,
            });
          }
         
      
          io.emit("notification", notification,message);
         
        }else{
          const  resultMessage=  await messageService.updateMessageStatusUserOnline(message._id)
          io.to(chatId).emit("receiveMessage", 
            resultMessage
          );
       
        }
      }
    });

    socket.on("leaveChat", ({ chatId, userId }) => {
      socket.leave(chatId);
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId];
      }
    });

    socket.on("deleteMessage", async({ chatId, messageId }) => {
      const chat = await chatSerive.fetchChatById(chatId);
      const message= await messageService.findById(messageId)
      if (chat && message) {
        const student = chat.studentId as IStudent;
        const expert = chat.expertId as IExpert;

        const recipientId =
          student._id.toString() === message.senderId.toString()
            ? expert._id.toString()
            : student._id.toString();

            if (!Object.keys(onlineUsers).includes(recipientId)) {

              io.emit('messageDeleted',message)
            }else{

              io.to(chatId).emit("messageDeleted", message);
            }

            
           }
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

    socket.on("offer", (data) => {
      console.log("data", data.room);
      socket.to(data.room).emit("offer", data);
    });

    socket.on("answer", (data) => {
      socket.to(data.room).emit("answer", data);
    });

    socket.on("ice-candidate", (data) => {
      socket.to(data.room).emit("ice-candidate", data);
    });

    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log(`user is joined the room ${room}`);
    });

    socket.on("leaveRoom", (room) => {
      socket.leave(room);
    });
  });

  return io;
};
