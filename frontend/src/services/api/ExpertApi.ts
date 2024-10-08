import axios, { AxiosResponse } from "axios";
import { IExpert } from "../../@types/expert";
import { axiosInstance } from "../instance/expertInstance";

const API_URL = import.meta.env.VITE_API_URL

interface Error {
  response?: {
    data?: {
      message: string;
    };
  };
}

interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  data: string;
  forgotExpertAccess:string
}

export async function checkIfExpertIsBlocked() {
  try {
    const expertId = localStorage.getItem("expertId");
    if (!expertId) {
      console.error("User ID not found in localStorage.");
      return false;
    }
    const response = await axios.get(`${API_URL}/expert/check-report-user/${expertId}`, {
        withCredentials: true,
    });
    
    return response.data
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

export const aboutExpert = async (expertId: string, updateData: FormData) => {
  try {
    const response = await axiosInstance.put(
      `${API_URL}/expert/about/${expertId}`,
      updateData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
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

export const forgotPasswordExpertOtp = async (
  email: string
): Promise<ForgotPasswordResponse> => {
  try {
    const response = await axios.post(`${API_URL}/expert/forgot-password`, {
      email,
    });
    return {
      success: response.data.success,
      message: response.data.message,
      data: response.data.data,
      forgotExpertAccess :response.data.forgotExpertAccess
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).response?.data?.message || "An error occurred",
      data: "",
      forgotExpertAccess :""
    };
  }
};

export const resetPassswordExpert = async (email: string, password: string) => {
  try {
    const storageData = sessionStorage.getItem("forgotExpertAccess");
    const parsedData = JSON.parse(storageData!);
    const accessToken : string = parsedData;
    const response = await axios.post(`${API_URL}/expert/reset-password`, {
      email,
      password,
    },{
      headers:{
         Authorization: `Bearer ${accessToken}`
      }
    });
    return response;
  } catch (error) {
    console.error("Error occurred during update user ", error);
    throw error;
  }
};


export const logoutExpert = async () => {
  try {
    const response = await axiosInstance.get(
      `${API_URL}/expert/logout`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.log("error in login student");
    throw error;
  }
};

export const fetchAllSubCategoriesExpert = async () => {
  try {
    const response = await axiosInstance.get(
      `${API_URL}/expert/allSubCategory`,
      {
        withCredentials: true,
      }
    );

    if (response.data.success) {
      return response.data;
    }
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const upadateExpert = async(expertId:string,updateData:Partial<IExpert>)=>{
  try{
    
    const response = await axiosInstance.put(
      `${API_URL}/expert/update/${expertId}`,updateData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    
    return response.data;
  }catch(error){
    return (error as Error).response?.data;
  }
}


export const uploadExpertImage = async (formData: FormData) => {
  try {
    const response = await axiosInstance.put(
      `${API_URL}/expert/uploadImage/`,
      formData,
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