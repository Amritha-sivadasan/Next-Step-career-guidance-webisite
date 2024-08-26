import { IVideoCallRepository } from "../interface/IVideoCallRepository";
import { IVideoCall } from "../../entities/VideoCallEntity";
import { VideoCall } from "../../models/videoCallSchema";


export default class VideoCallRepository implements IVideoCallRepository{
  async findById(bookingId: string): Promise<IVideoCall|null> {
      try {
       
    const result = await VideoCall.findOne({bookingId})
    return  result

      } catch (error) {
        throw error
      }
  }
  async createvideoCall(videoCallDetails: Partial<IVideoCall>): Promise<IVideoCall> {
      try {
         const newVideoCall = new VideoCall(videoCallDetails)
         return newVideoCall.save()
        
      } catch (error) {
        throw error
      }
  }


  async updatedetails(bookingId: string, data: Partial<IVideoCall>): Promise<IVideoCall | null> {
      try {
        const result = await VideoCall.findOneAndUpdate({bookingId},{$set:data}, { new: true } ).exec()

        return result
        
      } catch (error) {
        throw error
      }
  }
}