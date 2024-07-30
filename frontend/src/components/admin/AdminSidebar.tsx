// src/components/admin/AdminSidebar.tsx
import React from "react";
import { Link } from "react-router-dom";
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
  return (
    <aside className="w-72 bg-white text-black flex flex-col p-4 space-y-4 border">
      <Link
        to="/admin"
        className="p-2 flex items-center hover:bg-gray-200 rounded"
      >
        <FaHome className="mr-2 text-gray-700" />
        Dashboard
      </Link>
      <Link
        to="/admin/report"
        className="p-2 flex items-center hover:bg-gray-200 rounded"
      >
        <FaChartLine className="mr-2 text-gray-700" />
        Report
      </Link>
      <Link
        to="/admin/users"
        className="p-2 flex items-center hover:bg-gray-200 rounded"
      >
        <FaUsers className="mr-2 text-gray-700" />
        Users
      </Link>
      <Link
        to="/admin/experts"
        className="p-2 flex items-center hover:bg-gray-200 rounded"
      >
        <FaUserTie className="mr-2 text-gray-700" />
        Experts
      </Link>
      <Link
        to="/admin/booking-details"
        className="p-2 flex items-center hover:bg-gray-200 rounded"
      >
        <FaCalendarCheck className="mr-2 text-gray-700" />
        Booking Details
      </Link>
      <Link
        to="/admin/category"
        className="p-2 flex items-center hover:bg-gray-200 rounded"
      >
        <FaTags className="mr-2 text-gray-700" />
        Category
      </Link>
      <Link
        to="/admin/sub-category"
        className="p-2 flex items-center hover:bg-gray-200 rounded"
      >
        <FaListAlt className="mr-2 text-gray-700" />
        Sub-Category
      </Link>
      <Link
        to="/admin/users"
        className="p-2 flex items-center hover:bg-gray-200 rounded"
      >
        <GiBrain className="mr-2 text-gray-700" />
        Psychometric Test
      </Link>
      <Link
        to="/admin/review-rating"
        className="p-2 flex items-center hover:bg-gray-200 rounded"
      >
        <FaStar className="mr-2 text-gray-700" />
        Review & Rating
      </Link>
      <Link
        to="/admin/faq"
        className="p-2 flex items-center hover:bg-gray-200 rounded"
      >
        <FaQuestionCircle className="mr-2 text-gray-700" />
        FAQ
      </Link>
      <Link
        to="/admin/logout"
        className="p-2 flex items-center hover:bg-gray-200 rounded"
      >
        <FaSignOutAlt className="mr-2 text-gray-700" />
        Logout
      </Link>
    </aside>
  );
};

export default Sidebar;
