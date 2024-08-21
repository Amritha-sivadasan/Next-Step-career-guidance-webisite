import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connect from "./config/connectDB";
import cookieParser from "cookie-parser";
import cors from "cors";
import studentRouter from "./routes/userRouter";
import expertRouter from "./routes/expertRouter";
import adminRoute from "./routes/adminRoute";
import http from "http";
import { Server } from "socket.io";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 5000;
connect();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    exposedHeaders: ["Set-Cookie"],
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/student", studentRouter);
app.use("/api/expert", expertRouter);
app.use("/api/admin", adminRoute);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");
  let user: string | undefined;
  socket.on("joinChat", async ({ chatId, userId }) => {
    user = userId;
    socket.join(chatId);
    socket.to(chatId).emit("online", userId);
    console.log(`user connct ChatId ${chatId} user Id ${userId}`);
    socket.emit("connected");
  });
  socket.on("sendMessage", async ({ chatId, message }) => {
    // console.log('new message', chatId)

    io.to(chatId).emit("receiveMessage", message);
  });

  socket.on("deleteMessage", ({ chatId, messageId }) => {
    console.log("deleteMessage", chatId, messageId);
    io.to(chatId).emit("messageDeleted", messageId);
  });

  socket.on("leaveChat", ({ chatId, userId }) => {
    socket.leave(chatId);
    socket.to(chatId).emit("offline", userId);
  });
  

  socket.on("disconnect", () => {
    console.log("User disconnected");
    if (user) {
      const rooms = Array.from(socket.rooms);
      rooms.forEach((room) => {
        socket.to(room).emit("offline", user);
      });
    }
  });
});

server.listen(port, () => {
  console.log(`server is running on the ${port}`);
});
