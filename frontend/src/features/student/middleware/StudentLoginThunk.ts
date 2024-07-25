import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IStudent } from "../../../@types/user";
import { loginStudent } from "../../../services/api/studentApi";

export interface LoginResponse {
  success: boolean;
  message: string;
  data?: IStudent;
  accessToken: string;
}

interface ThunkError {
  message: string;
  success: boolean;
  data: object;
}

interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: ThunkError }
>("login/user", async (payload: LoginPayload, thunkAPI) => {
  const { email, password } = payload;
  try {
    const response = await loginStudent(email, password);
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