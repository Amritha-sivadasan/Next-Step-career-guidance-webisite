import { Request, Response } from "express";
import OtpService from "../services/implementations/OtpService";
import { IOtpService } from "../services/interface/IOtpService";
import { IStudentService } from "../services/interface/IStudentService";
import StudentService from "../services/implementations/StudentService";

class OtpController {
  private otpservice: IOtpService;
  private studentService: IStudentService;
  constructor() {
    this.otpservice = new OtpService();
    this.studentService=new StudentService()
  }

  public createOtp = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;
    const existUser= await this.studentService.exitStudent(email)
    if(existUser){
      res.status(409).json({message:'User already exist',succss:false})
      return
    }
    if (!email) {
      res.status(400).json({ message: "Email is required" ,success:false});
      return;
    }
    try {
      const context = "otp is created for NextStep application ";
      await this.otpservice.generateOtp(email, context);
      res.status(200).json({ message: "OTP generated and sent successfully",success:true });
    } catch (error) {
      console.error("Error generating OTP:", error);
      res.status(500).json({ message: "Internal server error",success:false });
    }
  };

  public verifyOtp = async (req: Request, res: Response): Promise<void> => {
    const { email, otp } = req.body;
    try {
      let verify = await this.otpservice.verifyOtp(email, otp);
      if (verify) {
        res.status(200).json({success:true, message: "otp verifcation successfull for student" });
      } else {
        res.status(400).json({success:false, message: "Invalid OTP or email" });
      }
    } catch (error) {
      console.log('error in conroller verifyotp',error);
      
    }
  };
}

export default new OtpController();
