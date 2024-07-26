import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "../pages/student/Signup";
import Login from "../components/common/Login";
import OtpPage from "../components/common/OtpPage";
import AboutUser from "../pages/student/AboutStudent";
import ForgotPassword from "../components/common/ForgotPassword";
import ResetPassword from "../components/common/ResetPassword";
import Home from "../pages/student/Home";
import StudentPrivateRoute from "./Privateroutes/StudentPrivateRoute";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const StudentRouter = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.student
  );
  
  return (
    <Routes>
      <Route
        path="/signup"
        element={isAuthenticated ? <Navigate to="/" /> : <Signup />}
      />
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/" /> : <Login userType="student" />
        }
      />
      <Route
        path="/otp-verify"
        element={
          isAuthenticated ? <Navigate to="/" /> : <OtpPage userType="student" />
        }
      />
      <Route
        path="/forgot-password"
        element={
          isAuthenticated ? (
            <Navigate to="/" />
          ) : (
            <ForgotPassword userType="student" />
          )
        }
      />
      <Route
        path="/reset-password"
        element={
          isAuthenticated ? (
            <Navigate to="/" />
          ) : (
            <ResetPassword userType="student" />
          )
        }
      />

      <Route element={<StudentPrivateRoute />}>
      <Route path="/" element={<Home />} />
      </Route>
      <Route
        path="/about-student"
        element={user?.is_data_entered ? <Navigate to="/" /> : <AboutUser />}
      />
    </Routes>
  );
};

export default StudentRouter;
