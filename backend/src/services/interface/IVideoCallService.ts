import { IVideoCall } from "../../entities/VideoCallEntity";

export interface IVideoCallService {
    createNewvideoCall(videoCallDetails:Partial<IVideoCall>):Promise<IVideoCall>
     findVideoCallById(id:string):Promise<IVideoCall|null>
     updateVideoCall(id:string,data:Partial<IVideoCall>):Promise<IVideoCall|null>
     findAllMeetingDetails(id:string):Promise<IVideoCall[]>
     fetchAllDetails():Promise<IVideoCall[]>
}