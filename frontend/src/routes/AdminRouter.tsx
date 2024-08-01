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
import CategoryTable from "../pages/admin/CategoryList";
import AddnewCategory from "../pages/admin/AddnewCategory";
import EditCategory from "../pages/admin/CategoryEdit";
import Subcategory from "../pages/admin/Subcategory";
import EditSubCategory from "../pages/admin/SubCategoryEdit";
import AddSubCategory from "../pages/admin/AddSubCategory";
import ExpertView from "../pages/admin/ExpertView";
import { useAppSelector } from "../hooks/useTypeSelector";


const AdminRouter = () => {
  const dispatch = useDispatch();
  const { admin, isAuthenticated } = useFetchAdminData();
  const adminData= useAppSelector(state=>state.admin)
  useEffect(() => {
    

    if (admin !== null) {
      dispatch(setAdmin(admin));
      dispatch(setadminAuthenticated(isAuthenticated));
      console.log("isauth", isAuthenticated);
    } else {
      dispatch(setadminAuthenticated(false));
      console.log("isauth", isAuthenticated);
    }
  }, [dispatch, admin,isAuthenticated]);
  return (
    <div className="flex h-screen bg-gray-100">
      <Routes>
        <Route
          path="/login"
          element={
            adminData.isAuthenticated? (
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
            <Route
              path="/editCategory/:categoryId"
              element={<EditCategory />}
            />
            <Route path="/subCategory" element={<Subcategory />} />
            <Route path="/addSubCategory" element={<AddSubCategory />} />
            <Route
              path="/editSubCategory/:categoryId"
              element={<EditSubCategory />}
            />
            <Route path="/expertView/:expertId" element={<ExpertView />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default AdminRouter;
