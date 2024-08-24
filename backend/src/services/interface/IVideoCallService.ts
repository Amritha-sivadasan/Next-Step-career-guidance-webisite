import { IVideoCall } from "../../entities/VideoCallEntity";

export interface IVideoCallService {
    createNewvideoCall(videoCallDetails:Partial<IVideoCall>):Promise<IVideoCall>
     findVideoCallById(id:string):Promise<IVideoCall>
     updateVideoCall(id:string,data:Partial<IVideoCall>):Promise<IVideoCall|null>
}