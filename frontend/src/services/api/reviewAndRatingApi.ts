import { axiosInstance } from "../instance/expertInstance";
import { studentAxiosInstance } from "../instance/userInstance";
import { IReviewAndRating } from "../../@types/reviewAndRating";
import { adminAxiosInstance } from "../instance/adminInstance";
import axios from "axios";

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
export const findAllReviewsByStudent = async (meetingId: string) => {
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

export const submitReviewByExpert = async (data: Partial<IReviewAndRating>) => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}/expert/submit-review-rate`,
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
export const findAllReviewsByExpert = async (meetingId: string) => {
  try {
    const response = await axiosInstance.get(
      `${API_URL}/expert/fetchReviewAndRating/${meetingId}`,

      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const deleteReviewByExpert = async (meetingId: string) => {
  try {
    const response = await axiosInstance.patch(
      `${API_URL}/expert/deleteReview/${meetingId}`,

      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const deleteReviewByStudent = async (meetingId: string) => {
  try {
    const response = await studentAxiosInstance.patch(
      `${API_URL}/student/deleteReview/${meetingId}`,

      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const fetchAllReviews = async () => {
  try {
    const response = await adminAxiosInstance.get(
      `${API_URL}/admin/fetchAllReview`,

      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const fetchAllReviewByStudent = async () => {
  try {
    const response = await axios.get(`${API_URL}/student/fetchAllReview`);
    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};

export const fetchAllReviewByExpert = async () => {
  try {
    const response = await axios.get(`${API_URL}/expert/fetchAllReview`);
    return response.data;
  } catch (error) {
    return (error as Error).response?.data;
  }
};
