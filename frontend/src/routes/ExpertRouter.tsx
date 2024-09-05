import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import useFetchExpertData from "../hooks/useFetchExpert";
import {
  setExpert,
  setExpertAuthenticated,
} from "../features/expert/expertAuthSlice";
import { useDispatch } from "react-redux";
import ExpertPrivateRoute from "./Privateroutes/ExpertPrivateRoute";
import { useAppSelector } from "../hooks/useTypeSelector";
import { onMessageListener, requestFCMToken } from "../config/firebase";
import  { Toaster } from "react-hot-toast";
import { toast } from "react-toastify";
import LoadingPage from "../components/common/Loading/LoadingPage";
import { getMessaging } from "firebase/messaging";


const Login =lazy(()=>import("../components/common/authentication/Login")) ;
const OtpPage =lazy(()=>import("../components/common/authentication/OtpPage")) ;
const ForgotPassword =lazy(()=>import( "../components/common/authentication/ForgotPassword"));
const  ResetPassword =lazy(()=>import("../components/common/authentication/ResetPassword")) ;
const AboutExpert =lazy(()=>import("../components/expert/about/AboutExpert")) ;
const  ExpertSignup =lazy(()=>import("../components/expert/register/ExpertSignup")) ;
const  ForgotPasswordOtpPage =lazy(()=>import("../components/common/authentication/ForgotPasswordOtp")) ;
const  UpdadteWithOtp = lazy(()=>import("../components/common/authentication/UpdateWithOtpPage")) ;
const  ProfilePage =lazy(()=>import("../pages/expert/Profilepage")) ;
const  HomePage =lazy(()=>import("../pages/expert/HomePage")) ;
const  AvailableSchedule = lazy(()=>import("../pages/expert/AvailableSchedule")) ;
const  BookingDetailsPage =lazy(()=>import("../pages/expert/BookingDetailsPage")) ;
const PaymentHistory =lazy(()=>import("../pages/expert/PaymentHistory")) ;
const ExpertLayout =lazy(()=>import("../components/common/expertLayout/ExpertLayout")) ;
const ExpertChatListPage =lazy(()=>import("../pages/expert/ExpertChatListPage")) ;
const VideoCallPage =lazy(()=>import("../pages/expert/VideoCallPage")) ;
const  MeetingPage =lazy(()=>import("../components/common/videocall/CreateUrl")) ;
const MeetingHistoryPage =lazy(()=>import( "../pages/expert/MeetingHistoryPage"));





interface NotificationPayload {
  notification: {
    title: string;
    body: string;
   
  };
  data?: {
    role:string
  };
}

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
  useEffect(() => {
    const messaging = getMessaging(); 

   
    const handleMessage = (payload: NotificationPayload) => {
      if (payload.notification && payload.data?.role.trim() === "expert") {
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
    };


    const unsubscribe = onMessageListener(messaging, handleMessage);

   
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe(); 
      }
    };
  }, []);

 
   


  return (
    <Suspense fallback={<LoadingPage />}>
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
           <Toaster/>   <Outlet />
            </ExpertLayout>
          }
        >
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/available-schedule" element={<AvailableSchedule />} />
          <Route path="/booking-details" element={<BookingDetailsPage />} />
          <Route path="/payment-history" element={<PaymentHistory />} />
          <Route path="/chat-with-student" element={<ExpertChatListPage />} />
          <Route path="/meeting-start/:meetingId" element={<VideoCallPage />} />
          <Route path="/meeting-start" element={<MeetingPage />} />
          <Route path='/meeting-history' element ={<MeetingHistoryPage/>}/>
        </Route>
      </Route>
    </Routes>
    </Suspense>
  );
};

export default ExpertRouter;
