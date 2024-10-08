import { studentAxiosInstance } from "../instance/userInstance";
import { axiosInstance } from "../instance/expertInstance";

const API_URL = import.meta.env.VITE_API_URL

interface Error {
  response?: {
    data?: {
      message: string;
    };
  };
}

export const getChatByStudnetId = async () => {
  try {
    const response = await studentAxiosInstance.get(
      `${API_URL}/student/fetAllChat`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const getChatByExpertId = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/expert/fetAllChat`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const sendMessageByStudent = async (message: FormData) => {
  try {
    const response = await studentAxiosInstance.post(
      `${API_URL}/student/saveMessage`,
      message,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const sendMessageByExpert = async (message: FormData) => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}/expert/saveMessage`,
      message,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const getMessageByChatIdByStudent = async (id: string) => {
  try {

    const response = await studentAxiosInstance.get(
      `${API_URL}/student/fetchChatById/${id}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const getMessageByChatIdExpert = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `${API_URL}/expert/fetchChatById/${id}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const deleteMessageByStudent = async (id: string) => {
  try {
    const response = await studentAxiosInstance.delete(
      `${API_URL}/student/deleteMessage/${id}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const deleteMessageByExpert = async (id: string) => {
  try {
    const response = await axiosInstance.delete(
      `${API_URL}/expert/deleteMessage/${id}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};



export const getNotificationsByChatId = async (
  chatId: string,
  userId: string
) => {
  try {
    const response = await studentAxiosInstance.get(
      `${API_URL}/student/getNotification?chatId=${chatId}&userId=${userId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const getNotificationsByExpert = async (
  chatId: string,
  userId: string
) => {
  try {
    const response = await axiosInstance.get(
      `${API_URL}/expert/getNotification?chatId=${chatId}&userId=${userId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const updateNotification = async (chatId: string, userId: string) => {
  try {
    const response = await studentAxiosInstance.patch(
      `${API_URL}/student/updateNotification?chatId=${chatId}&userId=${userId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};
