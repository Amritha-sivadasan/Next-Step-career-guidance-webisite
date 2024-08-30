import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Signup from "../components/student/register/Signup";
import Login from "../components/common/authentication/Login";
import OtpPage from "../components/common/authentication/OtpPage";
import AboutUser from "../components/student/aboutStudent/AboutStudent";
import ForgotPassword from "../components/common/authentication/ForgotPassword";
import ResetPassword from "../components/common/authentication/ResetPassword";
import StudentPrivateRoute from "./Privateroutes/StudentPrivateRoute";
import { useDispatch } from "react-redux";
import { setAuthenticated, setUser } from "../features/student/authSlice";
import useFetchUserData from "../hooks/UseFetchUser";
import { useAppSelector } from "../hooks/useTypeSelector";
import ForgotPasswordOtpPage from "../components/common/authentication/ForgotPasswordOtp";

import { onMessageListener, requestFCMToken } from "../config/firebase";

import { Toaster } from "react-hot-toast";
import MeetingHistoryPage from "../pages/student/MeetingHistoryPage";
import { toast } from "react-toastify";

const StudentChatListPage = lazy(
  () => import("../pages/student/StudentChatListPage")
);
const PsychometricTestPage = lazy(
  () => import("../pages/student/PsychometricTestPage")
);
const PsychometricTestResultPage = lazy(
  () => import("../pages/student/PsychometricTestResultPage")
);
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

interface NotificationPayload {
  notification: {
    title: string;
    body: string;
  };
  data?: {
    role: string;
  };
}
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

  useEffect(() => {
    const fetchFcmToken = async () => {
      try {
        const token = await requestFCMToken();

        console.log("token:->", token);
      } catch (error) {
        console.log("error during fetch fcm token", error);
      }
    };
    fetchFcmToken();
  }, []);

  onMessageListener()
    .then((payload: NotificationPayload) => {
      if (payload.notification && payload.data?.role.trim()=='student') {
        toast(
          <div>
            <strong>{payload.notification.title}</strong>
            <p>{payload.notification.body}</p>
          </div>,
          {
            position: "top-right",
          }
        );
        console.log("Received foreground message:", payload);
      }
    })
    .catch((err) => console.log("Error in receiving foreground message:", err));

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
              <Toaster /> <Outlet />{" "}
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
              path="/psychometric-test"
              element={<PsychometricTestPage />}
            />

            <Route
              element={
                <>
                  {" "}
                  <div className="flex  flex-grow mt-9">
                    {" "}
                    <UserSideBar /> <Outlet />{" "}
                  </div>{" "}
                </>
              }
            >
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route
                path="/test-result"
                element={<PsychometricTestResultPage />}
              />
              <Route
                path="/schedule-session"
                element={<BookingDetailsPage />}
              />
              <Route path="/chat-list" element={<StudentChatListPage />} />
              <Route path="/meeting-history" element={<MeetingHistoryPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default StudentRouter;
