import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "../components/common/authentication/Login";
import OtpPage from "../components/common/authentication/OtpPage";
import ForgotPassword from "../components/common/authentication/ForgotPassword";
import ResetPassword from "../components/common/authentication/ResetPassword";
import AboutExpert from "../components/expert/about/AboutExpert";
import ExpertSignup from "../components/expert/register/ExpertSignup";

import useFetchExpertData from "../hooks/useFetchExpert";
import {
  setExpert,
  setExpertAuthenticated,
} from "../features/expert/expertAuthSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ExpertPrivateRoute from "./Privateroutes/ExpertPrivateRoute";
import ForgotPasswordOtpPage from "../components/common/authentication/ForgotPasswordOtp";
import { useAppSelector } from "../hooks/useTypeSelector";
import UpdadteWithOtp from "../components/common/authentication/UpdateWithOtpPage";
import ProfilePage from "../pages/expert/Profilepage";
import HomePage from "../pages/expert/HomePage";
import AvailableSchedule from "../pages/expert/AvailableSchedule";

import BookingDetailsPage from "../pages/expert/BookingDetailsPage";
import PaymentHistory from "../pages/expert/PaymentHistory";
import ExpertLayout from "../components/common/expertLayout/ExpertLayout";
import ExpertChatListPage from "../pages/expert/ExpertChatListPage";

const ExpertRouter = () => {
  const dispatch = useDispatch();
  const { expert, isAuthenticated } = useFetchExpertData();
  const expertDetails = useAppSelector((state) => state.expert);

  useEffect(() => {
    if (expert) {
      dispatch(setExpert(expert));
      dispatch(setExpertAuthenticated(isAuthenticated));
    } else {
      dispatch(setExpertAuthenticated(false));
      console.log("isauth", isAuthenticated);
    }
  }, [dispatch, expert, isAuthenticated]);
  return (
    <Routes>
      <Route
        path="/login"
        element={
          expertDetails.isAuthenticated ? (
            <Navigate to="/expert/" />
          ) : (
            <Login userType="expert" />
          )
        }
      />
      <Route
        path="/signup"
        element={
          expertDetails.isAuthenticated ? (
            <Navigate to="/expert/" />
          ) : (
            <ExpertSignup />
          )
        }
      />
      <Route
        path="/otp-verify"
        element={
          expertDetails.isAuthenticated ? (
            <Navigate to="/expert/" />
          ) : (
            <OtpPage userType="expert" />
          )
        }
      />
      <Route
        path="/forgot-password"
        element={<ForgotPassword userType="expert" />}
      />
      <Route
        path="/fortgot-password-otp"
        element={<ForgotPasswordOtpPage userType="expert" />}
      />
      <Route
        path="/update-otp"
        element={<UpdadteWithOtp userType="expert" />}
      />
      <Route
        path="/reset-password"
        element={<ResetPassword userType="expert" />}
      />
      <Route path="/" element={<HomePage />} />

      <Route element={<ExpertPrivateRoute />}>
        <Route
          path="/"
          element={
            expertDetails?.expert?.is_data_entered ? (
              <HomePage />
            ) : (
              <Navigate to="/expert/about-expert" />
            )
          }
        />
        <Route
          path="/about-expert"
          element={
            expertDetails?.expert?.is_data_entered ? (
              <Navigate to="/expert" />
            ) : (
              <AboutExpert />
            )
          }
        />
        <Route
          element={
            <ExpertLayout>
              <Outlet />
            </ExpertLayout>
          }
        >
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/available-schedule" element={<AvailableSchedule />} />
          <Route path="/booking-details" element={<BookingDetailsPage />} />
          <Route path="/payment-history" element={<PaymentHistory />} />
          <Route path="/chat-with-student" element={<ExpertChatListPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default ExpertRouter;
