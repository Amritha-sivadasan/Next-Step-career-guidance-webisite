import { ISubCategeryRepository } from "../interface/ISubCategoryRepository";
import { SubCategory } from "../../models/subCategorySchema";
import { ISubCategory } from "../../entities/SubCategoryEntity";
import e from "express";

export default class SubCategoryRepository implements ISubCategeryRepository{


     async findAll(): Promise<ISubCategory[]> {
         try {
            return SubCategory.find().exec()
         } catch (error) {
            throw error
         }
     }

     async findById(id: string): Promise<ISubCategory | null> {
         try {
            return SubCategory.findById(id).exec()
         } catch (error) {
            throw error
         }
     }

     async create(category: ISubCategory): Promise<ISubCategory > {
           try {
            const newCategory= new SubCategory(category)
             return newCategory.save()
            
           } catch (error) {
            throw error
           } 
     }

async update(id: string, category: Partial<ISubCategory>): Promise<ISubCategory | null> {
     try {
        const existCategory = await  SubCategory.findById(id).exec()
        if(!existCategory){
            throw new Error("Category not found");
        }
       existCategory.set(category)
        const updateCategory= await existCategory.save()
        return updateCategory
     } catch (error) {
        throw error
     }
}

async deleteSubCategory(id: string): Promise<boolean> {
    try {
        const result = await SubCategory.findByIdAndDelete(id).exec();
        if (!result) {
            return  false
        }
        return true
    } catch (error) {
        throw error;
    }
}

async findOne(subCatName: string): Promise<ISubCategory | null> {
    try {
        const result= await SubCategory.findOne({subCatName})
        return result
    } catch (error) {
        throw error

    }
}

 async deleteByCategory(catName:string):Promise<boolean>{
    try {
        const result= await SubCategory.deleteMany({catName})
        if(result){
            return true
        }else{
            return false
        }
    } catch (error) {
        throw error
    }
 }

}

