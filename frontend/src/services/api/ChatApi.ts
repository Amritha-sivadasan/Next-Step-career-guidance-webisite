import { studentAxiosInstance } from "../instance/userInstance";
import { axiosInstance } from "../instance/expertInstance";

const API_URL = process.env.VITE_API_URL;

interface Error {
  response?: {
    data?: {
      message: string;
    };
  };
}

export const getChatByStudnetId = async () => {
  try {
    const response = await studentAxiosInstance.get(`${API_URL}/student/fetAllChat`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const getChatByExpertId  = async()=>{
    try {
        const response = await axiosInstance.get(`${API_URL}/expert/fetAllChat`, {
          withCredentials: true,
        });
    
        return response.data;
      } catch (error) {
        return (error as Error).response?.data;
      }
}