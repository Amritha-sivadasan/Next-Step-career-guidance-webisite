import { Suspense, lazy } from "react";

import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Signup from "../components/student/register/Signup";
import Login from "../components/common/authentication/Login";
import OtpPage from "../components/common/authentication/OtpPage";
import AboutUser from "../components/student/aboutStudent/AboutStudent";
import ForgotPassword from "../components/common/authentication/ForgotPassword";
import ResetPassword from "../components/common/authentication/ResetPassword";
import StudentPrivateRoute from "./Privateroutes/StudentPrivateRoute";
import { useDispatch } from "react-redux";
import useFetchUserData from "../hooks/UseFetchUser";
import { useEffect } from "react";
import { setAuthenticated, setUser } from "../features/student/authSlice";
import ForgotPasswordOtpPage from "../components/common/authentication/ForgotPasswordOtp";
import { useAppSelector } from "../hooks/useTypeSelector";

const Home = lazy(() => import("../pages/student/Home"));
const AllCategoryPage = lazy(() => import("../pages/student/CategoryPage"));
const CategoryDetailsPage = lazy(
  () => import("../pages/student/CategoryDetailsPage")
);
const ExpertListing = lazy(() => import("../pages/student/ExpertListing"));
const PaymentSuccessPage = lazy(
  () => import("../pages/student/paymentSuccessPage")
);
const ProfilePage = lazy(() => import("../pages/student/ProfilePage"));
const UserSideBar = lazy(() => import("../components/student/sidebar/SideBar"));
const StudentLayout = lazy(
  () => import("../components/common/studentLayout/StudentLayout")
);

const PaymentPage = lazy(() => import("../pages/student/PaymentPage"));
const BookingDetailsPage = lazy(
  () => import("../pages/student/BookingDetailsPage")
);
const LoadingPage = lazy(
  () => import("../components/common/Loading/LoadingPage")
);
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
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route
          path="/signup"
          element={
            userDeatils?.isAuthenticated ? <Navigate to="/" /> : <Signup />
          }
        />
        <Route
          path="/login"
          element={
            userDeatils.isAuthenticated ? (
              <Navigate to="/" />
            ) : (
              <Login userType="student" />
            )
          }
        />
        <Route
          path="/otp-verify"
          element={
            userDeatils.isAuthenticated ? (
              <Navigate to="/" />
            ) : (
              <OtpPage userType="student" />
            )
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

        <Route
          element={
            <StudentLayout>
              {" "}
              <Outlet />{" "}
            </StudentLayout>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/allcategory/:catName" element={<AllCategoryPage />} />
          <Route
            path="/categoryDetails/:id"
            element={<CategoryDetailsPage />}
          />
          <Route path="/experts/:subCatName" element={<ExpertListing />} />
        </Route>
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
            element={
              userDeatils?.user?.is_data_entered ? (
                <Navigate to="/" />
              ) : (
                <AboutUser />
              )
            }
          />
          <Route
            element={
              <StudentLayout>
                {" "}
                <Outlet />{" "}
              </StudentLayout>
            }
          >
            <Route path="/payment-success" element={<PaymentSuccessPage />} />
            <Route
              element={
                <>
                  {" "}
                  <div className="flex ms-24 flex-grow mt-9">
                    {" "}
                    <UserSideBar /> <Outlet />{" "}
                  </div>{" "}
                </>
              }
            >
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route
                path="/schedule-session"
                element={<BookingDetailsPage />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default StudentRouter;
