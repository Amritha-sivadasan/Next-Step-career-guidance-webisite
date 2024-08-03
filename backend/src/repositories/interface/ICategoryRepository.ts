import { ICategory } from "../../entities/CategoryEntity";

export interface ICategoryRepository {
    findAll(page:number,limit:number):Promise<ICategory[]>
    findById(id: string): Promise<ICategory | null>
    findOne(catName:string):Promise<ICategory|null>
    create(category:ICategory):Promise<ICategory>
    update(id:string, category:Partial<ICategory>):Promise<ICategory>
    deleteCategory(id:string):Promise<boolean>
    countDocuments(): Promise<number>
    
}