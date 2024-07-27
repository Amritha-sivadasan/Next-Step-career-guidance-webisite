import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/useTypeSelector";

const ExpertPrivateRoute=()=>{

    const {isAuthenticated}=useAppSelector((state)=>state.expert)
    return isAuthenticated ? <Outlet/> : <Navigate to="/expert/login" replace />;
}

export default ExpertPrivateRoute