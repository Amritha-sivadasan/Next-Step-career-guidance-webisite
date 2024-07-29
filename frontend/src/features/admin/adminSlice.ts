import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginAdmin } from "./middleware/adminLoginThunk";
import { toast } from "react-toastify";

export interface AuthState {
  admin: string | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  admin: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin(state, action: PayloadAction<string>) {
      state.admin = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    logoutAdmin(state) {
      state.admin = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setadminAuthenticated(state,action: PayloadAction<boolean>){
      state.isAuthenticated = action.payload
    }
  
  },
  extraReducers :(builder)=>{
    builder
      .addCase(LoginAdmin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(LoginAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.admin = action.payload.data ?? null;
        state.isAuthenticated = true;
        state.error = null;
        if (state.status === "succeeded") {
          toast.success("Login successful!");
        }
      })
      .addCase(LoginAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Login failed";

        if (state.status === "failed") {
          toast.error(state.error);
        }
      })
  }
});

export const { setAdmin, logoutAdmin,setadminAuthenticated } = authSlice.actions;
export default authSlice.reducer;
