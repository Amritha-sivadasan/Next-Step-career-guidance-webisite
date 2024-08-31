import { IvidoeCall } from "../../@types/videoCall";
import { axiosInstance } from "../instance/expertInstance";
import { studentAxiosInstance } from "../instance/userInstance";

const API_URL = process.env.VITE_API_URL;

interface Error {
  response?: {
    data?: {
      message: string;
    };
  };
}
export const createVideoCall = async (
  videoCallDetails: Partial<IvidoeCall>
) => {
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
};

export const updateVideoCall = async (
  id: string,
  data: Partial<IvidoeCall>
) => {
  try {
    const response = await axiosInstance.put(
      `${API_URL}/expert/updateVideoCall/${id}`,
      data,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const getVideoCallDetails = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `${API_URL}/expert/videoCall/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const findAllvideoCallByExpert = async () => {
  try {
    const response = await axiosInstance.get(
      `${API_URL}/expert/get-all-meeting-history`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const findAllvideoCallStudent = async () => {
  try {
    const response = await studentAxiosInstance.get(
      `${API_URL}/student/get-all-meeting-history`
    );
    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const sendNotification = async (title:string,body:string,deviceToken:string,role:string) => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}/expert/sendfirbaseNotification`,
      { title, body ,deviceToken,role}
    );
    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const sendNotificationUser = async (title:string,body:string,deviceToken:string,role:string) => {
  try {
    const response = await studentAxiosInstance.post(
      `${API_URL}/student/sendfirbaseNotification`,
      { title, body ,deviceToken,role}
    );
    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};