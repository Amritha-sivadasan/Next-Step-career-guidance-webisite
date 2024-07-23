import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { registerStudent, VerifyOtp } from "./middleware/StudentRegisterThunk";
import { toast } from "react-toastify"; 

interface BasicDetails {
  user_name: string;
  email: string;
  phonenumber: string;
  password: string;
}

interface AdditionalInfo {
  education_level: string;
  education_background: string;
  user_type: string;
}

export interface UserState {
  basicDetails: BasicDetails;
  additionalInfo: AdditionalInfo;
  otpVerified: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: null | string;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  basicDetails: {
    user_name: "",
    email: "",
    phonenumber: "",
    password: "",
  },
  additionalInfo: {
    education_level: "",
    education_background: "",
    user_type: "",
  },
  otpVerified: false,
  status: "idle",
  error: null,
  isAuthenticated: false,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setBasicDetails: (state, action: PayloadAction<BasicDetails>) => {
      state.basicDetails = action.payload;
    },
    setAdditionalInfo: (state, action: PayloadAction<AdditionalInfo>) => {
      state.additionalInfo = action.payload;
    },
    verifyOtp: (state) => {
      state.otpVerified = true;
    },
    resetUserState: () => initialState,
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerStudent.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
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
      });
  },
});

export const {
  setBasicDetails,
  setAdditionalInfo,
  verifyOtp,
  resetUserState,
  setAuthenticated,
} = studentSlice.actions;
export default studentSlice.reducer;
