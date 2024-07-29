import axios, { AxiosResponse } from "axios";
import { IStudent } from "../../@types/user";
import { axiosInstance } from "../instance/userInstance";

const API_URL = process.env.VITE_API_URL;

interface Error {
  response?: {
    data?: {
      message: string;
    };
  };
}

interface ForgotPasswordResponse {
  success: string;
  message: string;
  data: string;
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

export const sendOtp = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}/student/otp-send`, { email });
    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const googleSignup = async (token: string) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${API_URL}/student/google-login`,
      { token },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error("Error occurred during Google Signup", error);
    throw error;
  }
};

export const userRegister = async (userData: IStudent) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${API_URL}/student/register`,
      userData,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error("Error occurred during userRegister ", error);
    throw error;
  }
};

export const verifyOtp = async (email: string, otp: string) => {
  try {
    const response: AxiosResponse = await axios.post(
      `${API_URL}/student/verify-otp`,
      { email, otp },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error("Error occurred during userRegister ", error);
    throw error;
  }
};

export const updatestudent = async (
  userId: string,
  updateData: Partial<IStudent>
) => {
  try {
    const response = await axiosInstance.put(
      `${API_URL}/student/update/${userId}`,
      { updateData },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.error("Error occurred during update user ", error);
    throw error;
  }
};

export const fetchUserData = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/student`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    throw error;
  }
};

export const loginStudent = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/student/login`,
      { email, password },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.log("error in login student");
    throw error;
  }
};

export const forgotPassword = async (
  email: string
): Promise<ForgotPasswordResponse> => {
  try {
    const response = await axios.post(`${API_URL}/student/forgot-password`, {
      email,
    });
    return {
      success: response.data.success,
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: "false",
      message: (error as Error).response?.data?.message || "An error occurred",
      data: "",
    };
  }
};

export const resetPasssword = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/student/reset-password`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    console.error("Error occurred during update user ", error);
    throw error;
  }
};
