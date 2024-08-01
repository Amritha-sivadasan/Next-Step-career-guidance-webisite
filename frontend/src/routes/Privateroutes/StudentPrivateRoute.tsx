import { Navigate, Outlet } from "react-router-dom";

const StudentPrivateRoute = () => {
  const userAuth= localStorage.getItem("userAuth");
  
  return userAuth ? <Outlet/> : <Navigate to="/login" replace />;
};

export default StudentPrivateRoute
