import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import AdminLogin from "../components/admin/login/AdminLogin";

import Dashboard from "../components/admin/dashbord/AdimnDashboard";
import AdmintPrivateRoute from "./Privateroutes/AdminPrivateRoute";
import { useDispatch } from "react-redux";
import useFetchAdminData from "../hooks/useFetchAdmin";
import { useEffect } from "react";
import { setAdmin, setadminAuthenticated } from "../features/admin/adminSlice";
import CategoryTable from "../components/admin/category/CategoryList";
import AddnewCategory from "../components/admin/category/AddnewCategory";
import EditCategory from "../components/admin/category/CategoryEdit";
import SubCategoryTable from "../components/admin/subcategory/Subcategory";
import EditSubCategory from "../components/admin/subcategory/SubCategoryEdit";
import AddSubCategory from "../components/admin/subcategory/AddSubCategory";
import ExpertDetailsView from "../components/admin/expertDetails/ExpertView";
import { useAppSelector } from "../hooks/useTypeSelector";
import Experts from "../components/admin/expertDetails/ExpertDetails";
import Header from "../components/admin/header/AdminHeader";
import Sidebar from "../components/admin/sidebar/AdminSidebar";
import BookingDetails from "../components/admin/booking/BookingDetails";
import BookingView from "../components/admin/booking/BookingView";
import StudentDetails from "../pages/admin/StudentDetails";
import StudentSingleView from "../pages/admin/StudentSingleView";
import PsychometricTestPage from "../pages/admin/PsychometricTestPage";
import AddPsychometricTestPage from "../pages/admin/AddPsychometricTestPage";
import FaqPage from "../pages/admin/FaqPage";
import ReviewAndRatingPage from "../pages/admin/ReviewAndRatingPage";
import { onMessageListener, requestFCMToken } from "../config/firebase";
import toast, { Toaster } from "react-hot-toast";

const AdminRouter = () => {
  const dispatch = useDispatch();
  const { admin, isAuthenticated } = useFetchAdminData();
  const adminData = useAppSelector((state) => state.admin);
  useEffect(() => {
    if (admin !== null) {
      dispatch(setAdmin(admin));
      dispatch(setadminAuthenticated(isAuthenticated));
      console.log("isauth", isAuthenticated);
    } else {
      dispatch(setadminAuthenticated(false));
      console.log("isauth", isAuthenticated);
    }
  }, [dispatch, admin, isAuthenticated]);

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
  interface NotificationPayload {
    notification: {
      title: string;
      body: string;
     
    };
    data?: {
      role:string
    };
  }
 
    onMessageListener()
      .then((payload: NotificationPayload) => {
        if (payload.notification && payload.data?.role=='admin' ) {
          toast(
            <div>
              <strong>{payload.notification.title}</strong>
              <p>{payload.notification.body}</p>
            </div>,
            { position: 'top-right' }
          );
          console.log("Received foreground message:", payload);
        }
      })
      .catch((err) => console.log("Error in receiving foreground message:", err));






  return (
    <div className="flex h-screen bg-gray-100">
      <Routes>
        <Route
          path="/login"
          element={
            adminData.isAuthenticated ? (
              <Navigate to="/admin" />
            ) : (
              <AdminLogin />
            )
          }
        />

        <Route element={<AdmintPrivateRoute />}>
          <Route
            element={
              <>
                <div className="flex flex-col w-full">
                  <Header />
                  <Toaster/>
                  <div className="flex-1 flex bg-white ">
                    <Sidebar />
                    <Outlet />
                  </div>
                </div>
              </>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/experts" element={<Experts />} />
            <Route path="/category" element={<CategoryTable />} />
            <Route path="/addCategory" element={<AddnewCategory />} />
            <Route
              path="/editCategory/:categoryId"
              element={<EditCategory />}
            />
            <Route path="/subCategory" element={<SubCategoryTable />} />
            <Route path="/addSubCategory" element={<AddSubCategory />} />
            <Route path="/booking-details" element={<BookingDetails />} />
            <Route path="/booking-view/:bookingId" element={<BookingView />} />
            <Route
              path="/editSubCategory/:categoryId"
              element={<EditSubCategory />}
            />
            <Route
              path="/expertView/:expertId"
              element={<ExpertDetailsView />}
            />
            <Route path="/users" element={<StudentDetails />} />
            <Route
              path="/studentView/:studentId"
              element={<StudentSingleView />}
            />
            <Route
              path="/psychometric-test"
              element={<PsychometricTestPage />}
            />
            <Route
              path="/add-psychometric-test"
              element={<AddPsychometricTestPage />}
            />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/review-rating" element={<ReviewAndRatingPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default AdminRouter;
