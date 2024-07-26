import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IExpert } from "../../../@types/expert";
import { expertRegister,googleSignupExpert,updateExpert,verifyOtpExpert } from "../../../services/api/ExpertApi";




interface RegisterExpertResponse {
  success: boolean;
  Message: string;
  data?: IExpert;  
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
  updateData: Partial<IExpert>;
}

export const registerExpert = createAsyncThunk<
RegisterExpertResponse,
  IExpert,
  { rejectValue: ThunkError }
>("student/register", async (userData: IExpert, thunkAPI) => {
  try {
    const response = expertRegister(userData)
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

export const registerExpertWithGoogle = createAsyncThunk<
RegisterExpertResponse,
   string,
  { rejectValue: ThunkError }
>("student/register", async (token:string, thunkAPI) => {
  try {
    const response = googleSignupExpert(token)
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




export const VerifyOtpExpert = createAsyncThunk<
  OtpResponse,
  VerifyOtpPayload,
  { rejectValue: ThunkError }
>("student/verifyOtp", async (payload: VerifyOtpPayload, thunkAPI) => {
  const { email, otp } = payload;
  try {
    const response = verifyOtpExpert(email,otp)
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


export const UpdateExpert = createAsyncThunk<
RegisterExpertResponse,
  UpdateUserPayload,
  { rejectValue: ThunkError }
>("student/register", async (payload: UpdateUserPayload, thunkAPI) => {
  const { userId, updateData } = payload;
  try {
    const response = updateExpert(userId,updateData)
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