import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import AdminLogin from "../components/admin/login/AdminLogin";

import Dashboard from "../components/admin/dashbord/AdimnDashboard";
import AdmintPrivateRoute from "./Privateroutes/AdminPrivateRoute";
import { useDispatch } from "react-redux";
import useFetchAdminData from "../hooks/useFetchAdmin";
// import { useAppSelector } from "../hooks/useTypeSelector";
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
// import Dashboard from "../pages/admin/Dashbord";
import Experts from "../components/admin/expertDetails/ExpertDetails";
import Header from "../components/admin/header/AdminHeader";
import Sidebar from "../components/admin/sidebar/AdminSidebar";

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
          <Route path="/editCategory/:categoryId" element={<EditCategory />} />
          <Route path="/subCategory" element={<SubCategoryTable />} />
          <Route path="/addSubCategory" element={<AddSubCategory />} />
          <Route
            path="/editSubCategory/:categoryId"
            element={<EditSubCategory />}
          />
          <Route path="/expertView/:expertId" element={< ExpertDetailsView/>} />
        </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default AdminRouter;
