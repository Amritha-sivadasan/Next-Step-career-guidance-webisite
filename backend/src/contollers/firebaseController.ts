import { Request, Response } from "express";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import StudentRepository from "../repositories/implementations/StudentRepository";
import { IStudentRepository } from "../repositories/interface/IStudentRepository";
import { IStudent } from "../entities/StudentEntity";
import { generateAccessToken,generateRefreshToken } from "../utils/jwt"; 

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
const studentRepository: IStudentRepository = new StudentRepository();

export default async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    const auth = getAuth(app);
    const decodedToken = await auth.verifyIdToken(req.body.token);
    console.log("decoded", decodedToken);

    let studentExist = await studentRepository.findUsetById(decodedToken.uid);
    if (!studentExist) {
      if (decodedToken.firebase.sign_in_provider === 'google.com') {
        studentExist = await studentRepository.findOne(decodedToken.email as string);
      }
      if (!studentExist) {
        const newStudent: Partial<IStudent> = {
          user_name: decodedToken.name || '',
          email: decodedToken.email || '',
          password: '',
          authentication_id: decodedToken.uid,
          authentication_provider: decodedToken.firebase.sign_in_provider || '',
          profile_picture: decodedToken.picture || '',
          user_type: '',
          phonenumber: '',
          education_level: '',
          education_background: '',
          is_active: true,
          role: 'student',
        };

        studentExist = await studentRepository.create(newStudent);
      }
    }

   
    const userId = studentExist._id.toString();
    const accessToken = generateAccessToken(userId, "student");
    const refreshToken = generateRefreshToken(userId, "student");

    
    res.json({
      student: studentExist,
      accessToken,
      refreshToken
    });
    
  } catch (error) {
    console.error("Error occurred during Google authentication:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
