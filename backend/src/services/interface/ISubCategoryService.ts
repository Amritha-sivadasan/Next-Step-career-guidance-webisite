import { ISubCategory } from "../../entities/SubCategoryEntity"

export interface ISubCategoryService {
    getAllSubCategory(page: number, limit: number): Promise<{ items: ISubCategory[], totalCount: number, totalPages: number, currentPage: number }>
    getSubCategoryById(id:string):Promise<ISubCategory|null>
    createSubCategory(category:ISubCategory,file: Express.Multer.File):Promise<ISubCategory>
    updateSubCategory(id:string,category:Partial<ISubCategory>,file?: Express.Multer.File):Promise<ISubCategory|null>
    existSubCategory(id:string):Promise<boolean>
    deleteSubCategory(id:string):Promise<boolean>
    fetchSubcategoryById(id: string): Promise<ISubCategory | null>
}