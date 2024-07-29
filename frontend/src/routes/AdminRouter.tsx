import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";
import Sidebar from "../components/admin/AdminSidebar";
import Header from "../components/admin/AdminLayout";
import Dashboard from "../pages/admin/AdimnDashboard";
import Experts from "../pages/admin/ExpertDetails";
import AdmintPrivateRoute from "./Privateroutes/AdminPrivateRoute";
import { useDispatch } from "react-redux";
import useFetchAdminData from "../hooks/useFetchAdmin";
// import { useAppSelector } from "../hooks/useTypeSelector";
import { useEffect } from "react";
import { setAdmin, setadminAuthenticated } from "../features/admin/adminSlice";
import { useAppSelector } from "../hooks/useTypeSelector";

const AdminRouter = () => {
  const dispatch = useDispatch();
  const { admin, isAuthenticated } = useFetchAdminData();
  const adminDetails = useAppSelector((state) => state.admin);

  useEffect(() => {
    if (admin) {
      dispatch(setAdmin(admin));
      dispatch(setadminAuthenticated(isAuthenticated));
    } else {
      dispatch(setadminAuthenticated(false));
      console.log("isauth", isAuthenticated);
    }
  }, [dispatch, admin, isAuthenticated]);
  return (
    <div className="flex h-screen bg-gray-100">
      <Routes>
        <Route
          path="/login"
          element={
            adminDetails.isAuthenticated ? (
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
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Header />
                  <Outlet />
                </div>
              </>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/experts" element={<Experts />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default AdminRouter;
