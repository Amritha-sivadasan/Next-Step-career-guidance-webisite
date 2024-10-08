import { ISlot } from "../../@types/slot";
import { axiosInstance } from "../instance/expertInstance";
import { studentAxiosInstance } from "../instance/userInstance";

const API_URL = import.meta.env.VITE_API_URL;

interface Error {
  response?: {
    data?: {
      message: string;
    };
  };
}

export const addNewSlot = async (newSlot: ISlot) => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}/expert/addSlot`,
      newSlot,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const getAllSlots = async (expertId: string) => {
  try {
    const response = await axiosInstance.get(
      `${API_URL}/expert/getAllSlot/${expertId}`,
      {
        withCredentials: true,
      }
    );

    console.log("response for all slot ", response);

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const getAllSlotsByStudent = async (expertId: string) => {
  try {
    const response = await studentAxiosInstance.get(
      `${API_URL}/student/getAllSlot/${expertId}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const deleteSlot = async (id: string) => {
  try {
    const response = await axiosInstance.delete(
      `${API_URL}/expert/deleteSlot/${id}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};
