import { ICategoryRepository } from "../../repositories/interface/ICategoryRepository";
import { ICategory } from "../../entities/CategoryEntity";
import { ICategoryService } from "../interface/ICategoryService";
import CategoryRepository from "../../repositories/implementations/CategoryRepository";
import { ISubCategeryRepository } from "../../repositories/interface/ISubCategoryRepository";
import SubCategoryRepository from "../../repositories/implementations/SubCategoryRepository";
import cloudinary from "../../config/cloudinaryConfig";
import path from "path";
import fs from "fs";

export default class CategoryService implements ICategoryService {
  private categoryRepository: ICategoryRepository;
  private subcategoryRepository:ISubCategeryRepository;
  constructor() {
    this.categoryRepository = new CategoryRepository();
    this.subcategoryRepository= new SubCategoryRepository()
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

  async createCategory(
    category: ICategory,
    file: Express.Multer.File
  ): Promise<ICategory> {
    try {
      const exist = await this.categoryRepository.findOne(category.catName);
      if (exist) {
        throw new Error("Category Already Exist");
      }

      const result = await cloudinary.uploader.upload(file.path);
      const imageUrl = result.secure_url;
      category.catImage = imageUrl;

      return await this.categoryRepository.create(category);
    } catch (error) {
      console.log("error during creating category");
      throw error;
    }
  }

  async updateCategory(
    id: string,
    categoryData: Partial<ICategory>,
    file?: Express.Multer.File
  ): Promise<ICategory | null> {
    try {
      const exist = await this.categoryRepository.findById(id);
      if (!exist) {
        throw new Error("Category does not exist");
      }

      if (categoryData.catName) {
        const duplicateCategory = await this.categoryRepository.findOne(categoryData.catName);
        if (duplicateCategory && duplicateCategory.id !== id) {
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
  
      
        const category = await this.categoryRepository.findById(id);
        if (category?.catImage) {
          const publicId = category.catImage.split("/").pop()?.split(".")[0];
          await cloudinary.uploader.destroy(publicId as string);
        }
        
        categoryData.catImage = result.secure_url;
      } else if (!categoryData.catImage) {
    
        const category = await this.categoryRepository.findById(id);
        categoryData.catImage = category?.catImage;
      }
  
    
      return await this.categoryRepository.update(id, categoryData);
    } catch (error) {
      console.error("Error during updating category:", error);
      throw error;
    }
  }

  async deleteCategory(id: string): Promise<boolean> {
    try {
      const exist = await this.categoryRepository.findById(id);
      if (!exist) {
        return false;
      }
     const result= await this.categoryRepository.deleteCategory(id);
      if(result){
        const deletesubcat= await this.subcategoryRepository.deleteByCategory(exist.catName)
        return true
      }
      return false
    } catch (error) {
      throw error;
    }
  }

  async fetchcategoryById(id: string): Promise<ICategory | null> {
    try {
      const data = await this.categoryRepository.findById(id);
      return data;
    } catch (error) {
      throw error;
    }
  }
}
