import { Request, Response } from "express";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import StudentService from "../services/implementations/StudentService";
import { IStudentService } from "../services/interface/IStudentService";
import { IStudent } from "../entities/StudentEntity";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import ExpertService from "../services/implementations/ExpertService";
import { IExpertService } from "../services/interface/IExpertService";
import { IExpert } from "../entities/ExpertEntity";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: "next-step-cc5ea",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};


  

const app = initializeApp(firebaseConfig);
const studentService: IStudentService = new StudentService();
const expertService:IExpertService=new ExpertService()

export const  studentGoogleAuth =async (req: Request, res: Response) => {
  try {
    const auth = getAuth(app);
    const decodedToken = await auth.verifyIdToken(req.body.token);
    let studentExist = await studentService.exitStudent(
      decodedToken.email as string
    );

    if (!studentExist) {
      const newStudent: Partial<IStudent> = {
        user_name: decodedToken.name || "",
        email: decodedToken.email || "",
        password: "",
        authentication_id: decodedToken.uid,
        authentication_provider: decodedToken.firebase.sign_in_provider || "",
        profile_picture: decodedToken.picture || "",
        phonenumber: "",
        role: "student",
      };

      const { student, accessToken, refreshToken } =
        await studentService.createStudent(newStudent);
    
       res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
      res.status(201).json({
        success: true,
        Message: "student created successfully",
        data: student,
        accessToken
      });
    } else {
     const userId=studentExist._id.toString()
     const accessToken=generateAccessToken(userId,studentExist.role)
     const refreshToken=generateRefreshToken(userId,studentExist.role)
   
     res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.status(201).json({
      success: true,
      Message: "student created successfully",
      data: studentExist,
      accessToken
    })
      
    }
  } catch (error) {
    console.error("Error occurred during Google authentication:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};


export const  expertGoogleAuth =async (req: Request, res: Response) => {
  try {
    const auth = getAuth(app);
    const decodedToken = await auth.verifyIdToken(req.body.token);
    let expertExist = await expertService.exitExpert(
      decodedToken.email as string
    );

    if (!expertExist) {
      const newExpert: Partial<IExpert> = {
        user_name: decodedToken.name || "",
        email: decodedToken.email || "",
        password: "",
        authentication_id: decodedToken.uid,
        authentication_provider: decodedToken.firebase.sign_in_provider || "",
        profile_picture: decodedToken.picture || "",
        phonenumber: "",
        role: "expert",
      };

      const { expert, accessToken, refreshToken } =
        await expertService.createdExpert(newExpert);
    
      res.cookie("ExpertRefreshToken", refreshToken, {
        httpOnly: false,
        secure: false,
        sameSite:"none",
      });
      res.status(201).json({
        success: true,
        Message: "Expert created successfully",
        data: expert,
        accessToken
      });
    } else {
     const expertId=expertExist._id.toString()
     const accessToken=generateAccessToken(expertId,expertExist.role)
     const refreshToken=generateRefreshToken(expertId,expertExist.role)
   
     res.cookie("ExpertRefreshToken", refreshToken, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
    });
    res.status(201).json({
      success: true,
      Message: "student created successfully",
      data: expertExist,
      accessToken
    })
      
    }
  } catch (error) {
    console.error("Error occurred during Google authentication:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
