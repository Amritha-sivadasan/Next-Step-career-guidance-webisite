import { Routes, Route } from "react-router-dom";
import AdminLogin from "../pages/admin/AdminLogin";

const AdminRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
    </Routes>
  );
};

export default AdminRouter;
