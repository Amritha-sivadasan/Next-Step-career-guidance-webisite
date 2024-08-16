import { studentAxiosInstance } from "../instance/userInstance";
import { axiosInstance } from "../instance/expertInstance";

const API_URL = process.env.VITE_API_URL;

interface Error {
  response?: {
    data?: {
      message: string;
    };
  };
}

export const bookSlot = async (
  studentId: string,
  slotId: string,
  expertId: string,
  paymentAmount: number,
  paymentMethod: string
) => {
  try {
    const response = await studentAxiosInstance.post(
      `${API_URL}/student/bookSlot`,
      {
        studentId,
        slotId,
        expertId,
        paymentAmount,
        paymentMethod,
      },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const updatePaymentStatus = async (id: string, status: string) => {
  try {
    const response = await studentAxiosInstance.put(
      `${API_URL}/student/updatePayment/${id}`,
      { status },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const getAllBookingByExpertId = async () => {
  try {
    const response = await axiosInstance.get(
      `${API_URL}/expert/allBookings`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};


export const getAllPaymentByExpertId = async () => {
  try {
    const response = await axiosInstance.get(
      `${API_URL}/expert/all-payment`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};



export const getConfirmBooking = async (page:number,limit:number) => {
  try {
    const response = await axiosInstance.get(
      `${API_URL}/expert/get-allBooking?page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export  const refundPayment = async(id:string,reason:string)=>{
  try {
    const response = await axiosInstance.patch(
      `${API_URL}/expert/refund/${id}`,{reason},
      {
        withCredentials: true,
      }
    );
    return response.data;
    
  } catch (error) {
    return (error as Error).response?.data;
  }
}


export const getAllPaymentByUserId = async (page:number,limit:number) => {
  try {
    const response = await studentAxiosInstance.get(
      `${API_URL}/student/all-payment?page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};


export const getAllBookingDetailsByStudentId = async (page:number,limit:number) => {
  try {
    const response = await studentAxiosInstance.get(
      `${API_URL}/student/get-allBooking?page=${page}&limit=${limit}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};