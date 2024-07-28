import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { IExpert } from "../../@types/expert";
import { registerExpert, VerifyOtpExpert } from "./middleware/ExpertRegisterThunk";
import { Expertlogin } from "./middleware/ExpertLoginThunk";

export interface AuthState {
  expert: IExpert | null;
  isAuthenticated: boolean;
  otpVerified: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  expert: null,
  isAuthenticated: false,
  otpVerified: false,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "expert",
  initialState,
  reducers: {
    setExpert: (state, action: PayloadAction<IExpert>) => {
      state.expert = action.payload;
      state.isAuthenticated = true;
    },
    expertLogout: (state) => {
      state.expert = null;
      state.isAuthenticated = false;
    },
    setExpertAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    verifyOtpExpert: (state) => {
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
        state.expert = action.payload.data ?? null;
        state.isAuthenticated = true;
        state.error = null;
        if (state.status === "succeeded") {
          toast.success("Login successful!");
        }
      })
      .addCase(Expertlogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Login failed";

        if (state.status === "failed") {
          toast.error(state.error);
        }
      })
      .addCase(registerExpert.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerExpert.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.expert = action.payload.data ?? null;
        state.isAuthenticated = true;
        state.error = null;
        if (state.status === "succeeded") {
          toast.success("Authentication successful!");
        }
      })
      .addCase(registerExpert.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Registration failed";
        if (state.status === "failed") {
          toast.error(state.error);
        }
      })
      .addCase(VerifyOtpExpert.pending, (state) => {
        state.status = "loading";
      })
      .addCase(VerifyOtpExpert.fulfilled, (state) => {
        state.status = "succeeded";
        state.otpVerified = true;
        state.error = null;
        if (state.status === "succeeded") {
          toast.success("OTP verified successfully!");
        }
      })
      .addCase(VerifyOtpExpert.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "OTP verification failed";
        if (state.status === "failed") {
          toast.error(state.error);
        }
      });
  },
});

export const { setExpert, expertLogout, setExpertAuthenticated, verifyOtpExpert } =
  authSlice.actions;
export default authSlice.reducer;
