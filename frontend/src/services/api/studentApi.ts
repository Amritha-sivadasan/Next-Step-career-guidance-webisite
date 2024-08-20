import axios, { AxiosResponse } from "axios";
import { IStudent } from "../../@types/user";
import { studentAxiosInstance } from "../instance/userInstance";
import { IFaq } from "../../@types/faq";

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

    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID not found in localStorage.");
      return false;
    }
    const response = await axios.get(`${API_URL}/student/check-report-user/${userId}`, {
        withCredentials: true,
    });
    
    return response.data
} catch (error) {
    console.error('Error checking if user is blocked:', error);
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
    const response = await studentAxiosInstance.put(
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
    const response = await studentAxiosInstance.get(`${API_URL}/student`, {
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

export const forgotPassword = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}/student/forgot-password`, {
      email,
    });
    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
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
    return (error as Error).response?.data;
  }
};

export const logoutStudent = async () => {
  try {
    const response = await studentAxiosInstance.get(
      `${API_URL}/student/logout`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.log("error in login student");
    return (error as Error).response?.data;
  }
};

export const getAllCategory = async (page: number, limit: number) => {
  try {
    const response = await axios.get(
      `${API_URL}/student/getAllcategory?page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const getAllSubCategory = async (catName: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/student/getAllSubCategory/${catName}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const getCategoryByName = async (catName: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/student/getCategoryByName/${catName}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const subCategoryById = async (id: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/student/subCategoryById/${id}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const findExpertBySubCategory = async (subCatName: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/student/experts/${subCatName}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const getAllExperts = async () => {
  try {
    const response = await axios.get(`${API_URL}/student/experts/`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const uploadImage = async (formData: FormData) => {
  try {
    const response = await studentAxiosInstance.put(
      `${API_URL}/student/uploadImage/`,
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

export const updatePersonalInfo =async(data: Partial<IStudent>)=>{
  try {
    const response = await studentAxiosInstance.put(
      `${API_URL}/student/uploadPersonalInfo/`,data,
  
      {
  
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
}

export const sendQustion  =async(data: Partial<IFaq>)=>{
  try {
    const response = await studentAxiosInstance.post(
      `${API_URL}/student/saveQuestion/`,data,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
}

export const fetchQusion = async()=>{
try {
  const response = await studentAxiosInstance.get(
    `${API_URL}/student/fetchQustion`,
    {
      withCredentials: true,
    }
  );

  return response.data;
  
} catch (error) {
  return (error as Error).response?.data;
}
}
