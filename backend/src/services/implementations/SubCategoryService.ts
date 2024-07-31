import { ISubCategeryRepository } from "../../repositories/interface/ISubCategoryRepository";
import { ISubCategory } from "../../entities/SubCategoryEntity";
import SubCategoryRepository from "../../repositories/implementations/SubCategoryRepository";
import { ISubCategoryService } from "../interface/ISubCategoryService";
import cloudinary from "../../config/cloudinaryConfig";
import path from "path";
import fs from "fs";

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

  async createSubCategory(
    subcategory: ISubCategory,
    file: Express.Multer.File
  ): Promise<ISubCategory> {
    try {
      const exist = await this.subCategoryRepository.findOne(
        subcategory.subCatName
      );

      if (exist) {
        throw new Error("SubCategory Already Exist");
      }
      const result = await cloudinary.uploader.upload(file.path);
      const imageUrl = result.secure_url;
      subcategory.subCatImage = imageUrl;
      return await this.subCategoryRepository.create(subcategory);
    } catch (error) {
      console.log("error during creating Subcategory", error);
      throw error;
    }
  }

  async updateSubCategory(
    id: string,
    subcategoryData: Partial<ISubCategory>,
    file?: Express.Multer.File
  ): Promise<ISubCategory | null> {
    try {
      const exist = await this.subCategoryRepository.findById(id);
      if (!exist) {
        throw new Error("Category update fail");
      }

      if (subcategoryData.subCatName) {
        const duplicateSubCategory = await this.subCategoryRepository.findOne(
          subcategoryData.subCatName
        );
        if (duplicateSubCategory && duplicateSubCategory.id !== id) {
          throw new Error("Category name must be unique");
        }
      }

      if (file) {
        const localPath = path.join(__dirname, "../../uploads", file.filename);

        if (!fs.existsSync(localPath)) {
          throw new Error(`File ${localPath} does not exist`);
        }

        const result = await cloudinary.uploader.upload(localPath);

        fs.unlinkSync(localPath);

        const subCategory = await this.subCategoryRepository.findById(id);
        if (subCategory?.subCatImage) {
          const publicId = subCategory.subCatImage
            .split("/")
            .pop()
            ?.split(".")[0];
          await cloudinary.uploader.destroy(publicId as string);
        }

        subcategoryData.subCatImage = result.secure_url;
      } else if (!subcategoryData.subCatImage) {
        const category = await this.subCategoryRepository.findById(id);
        subcategoryData.subCatImage = category?.subCatImage;
      }

      return await this.subCategoryRepository.update(id, subcategoryData);
    } catch (error) {
      console.log("error during updateing subcategory", error);

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
  async fetchSubcategoryById(id: string): Promise<ISubCategory | null> {
    try {
      const data = await this.subCategoryRepository.findById(id);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
