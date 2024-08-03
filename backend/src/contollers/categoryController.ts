import { Request, response, Response } from "express";
import { CustomRequest } from "../entities/jwtEntity";
import CategoryService from "../services/implementations/CategoryService";
import { ICategoryService } from "../services/interface/ICategoryService";

class CategoryController {
  private categoryService: ICategoryService;
  constructor() {
    this.categoryService = new CategoryService();
  }

  public findAllCategroy = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const page: number = parseInt(req.query.page as string, 10) || 1;
      const limit: number = parseInt(req.query.limit as string, 10) || 10;
      if (page <= 0 || limit <= 0) {
        res.status(400).json({
          message: "Invalid page or limit value",
          success: false,
        });
        return;
      }
      const response = await this.categoryService.getAllCategory(page,limit);
      res.status(200).json({
        success: true,
        message: "",
        data: {
          items: response.items,
          pagination: {
            totalCount: response.totalCount,
            totalPages: response.totalPages,
            currentPage: response.currentPage,
            perPage: limit,
          },
        }
      });
    } catch (error) {
      console.log("error in finding category");
      res
        .status(500)
        .json({ success: false, message: "cannot find any category", error });
    }
  };

  public CreateCategory = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const file = req.file;

      if (file) {
        const response = await this.categoryService.createCategory(
          req.body,
          file
        );
        res.status(201).json({
          success: true,
          message: "category created Successfully",
          data: response,
        });
      }
    } catch (error) {
      console.log("error in creating category");
      res
        .status(500)
        .json({ success: false, message: "category already exist", error });
    }
  };

  public EditCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const file = req.file;

      const response = await this.categoryService.updateCategory(
        id,
        req.body,
        file
      );
      res.status(200).json({
        success: true,
        message: "Update category successfull",
        data: response,
      });
    } catch (error) {
      console.log("error during edit category", error);
      if (error === "Category name must be unique") {
        res.status(400).json({
          success: false,
          message: error,
        });
      } else {
        // Handle other errors
        res.status(500).json({
          success: false,
          message: "Category name must be unique",
          error: error,
        });
      }
    }
  };

  public deleteCategory = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const id = req.params.id;
      const response = await this.categoryService.deleteCategory(id);
      res.status(200).json({
        success: true,
        message: "deleted category category successfull",
        data: response,
      });
    } catch (error) {
      console.log("error during delete category", error);
      res.json(500).json({
        success: false,
        message: "something went wrong on delete category",
        error,
      });
    }
  };

  public findCategoryById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const id = req.params.id;
      const response = await this.categoryService.fetchcategoryById(id);
      if (response) {
        res.status(200).json({ success: true, message: "", data: response });
      }
    } catch (error) {
      console.log("error during fetching category", error);
      res.json(500).json({
        success: false,
        message: "something went wrong on fetching category",
        error,
      });
    }
  };
}

export default new CategoryController();
