// src/components/admin/AdminSidebar.tsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col p-4 space-y-4">
      <Link to="/admin" className="p-2 hover:bg-gray-700 rounded">
        Dashboard
      </Link>
      <Link to="/admin/report" className="p-2 hover:bg-gray-700 rounded">
        Report
      </Link>
      <Link to="/admin/users" className="p-2 hover:bg-gray-700 rounded">
        Users
      </Link>
      <Link to="/admin/experts" className="p-2 hover:bg-gray-700 rounded">
        Experts
      </Link>
      <Link
        to="/admin/booking-details"
        className="p-2 hover:bg-gray-700 rounded"
      >
        Booking Details
      </Link>
      <Link to="/admin/category" className="p-2 hover:bg-gray-700 rounded">
        Category
      </Link>
      <Link to="/admin/sub-category" className="p-2 hover:bg-gray-700 rounded">
        Sub-Category
      </Link>
      <Link to="/admin/review-rating" className="p-2 hover:bg-gray-700 rounded">
        Review & Rating
      </Link>
      <Link to="/admin/faq" className="p-2 hover:bg-gray-700 rounded">
        FAQ
      </Link>
      <Link to="/admin/logout" className="p-2 hover:bg-gray-700 rounded">
        Logout
      </Link>
    </aside>
  );
};

export default Sidebar;
