
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { IExpert } from "../../@types/expert";
import { registerExpert, VerifyOtpExpert} from "./middleware/ExpertRegisterThunk";
import { Expertlogin } from "./middleware/ExpertLoginThunk";

export interface AuthState {
  user: IExpert | null;
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
  name: "expert",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IExpert>) => {
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
      .addCase(Expertlogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(Expertlogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.data ?? null;
        state.isAuthenticated = true;
        state.error = null;
        toast.success("Login successful!");
      })
      .addCase(Expertlogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Login failed";
        toast.error(state.error);
      })
      .addCase(registerExpert.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerExpert.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.data ?? null;
        state.isAuthenticated = true;
        state.error = null;
        toast.success("Registration successful!");
      })
      .addCase(registerExpert.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Registration failed";
        toast.error(state.error);
      })
      .addCase(VerifyOtpExpert.pending, (state) => {
        state.status = "loading";
      })
      .addCase(VerifyOtpExpert.fulfilled, (state) => {
        state.status = "succeeded";
        state.otpVerified = true;
        state.error = null;
        toast.success("OTP verified successfully!");
      })
      .addCase(VerifyOtpExpert.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "OTP verification failed";
        toast.error(state.error);
      });
  },
});

export const { setUser, logout, setAuthenticated, verifyOtp } =
  authSlice.actions;
export default authSlice.reducer;
