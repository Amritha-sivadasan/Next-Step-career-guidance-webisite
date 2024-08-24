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
}


export  default new VideoCallController()