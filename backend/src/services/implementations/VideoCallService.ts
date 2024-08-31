import { IVideoCallService } from "../interface/IVideoCallService";
import { IVideoCallRepository } from "../../repositories/interface/IVideoCallRepository";
import VideoCallRepository from "../../repositories/implementations/VideoCallRepository";
import { IVideoCall } from "../../entities/VideoCallEntity";
import { IBookingRepository } from "../../repositories/interface/IBookingRepository";
import BookingRepository from "../../repositories/implementations/BookingRepository";
import { SendMail } from "../../utils/sendOtp";
import { IStudent } from "../../entities/StudentEntity";

export default class VideoCallService implements IVideoCallService {
  private videoCallRepository: IVideoCallRepository;
  private bookingRepository: IBookingRepository

  constructor() {
    this.videoCallRepository = new VideoCallRepository();
    this.bookingRepository= new BookingRepository()
  }

  async createNewvideoCall(
    videoCallDetails: Partial<IVideoCall>
  ): Promise<IVideoCall> {
    try {
      const result = await this.videoCallRepository.createvideoCall(
        videoCallDetails
      );
      if(videoCallDetails.bookingId){
        const bookingDetails= await this.bookingRepository.findById(videoCallDetails.bookingId.toString())
        const student= bookingDetails?.studentId as IStudent
        
        await  SendMail('Your VideoCall Link For NextStep',student.email,`your videoCall link is ${videoCallDetails.url}`)
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  async findVideoCallById(id: string): Promise<IVideoCall | null> {
    try {
      const result = await this.videoCallRepository.findById(id);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateVideoCall(
    id: string,
    data: Partial<IVideoCall>
  ): Promise<IVideoCall | null> {
    try {
      const existvideoCall = await this.videoCallRepository.findById(id);

      if (!existvideoCall) {
        throw new Error("Video Category is not found ");
      }
      const details = await this.videoCallRepository.updatedetails(id, data);
      const bookingDetails= await this.bookingRepository.findById(id)
      const student= bookingDetails?.studentId as IStudent
      await  SendMail('Your VideoCall Link For NextStep',student.email,`your videoCall link is ${data.url}`)
      
      return details;
    } catch (error) {
      throw error;
    }
  }


  async findAllMeetingDetails(id: string): Promise<IVideoCall[]> {
    try {

      const result= await this.videoCallRepository.findAllById(id)
      return result
      
    } catch (error) {
      throw error;
    }
  }

  async fetchAllDetails(): Promise<IVideoCall[]> {
    try {
      const result= await this.videoCallRepository.findAllVideoCall()
      return result
    } catch (error) {
      throw error;
    }
  }
}
