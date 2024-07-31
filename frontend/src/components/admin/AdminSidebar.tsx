// src/components/admin/AdminSidebar.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
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
} from "react-icons/fa";
import { GiBrain } from "react-icons/gi";

const Sidebar: React.FC = () => {
  const location = useLocation();

  const getLinkClass = (paths: string[]) => {
    return paths.some((path) => location.pathname.startsWith(path))
      ? "p-2 flex items-center bg-gray-200 rounded text-black"
      : "p-2 flex items-center hover:bg-gray-200 rounded text-gray-700";
  };

  return (
    <aside className="w-72 bg-white text-black flex flex-col p-4 space-y-4 border">
      <Link to="/admin" className={getLinkClass(["/admin"])}>
        <FaHome className="mr-2" />
        Dashboard
      </Link>
      <Link to="/admin/report" className={getLinkClass(["/admin/report"])}>
        <FaChartLine className="mr-2" />
        Report
      </Link>
      <Link to="/admin/users" className={getLinkClass(["/admin/users"])}>
        <FaUsers className="mr-2" />
        Users
      </Link>
      <Link
        to="/admin/experts"
        className={getLinkClass(["/admin/experts", "/admin/expertView"])}
      >
        <FaUserTie className="mr-2" />
        Experts
      </Link>
      <Link
        to="/admin/booking-details"
        className={getLinkClass(["/admin/booking-details"])}
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
      >
        <FaTags className="mr-2" />
        Category
      </Link>
      <Link
        to="/admin/subCategory"
        className={getLinkClass([
          "/admin/subCategory",
          "/admin/addSubCategory",
          "/admin/editSubCategory"
        ])}
      >
        <FaListAlt className="mr-2" />
        Sub-Category
      </Link>
      <Link
        to="/admin/psychometric-test"
        className={getLinkClass(["/admin/psychometric-test"])}
      >
        <GiBrain className="mr-2" />
        Psychometric Test
      </Link>
      <Link
        to="/admin/review-rating"
        className={getLinkClass(["/admin/review-rating"])}
      >
        <FaStar className="mr-2" />
        Review & Rating
      </Link>
      <Link to="/admin/faq" className={getLinkClass(["/admin/faq"])}>
        <FaQuestionCircle className="mr-2" />
        FAQ
      </Link>
      <Link to="/admin/logout" className={getLinkClass(["/admin/logout"])}>
        <FaSignOutAlt className="mr-2" />
        Logout
      </Link>
    </aside>
  );
};

export default Sidebar;
