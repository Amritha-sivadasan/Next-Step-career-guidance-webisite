import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IStudent } from "../../../@types/user";

const apiUrl = import.meta.env.VITE_API_URL;

interface RegisterUserResponse {
  success: boolean;
  Message: string;
  data?: IStudent;  
}

interface ThunkError {
  message: string;
  success: boolean;
  data: object;
}

interface OtpResponse {
  success: boolean;
  message: string;
}

interface VerifyOtpPayload {
  email: string;
  otp: string;
}

interface UpdateUserPayload {
  userId: string;
  updateData: Partial<IStudent>;
}

export const registerStudent = createAsyncThunk<
  RegisterUserResponse,
  IStudent,
  { rejectValue: ThunkError }
>("student/register", async (userData: IStudent, thunkAPI) => {
  try {
    const response = await axios.post(`${apiUrl}/student/register`, userData, { withCredentials: true });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || "An error occurred",
        success: error.response?.data?.success || false,
        data: error.response?.data || {}
      });
    } else {
      return thunkAPI.rejectWithValue({
        message: "An unexpected error occurred",
        success: false,
        data: {}
      });
    }
  }
});

export const registerStudentWithGoogle = createAsyncThunk<
  RegisterUserResponse,
   string,
  { rejectValue: ThunkError }
>("student/register", async (token:string, thunkAPI) => {
  try {
    const response = await axios.post(`${apiUrl}/student/google-login`, {token}, { withCredentials: true });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || "An error occurred",
        success: error.response?.data?.success || false,
        data: error.response?.data || {}
      });
    } else {
      return thunkAPI.rejectWithValue({
        message: "An unexpected error occurred",
        success: false,
        data: {}
      });
    }
  }
});









export const VerifyOtp = createAsyncThunk<
  OtpResponse,
  VerifyOtpPayload,
  { rejectValue: ThunkError }
>("student/verifyOtp", async (payload: VerifyOtpPayload, thunkAPI) => {
  const { email, otp } = payload;
  try {
    const response = await axios.post(`${apiUrl}/student/verify-otp`, { email, otp }, { withCredentials: true });
    if (response.data.success) {
      return response.data;
    } else {
      return thunkAPI.rejectWithValue({
        message: response.data.message || "Verification failed",
        success: response.data.success,
        data: response.data
      });
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || "An error occurred",
        success: error.response?.data?.success || false,
        data: error.response?.data || {}
      });
    } else {
      return thunkAPI.rejectWithValue({
        message: "An unexpected error occurred",
        success: false,
        data: {}
      });
    }
  }
});


export const updateUser = createAsyncThunk<
  RegisterUserResponse,
  UpdateUserPayload,
  { rejectValue: ThunkError }
>("student/register", async (payload: UpdateUserPayload, thunkAPI) => {
  const { userId, updateData } = payload;
  try {
    const response = await axios.put(`${apiUrl}/student/update/${userId}`, {updateData}, { withCredentials: true });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || "An error occurred",
        success: error.response?.data?.success || false,
        data: error.response?.data || {}
      });
    } else {
      return thunkAPI.rejectWithValue({
        message: "An unexpected error occurred",
        success: false,
        data: {}
      });
    }
  }
});