import { Navigate, Outlet } from "react-router-dom";

const ExpertPrivateRoute = () => {
  const expertAuth = localStorage.getItem("expertAuth");
  return expertAuth ? <Outlet /> : <Navigate to="/expert/login" replace />;
};

export default ExpertPrivateRoute;
