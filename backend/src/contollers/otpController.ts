import { Request, Response } from "express";
import OtpService from "../services/implementations/OtpService";

class OtpController {
  private otpservice: OtpService;
  constructor() {
    this.otpservice = new OtpService();
  }

  public createOtp = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }
    try {
      const context = "otp is created for NextStep application ";
      await this.otpservice.generateOtp(email, context);
      res.status(200).json({ message: "OTP generated and sent successfully" });
    } catch (error) {
      console.error("Error generating OTP:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  public verifyOtp = async (req: Request, res: Response): Promise<void> => {
    const { email, otp } = req.body;
  
    
    try {
      let verify = await this.otpservice.verifyOtp(email, otp);

      if (verify) {
        res.status(200).json({success:true, message: "otp verifcation successfull" });
      } else {
        res.status(400).json({success:false, message: "Invalid OTP or email" });
      }
    } catch (error) {
      console.log('error in conroller verifyotp',error);
      
    }
  };
}

export default new OtpController();
