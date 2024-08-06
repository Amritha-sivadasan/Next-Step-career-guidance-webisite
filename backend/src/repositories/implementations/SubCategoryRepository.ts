import { ISubCategeryRepository } from "../interface/ISubCategoryRepository";
import { SubCategory } from "../../models/subCategorySchema";
import { ISubCategory } from "../../entities/SubCategoryEntity";



export default class SubCategoryRepository implements ISubCategeryRepository {
  async findAll(page:number,limit:number): Promise<ISubCategory[]> {
    try {
      const skip = (page - 1) * limit;
      return SubCategory.find({is_delete:false}).skip(skip).limit(limit).exec()
    } catch (error) {
      throw error;
    }
  }
  async countDocuments(): Promise<number> {
    return SubCategory.countDocuments({is_delete:false}).exec();
  }

  async findById(id: string): Promise<ISubCategory | null> {
    try {
      return SubCategory.findById(id,{is_delete:false}).exec();
    } catch (error) {
      throw error;
    }
  }

  async create(category: ISubCategory): Promise<ISubCategory> {
    try {
      const newCategory = new SubCategory(category);
      return newCategory.save();
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: string,
    category: Partial<ISubCategory>
  ): Promise<ISubCategory | null> {
    try {
      const existCategory = await SubCategory.findById(id).exec();
      if (!existCategory) {
        throw new Error("Category not found");
      }
      existCategory.set(category);
      const updateCategory = await existCategory.save();
      return updateCategory;
    } catch (error) {
      throw error;
    }
  }

  async deleteSubCategory(id: string): Promise<boolean> {
    try {
      const result = await SubCategory.findByIdAndUpdate(id,{$set:{is_delete:true}}).exec();
      if (!result) {
        return false;
      }
      return true;
    } catch (error) {
      throw error;
    }
  }

  async findOne(subCatName: string): Promise<ISubCategory | null> {
    try {
      const result = await SubCategory.findOne({ subCatName });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteByCategory(catName: string): Promise<boolean> {
    try {
      const result = await SubCategory.updateMany(
        { catName },
        { $set: { is_delete: true } }
      );
      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }
    
  async findSubcategoryByCatName(catName:string):Promise<ISubCategory[]|null>{
    try {
  
      const result = await SubCategory.find({catName})
        return result

    } catch (error) {
      throw error;
    }
  }


}
