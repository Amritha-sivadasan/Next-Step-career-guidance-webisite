import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import connect from './config/connectDB'
import cookieParser from 'cookie-parser'
import  cors  from 'cors'
import studentRouter from "./routes/userRouter";
import expertRouter from "./routes/expertRouter";
import adminRoute from "./routes/adminRoute";


dotenv.config();
const app: Express = express();
const port= process.env.PORT
connect()

app.use(cors())
app.use(express.json())
app.use(cookieParser());


app.get("/", (req: Request, res: Response) => {
  res.send("This is new project from Amritha  ");
});

app.use('/api/student',studentRouter)
app.use('/api/expert',expertRouter)
app.use('/api/admin',adminRoute)

app.listen(port, () => {
  console.log(`server is running on the ${port}`);
});
