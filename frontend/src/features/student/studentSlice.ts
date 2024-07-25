import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registerStudent, VerifyOtp } from "./middleware/StudentRegisterThunk";
import { toast } from "react-toastify";

// Define the shape of the user data
export interface UserData {
  _id: string;
  user_name: string;
  email: string;
  password?: string;
  education_level: string;
  phonenumber: string;
  education_background: string;
  user_type: string;
  profile_picture: string;
  is_active: boolean;
  authentication_id: string;
  authentication_provider: string;
  role: string;
}

// Define the initial state for the slice
interface UserState {
  user: UserData | null;
  otpVerified: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  otpVerified: false,
  status: "idle",
  error: null,
  isAuthenticated: false,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
    },
    resetUserState: () => initialState,
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    verifyOtp: (state) => {
      state.otpVerified = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.user = action.payload.data ?? null;
        state.isAuthenticated = true;
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
      })
    

  },
});

export const { setUser, resetUserState, setAuthenticated, verifyOtp } = studentSlice.actions;

export default studentSlice.reducer;
