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

  socket.on("joinChat",async ({ chatId, userId }) =>{
    socket.join(chatId);
    console.log(`User ${userId} joined chat room ${chatId}`);
  
  });
  socket.on("sendMessage", async ({ chatId, message }) => {
    console.log('new message',message)

    io.to(chatId).emit("receiveMessage", message);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(port, () => {
  console.log(`server is running on the ${port}`);
});
