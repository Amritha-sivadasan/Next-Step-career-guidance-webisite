import { Router } from "express";
import studentController from "../contollers/studentController";
import otpController from "../contollers/otpController";
import validateStudentRegister from "../validator/studentRegisterValidator";
import validateOtp from "../validator/otpValidator";
import {
  verifyRefreshToken,
  verifyAccessToken,
  verifyRole,
} from "../middlewares/authMiddleware";
import { refreshTokens } from "../contollers/authController";
import validateStudentLogin from "../validator/studentLoginvalidator";
import firebaseController from "../contollers/firebaseController";

const router = Router();

router.post("/otp-send", otpController.createOtp);
router.post("/verify-otp",  otpController.verifyOtp);
router.post("/resend-otp", otpController.createOtp);
router.post(
  "/register",

  studentController.createStudent
);
router.post("/refresh-token", verifyRefreshToken, refreshTokens);
router.post("/login", validateStudentLogin, studentController.loginUser);
router.post("/forgot-password", studentController.forgotPassword);
router.post("/reset-password", studentController.resetPassword);

router.post('/firebase-login',firebaseController)
router.post('/register/google',studentController.updateStudent)
export default router;
