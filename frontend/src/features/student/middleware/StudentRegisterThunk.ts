import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IStudent } from "../../../@types/user";
import { googleSignup,updatestudent,userRegister } from "../../../services/api/studentApi";
import { verifyOtp } from "../../../services/api/studentApi";




interface RegisterUserResponse {
  success: boolean;
  Message: string;
  data?: IStudent;  
  accessToken:string
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
    const response = userRegister(userData)
    return (await response).data
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
    const response = googleSignup(token)
    return (await response).data
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
    const response = verifyOtp(email,otp)
    if ((await response).data.success) {
      return (await response).data;
    } else {
      return thunkAPI.rejectWithValue({
        message: (await response).data.message || "Verification failed",
        success: (await response).data.success,
        data: (await response).data.data
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
    const response = updatestudent(userId,updateData)
    return  (await response).data
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