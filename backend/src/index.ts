import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connect from "./config/connectDB";
import cookieParser from "cookie-parser";
import cors from "cors";
import studentRouter from "./routes/userRouter";
import expertRouter from "./routes/expertRouter";
import adminRoute from "./routes/adminRoute";
import http from "http";
import { createSocketServer } from "./socket/socketHandler";
import morgan from "morgan";

import webhookrouter from "./routes/webhookRoute";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 5000;
connect();
app.use(express.json());

app.use("/webhook", express.raw({ type: "application/json" }));
app.use("/webhook", webhookrouter);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    exposedHeaders: ["Set-Cookie"],
  })
);


app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/student", studentRouter);
app.use("/expert", expertRouter);
app.use("/admin", adminRoute);

const server = http.createServer(app);

createSocketServer(server);
server.listen(port, () => {
  console.log(`server is running on the ${port}`);
});
