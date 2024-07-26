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
      // const updatedExpert= await 
      
    } catch (error) {
      
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

}

export default new ExpertController(); 