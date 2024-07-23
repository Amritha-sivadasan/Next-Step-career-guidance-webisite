import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "../../hooks/useTypeSelector";

const StudentPrivateRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.student);
  return isAuthenticated ? <Outlet/> : <Navigate to="/login" replace />;
};

export default StudentPrivateRoute
