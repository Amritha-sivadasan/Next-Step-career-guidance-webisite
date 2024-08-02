import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { adminLogin } from "../../../services/api/adminApi";

export interface LoginResponseAdmin {
  success: boolean;
  message: string;
  data?: string;
  accessToken: string;
}

interface ThunkError {
  message: string;
  success: boolean;
  data: Record<string, unknown>;
}

interface LoginPayload {
  user_name: string;
  password: string;
}

export const LoginAdmin = createAsyncThunk<
  LoginResponseAdmin,
  LoginPayload,
  { rejectValue: ThunkError }
>("login/admin", async (payload: LoginPayload, thunkAPI) => {
  const { user_name, password } = payload;
  try {
    const response = await adminLogin(user_name, password);
  
    const data = response.data as LoginResponseAdmin;
    return data;
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
