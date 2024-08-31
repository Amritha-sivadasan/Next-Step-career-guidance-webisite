import { IVideoCallService } from "../services/interface/IVideoCallService";
import VideoCallService from "../services/implementations/VideoCallService";
import { Request,Response } from "express";
import { CustomRequest } from "../entities/jwtEntity";


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

   public findVideoCallByBooking= async(req:Request,res:Response):Promise<void>=>{
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


   public  findMeetingDetailsById= async(req:CustomRequest,res:Response)=>{
    try {
      const id= req.user?.userId
      const response= await this.videoCallServive.findAllMeetingDetails(id!)
      res.status(200).json({message:'Success full find the meetign details',data:response,success:true})
    } catch (error) {
        res
        .status(500)
        .json({ success: false, message: "something went wrong on finding videocall details", error });
    }
   }


   public  findAllDetails = async(req:Request,res:Response)=>{
    try {
        const response= await this.videoCallServive.fetchAllDetails()
        res.status(200).json({message:'Success full find the meetign details',data:response,success:true})
        
    } catch (error) {
        res
        .status(500)
        .json({ success: false, message: "something went wrong on finding videocall details", error });
    }
   }
}




export  default new VideoCallController()