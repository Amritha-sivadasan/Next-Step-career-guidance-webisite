import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaChartLine,
  FaUsers,
  FaUserTie,
  FaCalendarCheck,
  FaTags,
  FaListAlt,
  FaStar,
  FaQuestionCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { GiBrain } from "react-icons/gi";
import { adminLogout } from "../../../services/api/adminApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setadminAuthenticated } from "../../../features/admin/adminSlice";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleAdminLogout = async () => {
    const response = await adminLogout();
    if (response.success) {
      localStorage.removeItem("adminAuth");
      localStorage.removeItem("adminName");
      localStorage.removeItem("adminAccess");
      dispatch(setadminAuthenticated(false));
      navigate("/admin/login");
    } else {
      toast.error("Something went wrong");
    }
    setIsSidebarOpen(false); // Close the sidebar on logout
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false); // Close the sidebar on mobile view
    }
  };

  const getLinkClass = (paths: string[]) => {
    return paths.some((path) => location.pathname.startsWith(path))
      ? "p-2 flex items-center bg-gray-200 rounded text-black"
      : "p-2 flex items-center hover:bg-gray-200 rounded text-gray-700";
  };

  return (
    <>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 text-gray-600 hover:text-gray-900  "
      >
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
      <aside
        className={`fixed inset-y-0 left-0 bg-white text-black flex flex-col p-4 space-y-4 border transition-transform transform ${
          isSidebarOpen ? "translate-x-0 mt-14" : "-translate-x-full"
        } md:translate-x-0 md:relative md:w-64 lg:w-64`}
      >
        <Link
          to="/admin"
          className={`p-2 flex items-center rounded ${
            location.pathname === "/admin"
              ? "bg-gray-200 text-#0B2149"
              : "hover:bg-gray-200 text-#0B2149"
          }`}
          onClick={handleLinkClick}
        >
          <FaHome className="mr-2" />
          Dashboard
        </Link>
        <Link
          to="/admin/report"
          className={getLinkClass(["/admin/report"])}
          onClick={handleLinkClick}
        >
          <FaChartLine className="mr-2" />
          Report
        </Link>
        <Link
          to="/admin/users"
          className={getLinkClass(["/admin/users", "/admin/studentView"])}
          onClick={handleLinkClick}
        >
          <FaUsers className="mr-2" />
          Users
        </Link>
        <Link
          to="/admin/experts"
          className={getLinkClass(["/admin/experts", "/admin/expertView"])}
          onClick={handleLinkClick}
        >
          <FaUserTie className="mr-2" />
          Experts
        </Link>
        <Link
          to="/admin/booking-details"
          className={getLinkClass(["/admin/booking-details"])}
          onClick={handleLinkClick}
        >
          <FaCalendarCheck className="mr-2" />
          Booking Details
        </Link>
        <Link
          to="/admin/category"
          className={getLinkClass([
            "/admin/category",
            "/admin/addCategory",
            "/admin/editCategory",
          ])}
          onClick={handleLinkClick}
        >
          <FaTags className="mr-2" />
          Category
        </Link>
        <Link
          to="/admin/subCategory"
          className={getLinkClass([
            "/admin/subCategory",
            "/admin/addSubCategory",
            "/admin/editSubCategory",
          ])}
          onClick={handleLinkClick}
        >
          <FaListAlt className="mr-2" />
          Sub-Category
        </Link>
        <Link
          to="/admin/psychometric-test"
          className={getLinkClass(["/admin/psychometric-test","/admin/add-psychometric-test"])}
          onClick={handleLinkClick}
        >
          <GiBrain className="mr-2" />
          Psychometric Test
        </Link>
        <Link
          to="/admin/review-rating"
          className={getLinkClass(["/admin/review-rating"])}
          onClick={handleLinkClick}
        >
          <FaStar className="mr-2" />
          Review & Rating
        </Link>
        <Link
          to="/admin/faq"
          className={getLinkClass(["/admin/faq"])}
          onClick={handleLinkClick}
        >
          <FaQuestionCircle className="mr-2" />
          FAQ
        </Link>
        <button
          className="p-2 flex items-center rounded text-black"
          onClick={handleAdminLogout}
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
