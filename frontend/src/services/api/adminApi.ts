import axios from "axios";
import { adminAxiosInstance } from "../instance/adminInstance";

const API_URL = process.env.VITE_API_URL;

interface Error {
  response?: {
    data?: {
      message: string;
    };
  };
}

export const adminLogin = async (userName: string, password: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/admin/login`,
      { userName, password },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.log("response form admin login ", error);
    throw error;
  }
};

export const adminLogout = async () => {
  try {
    const response = await adminAxiosInstance.get(`${API_URL}/admin/logout`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const fetchExpertDetailsById = async (expertId: string) => {
  try {
    const response = await adminAxiosInstance.get(
      `${API_URL}/admin/expertById/${expertId}`,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const verifyExpert = async (expertId: string) => {
  try {
    const response = await adminAxiosInstance.patch(
      `${API_URL}/admin/verifyExpert/${expertId}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const rejectExpert = async (expertId: string, reason: string) => {
  try {
    const response = await adminAxiosInstance.patch(
      `${API_URL}/admin/rejectExpert/${expertId}`,
      { reason },
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};
