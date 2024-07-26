import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../features/student/authSlice";
import expertReducer from '../features/expert/expertAuthSlice'


const store = configureStore({
  reducer: {
    student: studentReducer,
    expert:expertReducer

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
