import { Request, Response } from "express";
import AdminService from "../services/implementations/AdminService";
import { IAdminService } from "../services/interface/IAdminService";
import StudentService from "../services/implementations/StudentService";
import ExpertService from "../services/implementations/ExpertService";
import { IExpertService } from "../services/interface/IExpertService";
import { CustomRequest } from "../entities/jwtEntity";
import { IStudentService } from "../services/interface/IStudentService";


class AdminController {
  private adminService: IAdminService;
  private expertService: IExpertService;
  private studentService:IStudentService

  constructor() {
    this.adminService = new AdminService();
    this.expertService = new ExpertService();
    this.studentService= new StudentService
  }

  public loginAdmin = async (req: Request, res: Response): Promise<void> => {
    const { userName, password } = req.body;
    try {
      const { user_name, accessToken, refreshToken } =
        await this.adminService.login(userName, password);

      res.cookie("adminRefreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });
      res.status(200).json({
        success: true,
        message: "Admin logged in successfully",
        data: user_name,
        accessToken,
      });
    } catch (error) {
      res.status(500).json({
        message: "Invalid user name or password",
        success: false,
        data: error,
      });
    }
  };

  public logoutAdmin = async (
    req: CustomRequest,
    res: Response
  ): Promise<void> => {
    const userId = req.user?.userId;

    try {
      if (userId) {
        const response = await this.adminService.findAdminById(userId);
        if (response) {
          res.clearCookie("adminRefreshToken");
          res
            .status(200)
            .json({ message: "Logged out successfully", success: true });
        }
      }
    } catch (error) {
      res.status(500).json({ message: "admin id is missing ", success: false });
    }
  };

  public getAllExpert = async (req: Request, res: Response): Promise<void> => {
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

      const response = await this.expertService.getAllExperts(page, limit);


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
      console.log("error during get all users");

      res.status(500).json({
        message: "something went wrong on get all users ",
        success: false,
      });
    }
  };


  public getAllStudents = async (req: Request, res: Response): Promise<void> => {
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

      const response = await this.studentService.getAllStudents(page, limit);


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
      console.log("error during get all users");

      res.status(500).json({
        message: "something went wrong on get all users ",
        success: false,
      });
    }
  };

  public getExpertById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const response = await this.expertService.getExpertById(id);
      res.status(200).json({
        success: true,
        message: "expert details here",
        data: response,
      });
    } catch (error) {
      console.log("error during get expert by id ");

      res.status(500).json({
        message: "something went wrong on get expert by id ",
        success: false,
      });
    }
  };

  public getStudentById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const response = await this.studentService.getStudentById(id);
      res.status(200).json({
        success: true,
        message: "Student details here",
        data: response,
      });
    } catch (error) {
      console.log("error during get Student by id ");

      res.status(500).json({
        message: "something went wrong on get Student by id ",
        success: false,
      });
    }
  };

  public verifyExpert = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const response = await this.expertService.verifyExpert(id);
      res
        .status(200)
        .json({ success: response, message: "Expert verify True", data: "" });
    } catch (error) {
      console.log("error during get verify expert ");

      res.status(500).json({
        message: "something went wrong on verify expert",
        success: false,
      });
    }
  };

  public rejectExpert = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const { reason } = req.body;

    try {
      const response = await this.expertService.rejectExpert(id, reason);
      res.status(200).json({
        success: true,
        message: "Expert Profile is rejected",
        data: response,
      });
    } catch (error) {
      res.status(500).json({
        message: "something went wrong on Reject expert",
        success: false,
      });
    }
  };

  public handleblockExpert= async(req:Request,res:Response):Promise<void>=>{
    try {
      const id = req.params.id;
      const response= await this.expertService.hadleBlockExpert(id)
           
      res.status(200).json({
        success: true,
        message: response?.is_active ? "Expert Unblocked successfully":"Expert blocked successfully",
        data: response,
      });
    } catch (error) {
      res.status(500).json({
        message: "something went wrong on Blocking the expert",
        success: false,
      });
    }
  }
  public handleblockStudent= async(req:Request,res:Response):Promise<void>=>{
    try {
      const id = req.params.id;
      const response= await this.studentService.hadleBlockStudent(id)
           
      res.status(200).json({
        success: true,
        message: response?.is_active ? "Expert Unblocked successfully":"Expert blocked successfully",
        data: response,
      });
    } catch (error) {
      res.status(500).json({
        message: "something went wrong on Blocking the expert",
        success: false,
      });
    }
  }

  public fetchAllDetails= async(req:Request,res:Response):Promise<void>=>{
    try {
       const response = await this.adminService.fetchAllDetail()
           
      res.status(200).json({
        success: true,
        message: response,
        data: response,
      });
    } catch (error) {
      res.status(500).json({
        message: "something went wrong fetching all details",
        success: false,
      });
    }
  }
}



export default new AdminController();
