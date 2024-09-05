import { Request, Response } from "express";
import StudentService from "../services/implementations/StudentService";
import OtpService from "../services/implementations/OtpService";
import { CustomRequest } from "../entities/jwtEntity";

class StudentController {
  private studentService: StudentService;
  private otpService: OtpService;
  constructor() {
    this.studentService = new StudentService();
    this.otpService = new OtpService();
  }

  public createStudent = async (req: Request, res: Response): Promise<void> => {
    try {
      let exitStudent = await this.studentService.exitStudent(req.body.email);
      if (exitStudent) {
        res.status(409).json({ success: false, message: "user already exist" });
      } else {
        const { student, accessToken, refreshToken } =
          await this.studentService.createStudent(req.body);
        const studentObject = student;
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
        });
        res.status(201).json({
          success: true,
          Message: "student created successfully",
          data: studentObject,
          accessToken,
        });
      }
    } catch (error) {
      res.status(500).json({ message: "", error, success: false });
    }
  };

  public updateStudent = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { updateData } = req.body;
    try {
      const updatedStudent = await this.studentService.updateStudent(
        id,
        updateData
      );
      if (updatedStudent) {
        res.status(200).json({
          success: true,
          Message: "User updated successfully",
          data: updatedStudent,
        });
      } else {
        res.status(404).json({ success: false, Message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error occurred while updating user",
        error,
        success: false,
      });
    }
  };

  public loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
      const { student, accessToken, refreshToken } =
        await this.studentService.login(email, password);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: false,
        secure: false,
        sameSite: "lax",
      });
      res.status(200).json({
        success: true,
        data: student,
        accessToken,
        message: "User logged successfully",
      });
    } catch (error: any) {
      if (error.message === "You are blocked please try with another email") {
        res.status(403).json({ message: error.message, success: false });
      } else if (error.message === "Invalid email or password") {
        res.status(401).json({ message: error.message, success: false });
      } else {
        res
          .status(500)
          .json({
            message: "An internal server error occurred",
            success: false,
          });
      }
    }
  };

  public resetPassword = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
      await this.studentService.updatePassword(email, password);
      res
        .status(200)
        .json({ success: true, Message: "Password updated successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "something went wrong", error, success: false });
    }
  };

  public forgotPassword = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { email } = req.body;
    try {
      let {accessToken} = await this.studentService.verifyForgotPasswordEmail(email);;
      res.status(200).json({
        success: true,
        message: "OTP generated and sent successfully",
        data: email,
        forgotUserAccess:accessToken
        
      });
    } catch (error:any) {
      if (error.message === "User is not Exist") {
        res.status(403).json({ message: error.message, success: false });
      }  else {
        res
          .status(500)
          .json({
            message: "An internal server error occurred",
            success: false,
          });
      }
    }
  };

  public fetchUserById = async (
    req: CustomRequest,
    res: Response
  ): Promise<void> => {
    const userId = req.user?.userId;
    try {
      if (userId) {
        const result = await this.studentService.getStudentById(userId);
        res.status(200).json({ success: true, data: result });
      } else {
        res
          .status(500)
          .json({ message: "Error occur in fetchdata", success: false });
      }
    } catch (error) {
      console.log("Error occur on the fetch user", error);
      res
        .status(500)
        .json({ message: "Error occur in fetchdata", success: false });
    }
  };

  public logoutStuent = async (req: CustomRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (userId) {
        const exist = await this.studentService.getStudentById(userId);
        if (exist) {
          res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
          });
          res
            .status(200)
            .json({ success: true, message: "Logged out successfully" });
        }
      }
    } catch (error) {
      console.error("Error occurred during logout:", error);
      res
        .status(500)
        .json({ success: false, message: "Error occurred during logout" });
    }
  };

  public updateuserImage = async (req: CustomRequest, res: Response) => {
    try {
      const file = req.file;
      const student = req.body;
      const id = req.user?.userId;

      const result = await this.studentService.updateStudentData(
        id!,
        student,
        file
      );
      if (result) {
        res.status(200).json({
          success: true,
          Message: "image updated successfully",
          data: result,
        });
      } else {
        res.status(404).json({ success: false, Message: "User not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error occurred during update User" });
    }
  };

  public updateuserData = async (req: CustomRequest, res: Response) => {
    try {
      const student = req.body;
      const id = req.user?.userId;

      const result = await this.studentService.updateStudentData(id!, student);
      if (result) {
        res.status(200).json({
          success: true,
          Message: "image updated successfully",
          data: result,
        });
      } else {
        res.status(404).json({ success: false, Message: "User not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error occurred during update User" });
    }
  };

  public checkUserStatus = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const response = await this.studentService.checkUserStatus(userId!);
     

        res.status(200).json({
          success: true,
          Message: "student is not blocked",
          data: response,
        });
      
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error occurred finding user" });
    }
  };
}

export default new StudentController();
