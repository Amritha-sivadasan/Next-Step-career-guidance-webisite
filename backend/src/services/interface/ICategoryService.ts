import { ICategory } from "../../entities/CategoryEntity";

export interface ICategoryService {
    getAllCategory():Promise<ICategory[]>
    getCategoryById(id:string):Promise<ICategory|null>
    createCategory(category:ICategory):Promise<ICategory>
    updateCategory(id:string,category:Partial<ICategory>):Promise<ICategory|null>
    existCategory(id:string):Promise<boolean>
    deleteCategory(id:string):Promise<boolean>
}