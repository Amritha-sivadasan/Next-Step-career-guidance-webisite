import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IStudent } from "../../../@types/user";

const apiUrl = import.meta.env.VITE_API_URL;

interface RegisterUserResponse {
  userId: string;
  user_name: string;
  email: string;
  phonenumber: string;
  education_level: string;
  education_background: string;
  user_type: string;
  profile_picture?: string;
  message: string;
  success: boolean;
}

interface ThunkError {
  message: string;
  success: boolean;
}

interface OtpResponse {
  success: boolean;
  message: string;
}

interface VerifyOtpPayload {
  email: string;
  otp: string;
}

//register middleware
export const registerStudent = createAsyncThunk<
  RegisterUserResponse,
  IStudent,
  { rejectValue: ThunkError }
>("student/register", async (userData: IStudent, thunkAPI) => {
  try {
    const response = await axios.post(`${apiUrl}/student/register`, userData);
    console.log(response.data);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || "An error occurred",
        success:error.response?.data?.success
      });
    } else {
      return thunkAPI.rejectWithValue({
        message: "An unexpected error occurred",
        success:false
      });
    }
  }
});

//verify otp middleware

export const VerifyOtp = createAsyncThunk<
  OtpResponse,
  VerifyOtpPayload,
  { rejectValue: ThunkError }
>("student/verifyOtp", async (payload, thunkAPI) => {
  const { email, otp } = payload;
  try {
    const response = await axios.post(`${apiUrl}/student/verify-otp`, {
      email,
      otp,
    });
    if(response.data.success==true){
      console.log(response.data);
      
      return response.data;
    }
    
  } catch (error) {
    if (axios.isAxiosError(error)) {
      
      return thunkAPI.rejectWithValue({
        
        message: error.response?.data?.message || "An error occurred",
        success:error.response?.data?.success
      });
    } else {
      return thunkAPI.rejectWithValue({
        message: "An unexpected error occurred",
        success:false
      });
    }
  }
});
