import { Router } from "express";
import adminController from "../contollers/adminController";
import { refreshTokens } from "../contollers/authController";
import { verifyRefreshToken } from "../middlewares/authMiddleware";

const adminRoute=Router()

adminRoute.post('/login',adminController.loginAdmin)
adminRoute.post('/refresh-token',verifyRefreshToken,refreshTokens)
export default adminRoute