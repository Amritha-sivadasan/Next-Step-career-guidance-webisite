import { IVideoCall } from "../../entities/VideoCallEntity";

export interface IVideoCallRepository {
    findById(bookingId:string):Promise<IVideoCall>
    createvideoCall(videoCallDetails:Partial<IVideoCall>):Promise<IVideoCall>
    updateVideoCall(bookingId:string,data:Partial<IVideoCall>):Promise<IVideoCall|null>
}