// import { axiosInstance } from "../instance/expertInstance";
import { studentAxiosInstance } from "../instance/userInstance";
import { IReviewAndRating } from "../../@types/reviewAndRating";

const API_URL = process.env.VITE_API_URL;

interface Error {
  response?: {
    data?: {
      message: string;
    };
  };
}

export const submitReviewByStudent = async (
  data: Partial<IReviewAndRating>
) => {
  try {
    const response = await studentAxiosInstance.post(
      `${API_URL}/student/submit-review-rate`,
      data,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};
export const findAllReviewsByStudent = async (meetingId:string) => {
  try {
    const response = await studentAxiosInstance.get(
      `${API_URL}/student/fetchReviewAndRating/${meetingId}`,

      {
        withCredentials: true,
      }
    );
   

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};
