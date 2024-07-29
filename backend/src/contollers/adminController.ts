import { Request, Response } from "express";
import AdminService from "../services/implementations/AdminService";
import { CustomRequest } from "../entities/jwtEntity";

class AdminController {
  private adminService: AdminService;

  constructor() {
    this.adminService = new AdminService();
  }

  public loginAdmin = async (req: Request, res: Response): Promise<void> => {
    const { userName, password } = req.body;
    try {
      const { user_name, accessToken, refreshToken } = await this.adminService.login(userName, password)

      res.cookie('adminRefreshToken', refreshToken, { httpOnly: true, secure: false, sameSite: 'strict' });
      res.status(200).json({ success: true, message: "Admin logged in successfully",data:user_name,accessToken });
    } catch (error) {
      res.status(500).json({ message: "Error occurred during admin login", error, success: false });
    }
  };

  public logoutAdmin= async(req:CustomRequest,res:Response):Promise<void>=>{
    const userId=req.user?.userId 
    try {
      if(userId){
        const response= await this.adminService.findAdminById(userId)
        if(response){
          res.clearCookie('adminRefreshToken');
          res.status(200).json({ message: "Logged out successfully",success:true});
        }
      }
    } catch (error) {
    res.status(500).json({message:'admin id is missing ',success:false})
    }
  
  
    
  }

  
}

export default new AdminController();
