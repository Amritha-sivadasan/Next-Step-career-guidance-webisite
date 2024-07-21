import { Router } from "express";
import studentController from "../contollers/studentController";
import otpController from "../contollers/otpController";
import validateStudentRegister from "../validator/studentRegisterValidator";
import validateOtp from "../validator/otpValidator";
import { verifyRefreshToken,verifyAccessToken } from "../middlewares/authMiddleware";
import { refreshTokens } from "../contollers/authController";
import validateStudentLogin from "../validator/studentLoginvalidator";



const router = Router();
router.post("/otp-send", otpController.creatOtp);
router.post("/verify-otp", validateOtp, otpController.verifyOtp);
router.post("/resend-otp", otpController.creatOtp);
router.post("/", validateStudentRegister, studentController.createStudent);
router.post('/refresh-token',verifyRefreshToken,refreshTokens)
router.post('/login',verifyAccessToken,validateStudentLogin,studentController.loginUser)
router.post('/forgot-password',otpController.creatOtp)
router.post('/reset-password',studentController.resetPassword)
export default router;
