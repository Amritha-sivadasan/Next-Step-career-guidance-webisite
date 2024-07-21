import { Router } from "express";
import expertController from "../contollers/expertController";
import otpController from "../contollers/otpController";
import validateOtp from "../validator/otpValidator";
import {
  verifyRefreshToken,
  verifyAccessToken,
  verifyRole,
} from "../middlewares/authMiddleware";
import { refreshTokens } from "../contollers/authController";
import validateExpert from "../validator/expertValidator";

const expertRouter = Router();

expertRouter.post("/otp-send", otpController.createOtp);
expertRouter.post("/verify-otp", validateOtp, otpController.verifyOtp);
expertRouter.post("/resend-otp", otpController.createOtp);
expertRouter.post("/register", validateExpert,expertController.createExpert);
expertRouter.post('/refresh-token',verifyRefreshToken,refreshTokens)
expertRouter.post('/login', expertController.loginUser);
expertRouter.post('/forgot-password', expertController.forgotPassword);
expertRouter.post('/reset-password', expertController.resetPassword);

export default expertRouter;
