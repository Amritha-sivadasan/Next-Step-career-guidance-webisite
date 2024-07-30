import { Router } from "express";
import adminController from "../contollers/adminController";
import { refreshTokens } from "../contollers/authController";
import { verifyAccessToken, verifyRefreshToken, verifyRole } from "../middlewares/authMiddleware";
import categoryController from "../contollers/categoryController";
import subCategoryController from "../contollers/subCategoryController";

const adminRoute=Router()
const role='admin'
const token = "adminRefreshToken";

adminRoute.post('/login',adminController.loginAdmin)
adminRoute.get('/logout',adminController.logoutAdmin)
adminRoute.post('/refresh-token',verifyRefreshToken(token),verifyRole(role), refreshTokens(token))

 adminRoute.get('/allCategory',verifyAccessToken, verifyRole(role),categoryController.findAllCategroy)
 adminRoute.post('/addCategory',verifyAccessToken, verifyRole(role),categoryController.CreateCategory)
 adminRoute.put('/editCategory',verifyAccessToken, verifyRole(role),categoryController.EditCategory)
 adminRoute.get('/deleteCategory/:id',verifyAccessToken, verifyRole(role),categoryController.deleteCategory)

 adminRoute.get('/subCategory',verifyAccessToken, verifyRole(role),subCategoryController.findAllSubCategroy)
 adminRoute.post('/addSubCategory',verifyAccessToken, verifyRole(role),subCategoryController.CreateSubCategory)
 adminRoute.put('/editSubCategory',verifyAccessToken, verifyRole(role),subCategoryController.EditSubCategory)
 adminRoute.get('/deleteSubCategory/:id',verifyAccessToken, verifyRole(role),subCategoryController.deleteSubCategory)


export default adminRoute