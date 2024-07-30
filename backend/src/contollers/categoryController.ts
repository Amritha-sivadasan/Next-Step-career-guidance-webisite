import { Request, response, Response } from "express";
import { CustomRequest } from "../entities/jwtEntity";
import CategoryService from "../services/implementations/CategoryService";
import { ICategoryService } from "../services/interface/ICategoryService";

class CategoryController {
  private categoryService: ICategoryService;
  constructor() {
    this.categoryService = new CategoryService();
  }

  public findAllCategroy= async(req:Request,res:Response):Promise<void>=>{
    try {
        const response =  await this.categoryService.getAllCategory()
        res.status(200).json({success:true,message:'find all category',data:response})
    } catch (error) {
        console.log('error in finding category');
        res.status(500).json({success:false ,message:"cannot find any category",error})
    }
  }


  public CreateCategory= async(req:Request,res:Response):Promise<void>=>{
    try {
      const response= await this.categoryService.createCategory(req.body)
       res.status(201).json({success:true,message:'category created Successfully',data:response})
    } catch (error) {
        console.log('error in creating category');
        res.status(500).json({success:false ,message:"category already exist",error})
        
    }
  }



  public EditCategory= async(req:Request,res:Response):Promise<void>=>{
    try {
        const id= req.params.id
        
     const response= await this.categoryService.updateCategory(id,req.body)
     res.status(200).json({success:true,message:'Update category successfull',data:response})  
   
    } catch (error) {
        console.log('error during edit category',error);
        res.json(500).json({success:false,message:'something went wrong on update category',error})
        
    }
  }

  public deleteCategory =async(req:Request,res:Response):Promise<void>=>{
    try {
        const id =req.params.id
      const response = await this.categoryService.deleteCategory(id)
      res.status(200).json({success:true,message:'deleted category category successfull',data:response})
    } catch (error) {
        console.log('error during delete category',error);
        res.json(500).json({success:false,message:'something went wrong on delete category',error})
    }
  }


}

export default new CategoryController(); 
