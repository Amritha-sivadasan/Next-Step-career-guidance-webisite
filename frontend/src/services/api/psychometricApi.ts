import { adminAxiosInstance } from "../instance/adminInstance";
import { studentAxiosInstance } from "../instance/userInstance";

const API_URL = import.meta.env.VITE_API_URL

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

export const getPsychometricTests = async () => {
  try {
    const response = await adminAxiosInstance.get(
      `${API_URL}/admin/getAllpsychometric`,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const deletePsychometricTest = async (id: string) => {
  try {
    const response = await adminAxiosInstance.delete(
      `${API_URL}/admin/deletepsychometric/${id}`,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const getAllQuestions = async () => {
  try {
    const response = await studentAxiosInstance.get(
      `${API_URL}/student/getAllpsychometric`,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};


export const submitTestAnswers= async(id:string,anwers:Array<string | null>)=>{
  try {
    
    const response = await studentAxiosInstance.post(
      `${API_URL}/student/submit-psychometric-test/${id}`,anwers,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
}