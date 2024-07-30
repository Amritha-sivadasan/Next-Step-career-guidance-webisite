import { ICategoryRepository } from "../../repositories/interface/ICategoryRepository";
import { ICategory } from "../../entities/CategoryEntity";
import { ICategoryService } from "../interface/ICategoryService";
import CategoryRepository from "../../repositories/implementations/CategoryRepository";

export default class CategoryService implements ICategoryService {
  private categoryRepository: ICategoryRepository;
  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async getAllCategory(): Promise<ICategory[]> {
    try {
      const result = await this.categoryRepository.findAll();
      return result;
    } catch (error) {
      console.log("error during get all category", error);
      throw error;
    }
  }

  async getCategoryById(id: string): Promise<ICategory | null> {
    try {
      const result = await this.categoryRepository.findById(id);
      return result;
    } catch (error) {
      console.log("error during getcategoryby id");

      throw error;
    }
  }

  async existCategory(name: string): Promise<boolean> {
    try {
      const exist = await this.categoryRepository.findOne(name);
      if (exist) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("error during checking exist category", error);

      throw error;
    }
  }

  async createCategory(category: ICategory): Promise<ICategory> {
    try {
      const exist = await this.categoryRepository.findOne(category.catName);
      if (exist) {
        throw new Error("Category Already Exist");
      }
      return await this.categoryRepository.create(category);
    } catch (error) {
      console.log("error during creating category");
      throw error;
    }
  }

  async updateCategory(
    id: string,
    category: Partial<ICategory>
  ): Promise<ICategory | null> {
    try {
      const exist = await this.categoryRepository.findById(id);
      if (!exist) {
        throw new Error("Category is not existed");
      }
      const updateCat = await this.categoryRepository.update(id, category);
      return updateCat;
    } catch (error) {
      console.log("error during updateing category");

      throw error;
    }
  }

  async deleteCategory(id: string): Promise<boolean> {
    try {
      const exist = await this.categoryRepository.findById(id);
      if (!exist) {
        return false;
      }
      return await this.categoryRepository.deleteCategory(id);
    } catch (error) {
      throw error;
    }
  }
}
