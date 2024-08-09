import { studentAxiosInstance } from "../instance/userInstance";

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
