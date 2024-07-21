import { Request, Response } from "express";
import AdminService from "../services/implementations/AdminService";

class AdminController {
  private adminService: AdminService;

  constructor() {
    this.adminService = new AdminService();
  }

  public loginAdmin = async (req: Request, res: Response): Promise<void> => {
    const { user_name, password } = req.body;
    try {
      const { admin, accessToken, refreshToken } = await this.adminService.login(user_name, password);
      res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'strict' });
      res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
      res.status(200).json({ success: true, message: "Admin logged in successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error occurred during admin login", error, success: false });
    }
  };

  
}

export default new AdminController();
