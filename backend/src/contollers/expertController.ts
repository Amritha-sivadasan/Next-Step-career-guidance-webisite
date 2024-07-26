import { Request, Response } from "express";
import ExpertService from "../services/implementations/ExpertService";
import OtpService from "../services/implementations/OtpService";

 class ExpertController {
   
    private expertService: ExpertService;
    private otpService: OtpService;
    constructor() {
      this.expertService = new ExpertService();
      this.otpService=new OtpService()
    }
  
    public createExpert = async (req: Request, res: Response): Promise<void> => {
        try {
          let exitExpert=await this.expertService.exitExpert(req.body.email)
          if(exitExpert){
            res.status(409 ).json({success:false,Message:"user already exist",})
          }else{
            const { expert, accessToken, refreshToken } = await this.expertService.createdExpert(req.body);
            
            res.cookie('ExpertRefreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'lax' });
            res.status(201).json({success:true,Message:"Expert created successfully",accessToken,data:expert});
          }
        } catch (error) {
          res.status(500).json({ message:"Something wrong while creating",success:false });
        }
      };

   public loginExpert=async (req:Request,res:Response):Promise<void>=>{
    const {email,password}=req.body
    try {    
      const { expert, accessToken, refreshToken } =await this.expertService.login(email,password)
     
      res.cookie('ExpertRefreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
      res.status(200).json({success:true,Message:"User logged successfully",accessToken,data:expert});
      
    } catch (error) {
      res.status(500).json({ message:"",error,success:false });
    }
    
   }

   public updateExpert=async(req:Request,res:Response):Promise<void>=>{
    const {id}=req.params
    const {updatedDate}=req.body
    try {
      const updatedExpert= await this.expertService.updateExpertData(id,updatedDate)
      if(updatedExpert){
        res
          .status(200)
          .json({
            success: true,
            Message: "User updated successfully",
            data: updatedExpert,
          });
      }else{
        res.status(404).json({ success: false, Message: "User not found" });
      }
      
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error occurred while updating Expert",
          error,
          success: false,
        });
    }
   }


   public resetPassword=async(req:Request,res:Response):Promise<void>=>{
    const{email,password}=req.body
    try {
      await this.expertService.updatePassword(email,password)
      res.status(200).json({success:true,Message:"Password updated successfully"});
      
    } catch (error) {
      res.status(500).json({ message:"",error,success:false });
    }
   }

   public forgotPassword=async(req:Request,res:Response):Promise<void>=>{
        const {email}=req.body
       try {
        let existExpert=await this.expertService.exitExpert(email)
        if(!existExpert){
         res.status(404).json({messsage:'User not found try another valid email '})
        }else{
          const context = "otp is created for NextStep application ";
          await this.otpService.generateOtp(email, context);
          res.status(200).json({ message: "OTP generated and sent successfully" })
        }
        
       } catch (error) 
       {
        res.status(500).json({ message:"error occur on forgot password",error,success:false });
       }    

    
   }
   

   public createOtp = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;
    const existUser= await this.expertService.exitExpert(email)
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
      await this.otpService.generateOtp(email, context);
      res.status(200).json({ message: "OTP generated and sent successfully",success:true });
    } catch (error) {
      console.error("Error generating OTP:", error);
      res.status(500).json({ message: "Internal server error",success:false });
    }
  };

  public verifyOtp = async (req: Request, res: Response): Promise<void> => {
    const { email, otp } = req.body;
    try {
      let verify = await this.otpService.verifyOtp(email, otp);

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

export default new ExpertController(); 