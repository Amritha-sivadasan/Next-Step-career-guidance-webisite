import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";
import Sidebar from "../components/admin/AdminSidebar";
import Header from "../components/admin/AdminLayout";
import Dashboard from "../pages/admin/AdimnDashboard";
import Experts from "../pages/admin/ExpertDetails";

const AdminRouter = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/experts" element={<Experts />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </div>
  );
};

export default AdminRouter;
