import { Router } from "express";
import adminController from "../contollers/adminController";
import { refreshTokens } from "../contollers/authController";
import { verifyAccessToken, verifyRefreshToken, verifyRole } from "../middlewares/authMiddleware";
import categoryController from "../contollers/categoryController";
import subCategoryController from "../contollers/subCategoryController";
import upload from "../utils/multerConfig";

const adminRoute=Router()
const role='admin'
const token = "adminRefreshToken";

adminRoute.post('/login',adminController.loginAdmin)
adminRoute.get('/logout',adminController.logoutAdmin)
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
 adminRoute.get('/verifyExpert/:id',verifyAccessToken,verifyRole(role),adminController.verifyExpert)


export default adminRoute