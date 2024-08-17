import { Router } from "express";
import expertController from "../contollers/expertController";
import {
  verifyRefreshToken,
  verifyAccessToken,
  verifyRole,
} from "../middlewares/authMiddleware";
import { refreshTokens } from "../contollers/authController";
import validateExpert from "../validator/expertValidator";
import { expertGoogleAuth } from "../contollers/firebaseController";
import upload from "../utils/multerConfig";
import subCategoryController from "../contollers/subCategoryController";
import slotController from "../contollers/slotController";
import bookingController from "../contollers/bookingController";
import ChatController from "../contollers/ChatController";
import messageController from "../contollers/messageController";

const expertRouter = Router();
const role = process.env.EXPERT_ROLE as string;
const token = process.env.EXPERT_TOKEN as string;

expertRouter.post("/otp-send", expertController.createOtp);
expertRouter.post("/verify-otp", expertController.verifyOtp);
expertRouter.post("/resend-otp", expertController.createOtp);

expertRouter.get(
  "/",
  verifyAccessToken,
  verifyRole(role),
  expertController.fetchExpertById
);
expertRouter.post("/register", expertController.createExpert);
expertRouter.post(
  "/refresh-token",
  verifyRefreshToken(token),
  verifyRole(role),
  refreshTokens(token)
);
expertRouter.post("/login", expertController.loginExpert);
expertRouter.post("/forgot-password", expertController.forgotPassword);
expertRouter.post("/reset-password", expertController.resetPassword);

expertRouter.post("/google-login", expertGoogleAuth);
expertRouter.put(
  "/about/:id",
  verifyAccessToken,
  verifyRole(role),
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "credential", maxCount: 1 },
  ]),
  expertController.updateExpert
);
expertRouter.get(
  "/logout/",
  verifyAccessToken,
  verifyRole(role),
  expertController.logoutExpert
);
expertRouter.get(
  "/allSubCategory",
  verifyAccessToken,
  verifyRole(role),
  subCategoryController.findAllSubCategroy
);
expertRouter.put(
  "/update/:id",
  verifyAccessToken,
  verifyRole(role),
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "credential", maxCount: 1 },
  ]),
  expertController.updateExpert
);

expertRouter.post(
  "/addSlot",
  verifyAccessToken,
  verifyRole(role),
  slotController.CreateSlot
);
expertRouter.get(
  "/getAllSlot/:expertId",
  verifyAccessToken,
  verifyRole(role),
  slotController.getAllSlotByExpert
);

expertRouter.put('/uploadImage',verifyAccessToken,verifyRole(role),upload.single('profile_picture'),expertController.updateExpretImage)
expertRouter.delete("/deleteSlot/:id",verifyAccessToken,verifyRole(role),slotController.deleteSlots);
expertRouter.get('/allBookings',verifyAccessToken,verifyRole(role),bookingController.findAllExpertBooking)
expertRouter.get('/get-allBooking',verifyAccessToken,verifyRole(role),bookingController.findAllConfirmBooking)
expertRouter.get('/all-payment',verifyAccessToken,verifyRole(role),bookingController.findAllExpertPayment)
expertRouter.patch('/refund/:id',verifyAccessToken,verifyRole(role),bookingController.refundPayment)
expertRouter.get('/fetAllChat',verifyAccessToken,verifyRole(role),ChatController.fetchChatById)
expertRouter.post('/saveMessage',verifyAccessToken,verifyRole(role),messageController.saveMessage)
expertRouter.get('/fetchChatById/:id',verifyAccessToken,verifyRole(role),ChatController.fetchChatByChatId)

export default expertRouter;
