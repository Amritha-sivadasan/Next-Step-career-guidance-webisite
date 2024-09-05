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
import categoryController from "../contollers/categoryController";
import subCategoryController from "../contollers/subCategoryController";
import expertController from "../contollers/expertController";
import slotController from "../contollers/slotController";
import bookingController from "../contollers/bookingController";
import upload from "../utils/multerConfig";
import psychometricController from "../contollers/psychometricController";
import ChatController from "../contollers/ChatController";
import messageController from "../contollers/messageController";
import faqController from "../contollers/faqController";
import notificationController from "../contollers/notificationController";
import videoCallController from "../contollers/videoCallController";
import reviewAndRatingController from "../contollers/reviewAndRatingController";
import { sendFirebaseNotification } from "../contollers/firebaseNotificationController";

const role = process.env.STUDENT_ROLE as string;
const token = process.env.STUDENT_TOKEN as string;

const router = Router();

router.post("/register", studentController.createStudent);
router.post("/otp-send", otpController.createOtp);
router.post("/verify-otp", otpController.verifyOtp);
router.post("/resend-otp", otpController.createOtp);
router.post("/forgot-password", studentController.forgotPassword);
router.post("/reset-password",verifyAccessToken,verifyRole(role), studentController.resetPassword);

router.get("/",verifyAccessToken,verifyRole(role),studentController.fetchUserById);

router.post("/refresh-token", verifyRefreshToken(token), refreshTokens(token));
router.post("/login", studentController.loginUser);
router.post("/google-login", studentGoogleAuth);
router.put("/update/:id",verifyAccessToken,verifyRole(role),studentController.updateStudent);

router.get("/logout/",verifyAccessToken,verifyRole(role),studentController.logoutStuent);
router.get("/getAllcategory", categoryController.findAllCategroy);
router.get("/getAllSubCategory/:catName",subCategoryController.findSubCategoryBycatname);
router.get("/getCategoryByName/:catName",categoryController.findCategoryByName);
router.get("/subCategoryById/:id", subCategoryController.findSubCategoryById);
router.get("/experts/:subCatName", expertController.findExpertBySubCategory);
router.get("/experts",expertController.fetchAllExperts);
router.get("/getAllSlot/:expertId",verifyAccessToken,verifyRole(role),slotController.getAllSlotByExpert);
router.post("/bookSlot",verifyAccessToken,verifyRole(role),bookingController.createBooking);
router.put("/updatePayment/:id",verifyAccessToken,verifyRole(role),bookingController.updateBookingPaymentStatus);
router.get('/check-report-user/:userId',studentController.checkUserStatus)
router.put('/uploadImage',verifyAccessToken,verifyRole(role),upload.single('profile_picture'),studentController.updateuserImage )
router.put('/uploadPersonalInfo',verifyAccessToken,verifyRole(role),studentController.updateuserData)
router.get('/all-payment',verifyAccessToken,verifyRole(role),bookingController.findAllPaymentByStudentId)
router.get('/get-allBooking',verifyAccessToken,verifyRole(role),bookingController.findAllBookingByStudentId)
router.get('/getAllpsychometric',verifyAccessToken,verifyRole(role),psychometricController.fetchAllQuestions)
router.post('/submit-psychometric-test/:id',verifyAccessToken,verifyRole(role),psychometricController.submitAnswer)
router.get('/fetAllChat',verifyAccessToken,verifyRole(role),ChatController.fetchChatById)

router.post('/saveMessage',verifyAccessToken,verifyRole(role), upload.fields([{ name: 'file', maxCount: 1 }, { name: 'audio', maxCount: 1 }]),messageController.saveMessage)
router.post('/sendfirbaseNotification',verifyAccessToken,verifyRole(role),sendFirebaseNotification)

router.get('/fetAllChat',verifyAccessToken,verifyRole(role),ChatController.fetchChatById)
router.get('/fetchChatById/:id',verifyAccessToken,verifyRole(role),ChatController.fetchChatByChatId)
router.post('/saveQuestion',verifyAccessToken,verifyRole(role),faqController.saveQuestion)
router.get('/fetchQustion',faqController.fetchAllQuestion)
router.delete('/deleteMessage/:id',verifyAccessToken,verifyRole(role),messageController.deleteMessage)
router.get('/getNotification',verifyAccessToken,verifyRole(role),notificationController.findNotificationById)
router.get('/get-all-meeting-history',verifyAccessToken,verifyRole(role),videoCallController.findMeetingDetailsById)
router.post('/submit-review-rate',verifyAccessToken,verifyRole(role),reviewAndRatingController.submitReviewAndRating)
router.get('/fetchReviewAndRating/:meetingId',verifyAccessToken,verifyRole(role),reviewAndRatingController.fetchReviewDetailsById)
router.patch('/deleteReview/:meetingId',verifyAccessToken,verifyRole(role),reviewAndRatingController.deleteReviewAndRating)
router.get('/fetchAllReview',reviewAndRatingController.fetchAllReviewByStudent)

export default router;
