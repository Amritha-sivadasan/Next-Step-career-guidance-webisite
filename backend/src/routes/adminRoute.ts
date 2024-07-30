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

 adminRoute.get('/subCategory',verifyAccessToken, verifyRole(role),subCategoryController.findAllSubCategroy)
 adminRoute.post('/addSubCategory',verifyAccessToken, verifyRole(role),subCategoryController.CreateSubCategory)
 adminRoute.put('/editSubCategory',verifyAccessToken, verifyRole(role),subCategoryController.EditSubCategory)
 adminRoute.get('/deleteSubCategory/:id',verifyAccessToken, verifyRole(role),subCategoryController.deleteSubCategory)

 adminRoute.get('/allExperts',verifyAccessToken,verifyRole(role),adminController.getAllExpert)


export default adminRoute