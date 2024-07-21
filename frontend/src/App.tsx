import Signup from "./components/common/Signup";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Login from "./components/common/Login";
import OtpPage from "./components/common/OtpPage";
import AboutUser from "./pages/student/AboutStudent";
import ForgotPassword from "./components/common/ForgotPassword";
import ResetPassword from "./components/common/ResetPassword";
import AdminLogin from "./pages/admin/AdminLogin";
import AboutExpert from "./pages/expert/AboutExprt";



function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup  userType="student"/>} />
        <Route path="/login" element={<Login userType="student" />} />
        <Route path="/otp-verify" element={<OtpPage userType="student" />} />
        <Route path="/about-student" element={<AboutUser />} />
        <Route path="/forgot-password" element={<ForgotPassword  userType="student"/>} />
        <Route path="/reset-password" element={<ResetPassword  userType="student"/>} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/expert/login" element={<Login userType="expert"/>} />
        <Route path="/expert/signup" element={<Signup userType="expert"/>} />
        <Route path="/expert/otp-verify" element={<OtpPage userType="expert" />} />
        <Route path="/expert/forgot-password" element={<ForgotPassword  userType="expert"/>} />
        <Route path="/expert/reset-password" element={<ResetPassword  userType="student"/>} />
        <Route path="/expert/about-expert" element={<AboutExpert/>} />


      </Routes>
    </>
  );
}

export default App;
