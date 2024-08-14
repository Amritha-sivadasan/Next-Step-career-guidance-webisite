import { adminAxiosInstance } from "../instance/adminInstance";

const API_URL = process.env.VITE_API_URL;

interface Error {
  response?: {
    data?: {
      message: string;
    };
  };
}

export const addPsychometricTest = async (newTest: object) => {
  try {
    const response = await adminAxiosInstance.post(
      `${API_URL}/admin/add-psychometric-test`,
      newTest,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};
