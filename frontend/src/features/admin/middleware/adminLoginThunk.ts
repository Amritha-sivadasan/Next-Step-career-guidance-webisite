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
  data: object;
}

interface LoginPayload {
  user_name: string;
  password: string;
}

export const LoginAdmin = createAsyncThunk<
  LoginResponseAdmin,
  LoginPayload,
  { rejectValue: ThunkError }
>('login/admin', async (payload: LoginPayload, thunkAPI) => {
  const { user_name, password } = payload;

  try {
    const response = await adminLogin(user_name, password);
    return response
  } catch (error) {
    let errorMsg = "An error occurred";
    if (axios.isAxiosError(error) && error.response) {
      errorMsg = error.response.data.message;
      return thunkAPI.rejectWithValue({
        message: errorMsg,
        success: false,
        data: error.response.data,
      });
    }
    return thunkAPI.rejectWithValue({
      message: errorMsg,
      success: false,
      data: {},
    });
  }
});
