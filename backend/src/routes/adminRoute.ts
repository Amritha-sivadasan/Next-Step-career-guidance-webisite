import { Router } from "express";
import adminController from "../contollers/adminController";
import { refreshTokens } from "../contollers/authController";
import { verifyAccessToken, verifyRefreshToken, verifyRole } from "../middlewares/authMiddleware";

const adminRoute=Router()
const role='admin'
const token = "adminRefreshToken";

adminRoute.post('/login',adminController.loginAdmin)
adminRoute.get('/logout',adminController.logoutAdmin)
adminRoute.post('/refresh-token',verifyRefreshToken(token),verifyRole(role), refreshTokens(token))
export default adminRoute