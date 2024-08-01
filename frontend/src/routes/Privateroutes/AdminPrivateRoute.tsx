import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoute = () => {

  const adminAuth = localStorage.getItem("adminAuth");
  return adminAuth ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminPrivateRoute;
