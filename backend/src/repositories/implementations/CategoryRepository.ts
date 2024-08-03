import { ICategoryRepository } from "../interface/ICategoryRepository";
import { Category } from "../../models/categorySchema";
import { ICategory } from "../../entities/CategoryEntity";

export default class CategoryRepository implements ICategoryRepository {
  async findAll(page:number,limit:number): Promise<ICategory[]> {
    const skip = (page - 1) * limit;
    try {
      return Category.find({is_delete:false}).skip(skip).limit(limit).exec()
    } catch (error) {
      throw error;
    }
  }
  async countDocuments(): Promise<number> {
    return Category.countDocuments({is_delete:false}).exec();
  }

  async findById(id: string): Promise<ICategory | null> {
    try {
      return Category.findById(id,{is_delete:false}).exec();
    } catch (error) {
      throw error;
    }
  }

  async create(category: ICategory): Promise<ICategory> {
    try {
      const newCategory = new Category(category);
      return newCategory.save();
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, category: Partial<ICategory>): Promise<ICategory> {
    try {
      const existCategory = await Category.findById(id).exec();
      if (existCategory) {
        existCategory.set(category);
        const updateCategory = await existCategory.save();
        return updateCategory;
      }else{
        throw  new Error('categrory update fail')
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteCategory(id: string): Promise<boolean> {
    try {
      const result = await Category.findByIdAndUpdate(id,{$set:{is_delete:true}}).exec();
      if (!result) {
       return false
      }
      return true

    } catch (error) {
      throw error;
    }
  }

  async findOne(catName: string): Promise<ICategory | null> {
    try {
      const result = await Category.findOne({ catName });
      return result;
    } catch (error) {
      throw error;
    }
  }
}