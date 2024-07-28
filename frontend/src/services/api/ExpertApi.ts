import axios, { AxiosResponse } from "axios";
import { IExpert } from "../../@types/expert";
import { axiosInstance } from "./instance/expertInstance";

const API_URL = process.env.VITE_API_URL;

interface Error {
  response?: {
    data?: {
      message: string;
    };
  };
}

export async function checkIfUserIsBlocked() {
  try {
    const response = await axios.get(`${API_URL}/check-report-user`, {
      withCredentials: true,
    });

    if (response.status === 403) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error checking if user is blocked:", error);
    return false;
  }
}

export const sendOtpExpert = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}/expert/otp-send`, { email });
    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const googleSignupExpert = async (token: string) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${API_URL}/expert/google-login`,
      { token },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error("Error occurred during Google Signup", error);
    throw error;
  }
};

export const expertRegister = async (userData: IExpert) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${API_URL}/expert/register`,
      userData,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error("Error occurred during userRegister ", error);
    throw error;
  }
};

export const verifyOtpExpert = async (email: string, otp: string) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${API_URL}/expert/verify-otp`,
      { email, otp },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error("Error occurred during userRegister ", error);
    throw error;
  }
};

export const updateExpert = async (
  expertId: string,
  updateData: FormData

) => {
  try {

    const response = await axiosInstance.put(
      `${API_URL}/expert/update/${expertId}`,
      updateData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.error("Error occurred during update user ", error);
    throw error;
  }
};

export const fetchExpertData = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/expert`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    throw error;
  }
};

export const loginExpert = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/expert/login`,
      { email, password },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.log("error in login student");
    throw error;
  }
};
