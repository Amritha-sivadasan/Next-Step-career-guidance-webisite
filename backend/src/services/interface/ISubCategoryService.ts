import { ISubCategory } from "../../entities/SubCategoryEntity"

export interface ISubCategoryService {
    getAllSubCategory():Promise<ISubCategory[]>
    getSubCategoryById(id:string):Promise<ISubCategory|null>
    createSubCategory(category:ISubCategory):Promise<ISubCategory>
    updateSubCategory(id:string,category:Partial<ISubCategory>):Promise<ISubCategory|null>
    existSubCategory(id:string):Promise<boolean>
    deleteSubCategory(id:string):Promise<boolean>
}