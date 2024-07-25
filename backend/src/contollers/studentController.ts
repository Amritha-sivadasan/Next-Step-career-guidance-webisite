import { Request, Response } from "express";
import StudentService from "../services/implementations/StudentService";
import OtpService from "../services/implementations/OtpService";

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
        res.status(409).json({ success: false, Message: "user already exist" });
      } else {
        const { student, accessToken, refreshToken } = await this.studentService.createStudent(req.body); 
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
        res
          .status(200)
          .json({
            success: true,
            Message: "User updated successfully",
            data: updatedStudent,
          });
      } else {
        res.status(404).json({ success: false, Message: "User not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error occurred while updating user",
          error,
          success: false,
        });
    }
  };

  public loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
      const { accessToken, refreshToken } = await this.studentService.login(
        email,
        password
      );
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });
      res
        .status(200)
        .json({ success: true, Message: "User logged successfully" });
    } catch (error) {
      res.status(500).json({ message: "", error, success: false });
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
      res.status(500).json({ message: "", error, success: false });
    }
  };

  public forgotPassword = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { email } = req.body;
    try {
      let exitStudent = await this.studentService.exitStudent(email);
      if (!exitStudent) {
        res
          .status(404)
          .json({ messsage: "User not found try another valid email " });
      } else {
        const context = "otp is created for NextStep application ";
        await this.otpService.generateOtp(email, context);
        res
          .status(200)
          .json({ message: "OTP generated and sent successfully" });
      }
    } catch (error) {
      res.status(500).json({
        message: "error occur on forgot password",
        error,
        success: false,
      });
    }
  };
}

export default new StudentController();
