import { Request, Response } from "express";
import AdminService from "../services/implementations/AdminService";
import { IAdminService } from "../services/interface/IAdminService";
import StudentService from "../services/implementations/StudentService";
import ExpertService from "../services/implementations/ExpertService";
import { IExpertService } from "../services/interface/IExpertService";
import { CustomRequest } from "../entities/jwtEntity";
import { log } from "console";

class AdminController {
  private adminService: IAdminService;
  private expertService: IExpertService;

  constructor() {
    this.adminService = new AdminService();
    this.expertService = new ExpertService();
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
      const response = await this.expertService.getAllExperts();

      res.status(200).json({ success: true, message: "", data: response });
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
      res
        .status(200)
        .json({
          success: true,
          message: "Expert Profile is rejected",
          data: response,
        });
    } catch (error) {
      res.status(500).json({
        message: "something went wrong on verify expert",
        success: false,
      });
    }
  };
}

export default new AdminController();
