import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/useTypeSelector";

const AdmintPrivateRoute=()=>{

    const {isAuthenticated}=useAppSelector((state)=>state.admin)
    return isAuthenticated ? <Outlet/> : <Navigate to="/admin/login" replace />;
}

export default AdmintPrivateRoute