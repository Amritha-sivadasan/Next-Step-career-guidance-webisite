import { ISubCategory } from "../../entities/SubCategoryEntity"

export interface ISubCategeryRepository {
    findAll():Promise<ISubCategory[]>
    findById(id: string): Promise<ISubCategory | null>
    findOne(subCatName: string): Promise<ISubCategory | null>
    create(category:ISubCategory):Promise<ISubCategory>
    update(id:string, category:Partial<ISubCategory>):Promise<ISubCategory|null>
    deleteSubCategory(id:string):Promise<boolean>
    
}