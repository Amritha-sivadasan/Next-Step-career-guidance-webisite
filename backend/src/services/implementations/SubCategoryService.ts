import { ISubCategeryRepository } from "../../repositories/interface/ISubCategoryRepository";
import { ISubCategory } from "../../entities/SubCategoryEntity";
import SubCategoryRepository from "../../repositories/implementations/SubCategoryRepository";
import { ISubCategoryService } from "../interface/ISubCategoryService";

export default class SubCategoryService implements ISubCategoryService {
  private subCategoryRepository: ISubCategeryRepository;
  constructor() {
    this.subCategoryRepository = new SubCategoryRepository();
  }

  async getAllSubCategory(): Promise<ISubCategory[]> {
    try {
      const result = await this.subCategoryRepository.findAll();
      return result;
    } catch (error) {
      console.log("error during get all category", error);
      throw error;
    }
  }

  async getSubCategoryById(id: string): Promise<ISubCategory | null> {
    try {
      const result = await this.subCategoryRepository.findById(id);
      return result;
    } catch (error) {
      console.log("error during getcategoryby id");

      throw error;
    }
  }

  async existSubCategory(name: string): Promise<boolean> {
    try {
      const exist = await this.subCategoryRepository.findOne(name);
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

  async createSubCategory(Subcategory: ISubCategory): Promise<ISubCategory> {
    try {
      const exist = await this.subCategoryRepository.findOne(
        Subcategory.subCatName
      );
      if (exist) {
        throw new Error("SubCategory Already Exist");
      }
      return await this.subCategoryRepository.create(Subcategory);
    } catch (error) {
      console.log("error during creating category");
      throw error;
    }
  }

  async updateSubCategory(
    id: string,
    subcategory: Partial<ISubCategory>
  ): Promise<ISubCategory | null> {
    try {
      const exist = await this.subCategoryRepository.findById(id);
      if (exist) {
        throw new Error("Category update fail");
      }
      const updateCat = await this.subCategoryRepository.update(
        id,
        subcategory
      );

      return updateCat;
    } catch (error) {
      console.log("error during updateing category");

      throw error;
    }
  }

  async deleteSubCategory(id: string): Promise<boolean> {
    try {
      const exist = await this.subCategoryRepository.findById(id);
      if (!exist) {
        return false;
      }
      return await this.subCategoryRepository.deleteSubCategory(id);
    } catch (error) {
      throw error;
    }
  }
}
