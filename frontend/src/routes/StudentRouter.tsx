import { Routes, Route } from "react-router-dom";
import Signup from "../pages/student/Signup";
import Login from "../components/common/Login";
import OtpPage from "../components/common/OtpPage";
import AboutUser from "../pages/student/AboutStudent";
import ForgotPassword from "../components/common/ForgotPassword";
import ResetPassword from "../components/common/ResetPassword";
import Home from "../pages/student/Home";
import StudentPrivateRoute from "./Privateroutes/StudentPrivateRoute";

const StudentRouter = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/login" element={<Login userType="student" />} />
      <Route path="/otp-verify" element={<OtpPage userType="student" />} />
      <Route path="/about-student" element={<AboutUser />} />
      <Route
        path="/forgot-password"
        element={<ForgotPassword userType="student" />}
      />
      <Route
        path="/reset-password"
        element={<ResetPassword userType="student" />}
      />
      <Route element={<StudentPrivateRoute />}>
      <Route path="/" element={<Home />} /></Route>
    </Routes>
  );
};

export default StudentRouter;
