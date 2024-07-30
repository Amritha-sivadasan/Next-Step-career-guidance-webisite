import { ICategoryRepository } from "../interface/ICategoryRepository";
import { Category } from "../../models/categorySchema";
import { ICategory } from "../../entities/CategoryEntity";

export default class CategoryRepository implements ICategoryRepository {
  async findAll(): Promise<ICategory[]> {
    try {
      return Category.find().exec();
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string): Promise<ICategory | null> {
    try {
      return Category.findById(id).exec();
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
      const result = await Category.findByIdAndDelete(id).exec();
      if (!result) {
       return false
      }
      return true

    } catch (error) {
      throw error;
    }
  }

  async findOne(CatName: string): Promise<ICategory | null> {
    try {
      const result = await Category.findOne({ CatName });
      return result;
    } catch (error) {
      throw error;
    }
  }
}
