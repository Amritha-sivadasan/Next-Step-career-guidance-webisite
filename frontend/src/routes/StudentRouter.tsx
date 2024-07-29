import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "../pages/student/Signup";
import Login from "../components/common/Login";
import OtpPage from "../components/common/OtpPage";
import AboutUser from "../pages/student/AboutStudent";
import ForgotPassword from "../components/common/ForgotPassword";
import ResetPassword from "../components/common/ResetPassword";
import Home from "../pages/student/Home";
import StudentPrivateRoute from "./Privateroutes/StudentPrivateRoute";
import { useDispatch } from "react-redux";
import useFetchUserData from "../hooks/UseFetchUser";
import { useEffect } from "react";
import { setAuthenticated, setUser } from "../features/student/authSlice";
import ForgotPasswordOtpPage from "../components/common/ForgotPasswordOtp";
import { useAppSelector } from "../hooks/useTypeSelector";

const StudentRouter = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useFetchUserData();
  const userDeatils = useAppSelector((state) => state.student);

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
      dispatch(setAuthenticated(isAuthenticated));
    } else {
      dispatch(setAuthenticated(false));
    }
  }, [dispatch, user, isAuthenticated]);
  console.log();
  return (
    <Routes>
      <Route
        path="/signup"
        element={userDeatils.isAuthenticated ? <Navigate to="/" /> : <Signup />}
      />
      <Route
        path="/login"
        element={
          userDeatils.isAuthenticated ? <Navigate to="/" /> : <Login userType="student" />
        }
      />
      <Route
        path="/otp-verify"
        element={
          userDeatils.isAuthenticated ? <Navigate to="/" /> : <OtpPage userType="student" />
        }
      />
      <Route
        path="/forgot-password"
        element={
          userDeatils.isAuthenticated ? (
            <Navigate to="/" />
          ) : (
            <ForgotPassword userType="student" />
          )
        }
      />
      <Route
        path="/fortgot-password-otp"
        element={
          userDeatils.isAuthenticated ? (
            <Navigate to="/" />
          ) : (
            <ForgotPasswordOtpPage userType="student" />
          )
        }
      />

      <Route
        path="/reset-password"
        element={
          userDeatils.isAuthenticated ? (
            <Navigate to="/" />
          ) : (
            <ResetPassword userType="student" />
          )
        }
      />
      <Route element={<StudentPrivateRoute />}>
        <Route
          path="/"
          element={
            userDeatils?.user?.is_data_entered ? (
              <Home />
            ) : (
              <Navigate to="/about-student" />
            )
          }
        />
        <Route
          path="/about-student"
          element={userDeatils?.user?.is_data_entered ? <Navigate to="/" /> : <AboutUser />}
        />
      </Route>
    </Routes>
  );
};

export default StudentRouter;
