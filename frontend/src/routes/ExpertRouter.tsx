import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/common/Login";
import OtpPage from "../components/common/OtpPage";
import ForgotPassword from "../components/common/ForgotPassword";
import ResetPassword from "../components/common/ResetPassword";
import AboutExpert from "../pages/expert/AboutExprt";
import ExpertSignup from "../pages/expert/ExpertSignup";
import ExpertHome from "../pages/expert/ExpertHome";
import useFetchExpertData from "../hooks/useFetchExpert";
import {
  setExpert,
  setExpertAuthenticated,
} from "../features/expert/expertAuthSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ExpertPrivateRoute from "./Privateroutes/ExpertPrivateRoute";

const ExpertRouter = () => {
  const dispatch = useDispatch();
  const { expert, isAuthenticated } = useFetchExpertData();
  console.log("expert",expert);
  

  useEffect(() => {
    if (expert) {
      dispatch(setExpert(expert));
      dispatch(setExpertAuthenticated(isAuthenticated));
    } else {
      dispatch(setExpertAuthenticated(false));
    }
  }, [dispatch, expert, isAuthenticated]);
  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/expert/" /> : <Login userType="expert" />
        }
      />
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/expert/" /> :<ExpertSignup />} />
      <Route path="/otp-verify" element={isAuthenticated ? <Navigate to="/expert/" /> :<OtpPage userType="expert" />} />
      <Route
        path="/forgot-password"
        element={<ForgotPassword userType="expert" />}
      />
      <Route
        path="/reset-password"
        element={<ResetPassword userType="expert" />}
      />
      <Route path="/about-expert" element={<AboutExpert />} />

      <Route element={<ExpertPrivateRoute />}>
        <Route path="/" element={expert?.is_data_entered?<Navigate to='/expert'/>: <ExpertHome />} />
      </Route>
    </Routes>
  );
};

export default ExpertRouter;
