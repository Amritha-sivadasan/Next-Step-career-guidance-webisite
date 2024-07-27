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
import { studentGoogleAuth } from "../contollers/firebaseController";

const role = "student";
const token = "refreshToken";

const router = Router();

router.post("/register", studentController.createStudent);
router.post("/otp-send", otpController.createOtp);
router.post("/verify-otp", otpController.verifyOtp);
router.post("/resend-otp", otpController.createOtp);

router.get(
  "/",
  verifyAccessToken,
  verifyRole(role),
  studentController.fetchUserById
);
router.post("/refresh-token", verifyRefreshToken(token), refreshTokens);
router.post("/login", studentController.loginUser);
router.post("/forgot-password", studentController.forgotPassword);
router.post("/reset-password", studentController.resetPassword);

router.post("/google-login", studentGoogleAuth);
router.put(
  "/update/:id",
  verifyAccessToken,
  verifyRole(role),
  studentController.updateStudent
);
export default router;
