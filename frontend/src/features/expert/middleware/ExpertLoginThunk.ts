import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IExpert } from "../../../@types/expert";

import { loginExpert } from "../../../services/api/ExpertApi";

export interface LoginResponseExpert {
  success: boolean;
  message: string;
  data?: IExpert;
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

export const Expertlogin= createAsyncThunk<
LoginResponseExpert,
  LoginPayload,
  { rejectValue: ThunkError }
>("login/user", async (payload: LoginPayload, thunkAPI) => {
  const { email, password } = payload;
  try {
    const response = await loginExpert(email, password);
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