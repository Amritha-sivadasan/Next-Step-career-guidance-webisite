import { IVideoCallService } from "../interface/IVideoCallService";
import { IVideoCallRepository } from "../../repositories/interface/IVideoCallRepository";
import VideoCallRepository from "../../repositories/implementations/VideoCallRepository";
import { IVideoCall } from "../../entities/VideoCallEntity";


export default class VideoCallService implements IVideoCallService{
     private videoCallRepository :IVideoCallRepository

     constructor(){
        this.videoCallRepository= new VideoCallRepository()
     }

   async createNewvideoCall(videoCallDetails: Partial<IVideoCall>): Promise<IVideoCall> {
       try {
       const result = await this.videoCallRepository.createvideoCall(videoCallDetails)
       return result
        
       } catch (error) {
        throw error
       }
   }

   async findVideoCallById(id: string): Promise<IVideoCall> {
       try {
         const result = await this.videoCallRepository.findById(id)
         return result
       } catch (error) {
        throw error

       }
   }

   async updateVideoCall(id: string, data: Partial<IVideoCall>): Promise<IVideoCall|null> {
       try {
          const existvideoCall= await this.videoCallRepository.findById(id)
          if(!existvideoCall){
            throw new Error("Video Category is not found ")
          }

         const details = await this.videoCallRepository.updateVideoCall(id,data)
         return details

       } catch (error) {
        throw error
       }
   }
}