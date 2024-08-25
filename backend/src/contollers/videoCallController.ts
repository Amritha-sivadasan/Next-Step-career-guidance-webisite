import { IVideoCallService } from "../services/interface/IVideoCallService";
import VideoCallService from "../services/implementations/VideoCallService";
import { Request,Response } from "express";


class VideoCallController {
    private videoCallServive:IVideoCallService
    constructor(){
        this.videoCallServive=new VideoCallService()
    }

   public createVideoCall= async(req:Request,res:Response):Promise<void>=>{
    try {
     const response= await this.videoCallServive.createNewvideoCall(req.body)
      res.status(200).json({success:true,data:response,message:"Successfully created videoCall"})   
    } catch (error) {
        res
        .status(500)
        .json({ success: false, message: "something went wrong on Creating a vidoeCall", error });
    }
   } 


   public updateVideoCall= async(req:Request,res:Response):Promise<void>=>{
    try {
        const{id}=req.params 
  
        const response= await this.videoCallServive.updateVideoCall(id,req.body)
        res.status(200).json({success:true,data:response,message:"Successfully created videoCall"})   
        
    } catch (error) {
        res
        .status(500)
        .json({ success: false, message: "something went wrong on updating a vidoeCall", error });
    }
   }

   public findVideoCallByBookin= async(req:Request,res:Response):Promise<void>=>{
    try {
        const{id}=req.params 
  
        const response= await this.videoCallServive.findVideoCallById(id)
        res.status(200).json({success:true,data:response,message:"Successfully created videoCall"})   
        
    } catch (error) {
        res
        .status(500)
        .json({ success: false, message: "something went wrong on updating a vidoeCall", error });
    }
   }
}


export  default new VideoCallController()