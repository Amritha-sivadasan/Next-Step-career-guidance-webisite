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
      `${API_URL}/expert/videoCall/${id}`
    );
    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const findAllvideoCallByExpert = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/expert/get-all-meeting-history`);
    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};
