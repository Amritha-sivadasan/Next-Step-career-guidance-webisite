import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connect from './config/connectDB'
import userRouter from "./routes/userRouter";
import cookieParser from 'cookie-parser'


dotenv.config();
const app: Express = express();
const port= process.env.PORT
connect()

app.use(express.json())
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("This is new project from Amritha  ");
});

app.use('/api/student',userRouter)

app.listen(port, () => {
  console.log(`server is running on the ${port}`);
});
