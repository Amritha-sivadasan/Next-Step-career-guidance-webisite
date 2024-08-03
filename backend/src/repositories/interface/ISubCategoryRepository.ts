import { ISubCategory } from "../../entities/SubCategoryEntity"

export interface ISubCategeryRepository {
    findAll(page:number,limit:number):Promise<ISubCategory[]>
    findById(id: string): Promise<ISubCategory | null>
    findOne(subCatName: string): Promise<ISubCategory | null>
    create(category:ISubCategory):Promise<ISubCategory>
    update(id:string, category:Partial<ISubCategory>):Promise<ISubCategory|null>
    deleteSubCategory(id:string):Promise<boolean>
    deleteByCategory(catName:string):Promise<boolean>
    countDocuments(): Promise<number>
    
}