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
import { createSocketServer } from "./socket/socketHandler";

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

createSocketServer(server);
server.listen(port, () => {
  console.log(`server is running on the ${port}`);
});
