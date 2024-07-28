import { Router } from "express";
import expertController from "../contollers/expertController";
import {
  verifyRefreshToken,
  verifyAccessToken,
  verifyRole,
} from "../middlewares/authMiddleware";
import { refreshTokens } from "../contollers/authController";
import validateExpert from "../validator/expertValidator";
import {expertGoogleAuth} from "../contollers/firebaseController";
import upload from "../utils/multerConfig";

const expertRouter = Router();
const role='expert'
const token = "ExpertRefreshToken";



expertRouter.post("/otp-send", expertController.createOtp);
expertRouter.post("/verify-otp",  expertController.verifyOtp);
expertRouter.post("/resend-otp", expertController.createOtp);

expertRouter.get('/',verifyAccessToken,verifyRole(role), expertController.fetchExpertById)
expertRouter.post("/register", expertController.createExpert);
expertRouter.post('/refresh-token',verifyRefreshToken(token),verifyRole(role),refreshTokens(token))
expertRouter.post('/login', expertController.loginExpert);
expertRouter.post('/forgot-password', expertController.forgotPassword);
expertRouter.post('/reset-password', expertController.resetPassword);

expertRouter.post("/google-login",expertGoogleAuth );
expertRouter.put("/update/:id", verifyAccessToken, verifyRole(role), upload.fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'credential', maxCount: 1 }]),expertController.updateExpert);


export default expertRouter;
