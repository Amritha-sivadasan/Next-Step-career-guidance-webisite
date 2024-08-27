import { IVideoCall } from "../../entities/VideoCallEntity";

export interface IVideoCallRepository {
    findById(bookingId:string):Promise<IVideoCall|null>
    createvideoCall(videoCallDetails:Partial<IVideoCall>):Promise<IVideoCall>
    updatedetails(bookingId:string,data:Partial<IVideoCall>):Promise<IVideoCall|null>
    findAllById(id:string):Promise<IVideoCall[]>
}