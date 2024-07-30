import { Request, response, Response } from "express";
import { CustomRequest } from "../entities/jwtEntity";
import SubCategoryService from "../services/implementations/SubCategoryService";
import { ISubCategoryService } from "../services/interface/ISubCategoryService";

class SubCategoryController {
  private subCategoryService: ISubCategoryService;
  constructor() {
    this.subCategoryService = new SubCategoryService();
  }

  public findAllSubCategroy= async(req:Request,res:Response):Promise<void>=>{
    try {
        const response =  await this.subCategoryService.getAllSubCategory()
        res.status(200).json({success:true,message:'find all category',data:response})
    } catch (error) {
        console.log('error in finding category');
        res.status(500).json({success:false ,message:"cannot find any category",error})
    }
  }


  public CreateSubCategory= async(req:Request,res:Response):Promise<void>=>{
    try {
      const response= await this.subCategoryService.createSubCategory(req.body)
       res.status(201).json({success:true,message:'category created Successfully',data:response})
    } catch (error) {
        console.log('error in creating category');
        res.status(500).json({success:false ,message:"category already exist",error})
        
    }
  }



  public EditSubCategory= async(req:Request,res:Response):Promise<void>=>{
    try {
        const id= req.params.id
        
     const response= await this.subCategoryService.updateSubCategory(id,req.body)
     res.status(200).json({success:true,message:'Update category successfull',data:response})  
   
    } catch (error) {
        console.log('error during edit category',error);
        res.json(500).json({success:false,message:'something went wrong on update category',error})
        
    }
  }

  public deleteSubCategory =async(req:Request,res:Response):Promise<void>=>{
    try {
        const id =req.params.id
      const response = await this.subCategoryService.deleteSubCategory(id)
      res.status(200).json({success:true,message:'deleted category category successfull',data:response})
    } catch (error) {
        console.log('error during delete category',error);
        res.json(500).json({success:false,message:'something went wrong on delete category',error})
    }
  }


}

export default new SubCategoryController()


