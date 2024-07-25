import { Request, Response } from "express";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import StudentService from "../services/implementations/StudentService";
import { IStudentService } from "../services/interface/IStudentService";
import { IStudent } from "../entities/StudentEntity";

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

export default async (req: Request, res: Response) => {
  
  try {
   
    const auth = getAuth(app);
    const decodedToken = await auth.verifyIdToken(req.body.token);
    
    let studentExist = await studentService.exitStudent(decodedToken.email as string); 
       
      if (!studentExist) {
        const newStudent:Partial< IStudent >= {
          user_name: decodedToken.name || "",
          email: decodedToken.email || "",
          password: "",
          authentication_id: decodedToken.uid,
          authentication_provider: decodedToken.firebase.sign_in_provider || "",
          profile_picture: decodedToken.picture || "",
          phonenumber: "",
          role: "student",
        };

        const { student, accessToken, refreshToken } = await studentService.createStudent(newStudent);
        res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res
      .status(201)
      .json({
        success: true,
        Message: "student created successfully",
        data: student,
      });
     
    }else{
        res.status(409).json({ success: false, Message: "user already exist" });
    }
    
  } catch (error) {
    console.error("Error occurred during Google authentication:", error);
    res.status(500).json({message:"Internal server error" ,success:false, });
  }
};
