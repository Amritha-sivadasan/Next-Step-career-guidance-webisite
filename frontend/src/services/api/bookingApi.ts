
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
) => {
  try {
    const response = await studentAxiosInstance.post(
      `${API_URL}/student/bookSlot`,
      {
        studentId,
        slotId,
        expertId,
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