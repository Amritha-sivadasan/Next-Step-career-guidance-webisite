import { Routes, Route } from "react-router-dom";

import React from "react";
import Login from "../components/common/Login";
import OtpPage from "../components/common/OtpPage";
import ForgotPassword from "../components/common/ForgotPassword";
import ResetPassword from "../components/common/ResetPassword";
import AboutExpert from "../pages/expert/AboutExprt";
import ExpertSignup from "../pages/expert/ExpertSignup";
import ExpertHome from "../pages/expert/ExpertHome";

const ExpertRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<ExpertHome />} />
      <Route path="/login" element={<Login userType="expert" />} />
      <Route path="/signup" element={<ExpertSignup/>} />
      <Route path="/otp-verify" element={<OtpPage userType="expert" />} />
      <Route
        path="/forgot-password"
        element={<ForgotPassword userType="expert" />}
      />
      <Route
        path="/reset-password"
        element={<ResetPassword userType="expert" />}
      />
      <Route path="/about-expert" element={<AboutExpert />} />
    </Routes>
  );
};

export default ExpertRouter;
