import { Router } from "express";
import adminController from "../contollers/adminController";
import { refreshTokens } from "../contollers/authController";
import { verifyAccessToken, verifyRefreshToken, verifyRole } from "../middlewares/authMiddleware";
import categoryController from "../contollers/categoryController";
import subCategoryController from "../contollers/subCategoryController";
import upload from "../utils/multerConfig";
import bookingController from "../contollers/bookingController";
import psychometricControllet from "../contollers/psychometricController";
import psychometricController from "../contollers/psychometricController";

const adminRoute=Router()
const role=process.env.ADMIN_ROLE as string
const token = process.env.ADMIN_TOKEN as string

adminRoute.post('/login',adminController.loginAdmin)
adminRoute.post('/refresh-token',verifyRefreshToken(token),verifyRole(role), refreshTokens(token))

 adminRoute.get('/allCategory',verifyAccessToken, verifyRole(role),categoryController.findAllCategroy)
 adminRoute.get('/categoryById/:id',verifyAccessToken, verifyRole(role),categoryController.findCategoryById)
 adminRoute.post('/addCategory',verifyAccessToken, verifyRole(role),upload.single('catImage') ,categoryController.CreateCategory)
 adminRoute.put('/editCategory/:id',verifyAccessToken, verifyRole(role),upload.single('imageFile'),categoryController.EditCategory)
 adminRoute.get('/deleteCategory/:id',verifyAccessToken, verifyRole(role),categoryController.deleteCategory)

 adminRoute.get('/allSubCategory',verifyAccessToken, verifyRole(role),subCategoryController.findAllSubCategroy)
 adminRoute.get('/subCategoryById/:id',verifyAccessToken, verifyRole(role),subCategoryController.findSubCategoryById)
 adminRoute.post('/addSubCategory',verifyAccessToken, verifyRole(role),upload.single('subcatImage'),subCategoryController.CreateSubCategory)
 adminRoute.put('/editSubCategory/:id',verifyAccessToken, verifyRole(role),upload.single('imageFile'),subCategoryController.EditSubCategory)
 adminRoute.get('/deleteSubCategory/:id',verifyAccessToken, verifyRole(role),subCategoryController.deleteSubCategory)

 adminRoute.get('/allExperts',verifyAccessToken,verifyRole(role),adminController.getAllExpert)
 adminRoute.get('/expertById/:id',verifyAccessToken,verifyRole(role),adminController.getExpertById)
 adminRoute.patch('/verifyExpert/:id',verifyAccessToken,verifyRole(role),adminController.verifyExpert)
 adminRoute.get('/logout',verifyAccessToken,verifyRole(role),adminController.logoutAdmin)
 adminRoute.patch('/rejectExpert/:id',verifyAccessToken,verifyRole(role),adminController.rejectExpert)


 adminRoute.get('/allStudent',verifyAccessToken,verifyRole(role),adminController.getAllStudents)
 adminRoute.get('/studentById/:id',verifyAccessToken,verifyRole(role),adminController.getStudentById)

 adminRoute.get('/all-bookings',verifyAccessToken,verifyRole(role),bookingController.findAllBookingForAdmin)
 adminRoute.get('/bookingById/:id',verifyAccessToken,verifyRole(role),bookingController.findBookingByIdForAdmin)
 
 adminRoute.patch('/blockExpert/:id',verifyAccessToken,verifyRole(role),adminController.handleblockExpert)
 adminRoute.patch('/blockStudent/:id',verifyAccessToken,verifyRole(role),adminController.handleblockStudent)


 adminRoute.post('/add-psychometric-test',verifyAccessToken,verifyRole(role),psychometricController.addNewQuestion)
 adminRoute.get('/getAllpsychometric',verifyAccessToken,verifyRole(role),psychometricController.fetchAllQuestions)
 adminRoute.delete('/deletepsychometric/:id',verifyAccessToken,verifyRole(role),psychometricController.deleteQuestion)

export default adminRoute