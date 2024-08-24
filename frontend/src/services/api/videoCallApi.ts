import { IvidoeCall } from "../../@types/videoCall";
import { axiosInstance } from "../instance/expertInstance";

const API_URL = process.env.VITE_API_URL;

interface Error {
  response?: {
    data?: {
      message: string;
    };
  };
}
export const createVideoCall= async(videoCallDetails:Partial<IvidoeCall>)=>{
    try {
        const response = await axiosInstance.post(
            `${API_URL}/expert/createVideocall`,
            videoCallDetails,
            {
              withCredentials: true,
            }
          );
      
          return response.data;
        
    } catch (error) {
        return (error as Error).response?.data;
    }
}