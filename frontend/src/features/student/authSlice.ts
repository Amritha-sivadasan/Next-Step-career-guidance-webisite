
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { loginUser } from "./middleware/StudentLoginThunk";
import { registerStudent, VerifyOtp } from "./middleware/StudentRegisterThunk";
import { toast } from "react-toastify";
import { IStudent } from "../../@types/user";


export interface AuthState {
  user: IStudent | null;
  isAuthenticated: boolean;
  otpVerified: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  otpVerified: false,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IStudent>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.otpVerified = false;
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    verifyOtp: (state) => {
      state.otpVerified = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.data ?? null;
        state.isAuthenticated = true;
        state.error = null;
        toast.success("Login successful!");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Login failed";
        toast.error(state.error);
      })
      .addCase(registerStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.data ?? null;
        state.isAuthenticated = true;
        state.error = null;
        toast.success("Registration successful!");
      })
      .addCase(registerStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Registration failed";
        toast.error(state.error);
      })
      .addCase(VerifyOtp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(VerifyOtp.fulfilled, (state) => {
        state.status = "succeeded";
        state.otpVerified = true;
        state.error = null;
        toast.success("OTP verified successfully!");
      })
      .addCase(VerifyOtp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "OTP verification failed";
        toast.error(state.error);
      });
  },
});

export const { setUser, logout, setAuthenticated, verifyOtp } =
  authSlice.actions;
export default authSlice.reducer;
