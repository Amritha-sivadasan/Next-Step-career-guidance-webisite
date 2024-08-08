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

const role = process.env.STUDENT_ROLE as string
const token = process.env.STUDENT_TOKEN as string

const router = Router();

router.post("/register", studentController.createStudent);
router.post("/otp-send", otpController.createOtp);
router.post("/verify-otp", otpController.verifyOtp);
router.post("/resend-otp", otpController.createOtp);
router.post("/forgot-password", studentController.forgotPassword);
router.post("/reset-password", studentController.resetPassword);

router.get(
  "/",
  verifyAccessToken,
  verifyRole(role),
  studentController.fetchUserById
);

router.post("/refresh-token", verifyRefreshToken(token), refreshTokens);
router.post("/login", studentController.loginUser);


router.post("/google-login", studentGoogleAuth);
router.put(
  "/update/:id",
  verifyAccessToken,
  verifyRole(role),
  studentController.updateStudent
);


router.get('/logout/' ,verifyAccessToken,
  verifyRole(role),studentController.logoutStuent,)

  router.get('/getAllcategory',categoryController.findAllCategroy)
  router.get('/getAllSubCategory/:catName', subCategoryController.findSubCategoryBycatname)
  router.get('/getCategoryByName/:catName',categoryController.findCategoryByName)
  router.get('/subCategoryById/:id',subCategoryController.findSubCategoryById)
  router.get('/experts/:subCatName',expertController.findExpertBySubCategory)
export default router;
