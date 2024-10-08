import axios from "axios";
import { adminAxiosInstance } from "../instance/adminInstance";

const API_URL = import.meta.env.VITE_API_URL

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

export const fetchAllExpert = async (page: number, limit: number) => {
  try {
    const response = await adminAxiosInstance.get(
      `${API_URL}/admin/allExperts?page=${page}&limit=${limit}`,
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

export const fetchAllEStudent = async (page: number, limit: number) => {
  try {
    const response = await adminAxiosInstance.get(
      `${API_URL}/admin/allStudent?page=${page}&limit=${limit}`,
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

export const fetchStudentDetailsById = async (studentId: string) => {
  try {
    const response = await adminAxiosInstance.get(
      `${API_URL}/admin/studentById/${studentId}`,
      { withCredentials: true }
    );
    console.log("response", response);
    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const fetchAllBookingByAdmin = async (page: number, limit: number) => {
  try {
    const response = await adminAxiosInstance.get(
      `${API_URL}/admin/all-bookings?page=${page}&limit=${limit}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const fetchBookingByIdAdmin = async (id: string) => {
  try {
    const response = await adminAxiosInstance.get(
      `${API_URL}/admin/bookingById/${id}`,
      { withCredentials: true }
    );
    console.log("response", response);
    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const handleBlockAndUnblockExpert = async (id: string) => {
  try {
    const response = await adminAxiosInstance.patch(
      `${API_URL}/admin/blockExpert/${id}`,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};
export const handleBlockAndUnblockStudent = async (id: string) => {
  try {
    const response = await adminAxiosInstance.patch(
      `${API_URL}/admin/blockStudent/${id}`,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};


export const fetchAllFaq = async () => {
  try {
    const response = await adminAxiosInstance.get(
      `${API_URL}/admin/fetch-all-faq`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const submitAnswer = async(id:string,answer:string)=>{
  try {
    const response = await adminAxiosInstance.put(
      `${API_URL}/admin/submit-answer/${id}`,{answer},
      { withCredentials: true }
    );
    console.log("response", response);
    return response.data;
    
  } catch (error) {
    return (error as Error).response?.data;
  }
}


export const fetchAllDetails = async()=>{
  try {
    const response = await adminAxiosInstance.get(
      `${API_URL}/admin/fetchAllDetails`,
      { withCredentials: true }

    );

    return response.data;
    
  } catch (error) {
    return (error as Error).response?.data;
  }
}
