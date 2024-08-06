import { ICategory } from "../../entities/CategoryEntity";

export interface ICategoryService {
    getAllCategory(page:number,limit:number):Promise<{
        items: ICategory[];
        totalCount: number;
        totalPages: number;
        currentPage: number;
      }>
    getCategoryById(id:string):Promise<ICategory|null>
    createCategory(category:Partial<ICategory>,file: Express.Multer.File):Promise<ICategory>
    updateCategory(id:string,category:Partial<ICategory> ,file?: Express.Multer.File):Promise<ICategory|null>
    existCategory(id:string):Promise<boolean>
    deleteCategory(id:string):Promise<boolean>
    fetchcategoryById(id:string): Promise<ICategory|null>
    fetchCateByname(catName:string): Promise<ICategory | null>
}