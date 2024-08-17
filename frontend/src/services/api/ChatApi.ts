import { studentAxiosInstance } from "../instance/userInstance";
import { axiosInstance } from "../instance/expertInstance";
import { IMessage } from "../../@types/message";

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

export const sendMessageByStudent = async(message:Partial<IMessage>)=>{
  try {
    const response = await studentAxiosInstance.post(`${API_URL}/student/saveMessage`,message ,{
      withCredentials: true,
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
}

export const sendMessageByExpert = async(message:Partial<IMessage>)=>{
  try {
    const response = await axiosInstance.post(`${API_URL}/expert/saveMessage`,message ,{
      withCredentials: true,
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
}


export const getMessageByChatIdByStudent= async (id:string) => {
  try {
    const response = await studentAxiosInstance.get(`${API_URL}/student/fetchChatById/${id}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};


export const getMessageByChatIdExpert= async (id:string) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/expert/fetchChatById/${id}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};