import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUserCircle,
  FaCalendarAlt,
  FaComments,
  FaCreditCard,
  FaHistory,
  FaClock,
  FaSignOutAlt,
  FaBars,
  FaBook,
} from "react-icons/fa";
import { useAppSelector } from "../../../hooks/useTypeSelector";
import { logoutExpert } from "../../../services/api/ExpertApi";
import { useDispatch } from "react-redux";
import { setExpertAuthenticated } from "../../../features/expert/expertAuthSlice";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  isActive: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  to,
  isActive,
  onClick,
}) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center space-x-3 p-3 text-[#0B2149] rounded-lg border ${
        isActive
          ? "bg-[#0B2149] text-white"
          : "bg-[#F2F2F2] hover:text-white hover:bg-[#0B2149]"
      }`}
    >
      <Icon className="h-6 w-6" />
      <span>{label}</span>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const { expert } = useAppSelector((state) => state.expert);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const getImageSrc = () => {
    if (typeof expert?.profile_picture === "string") {
      return expert.profile_picture;
    }
    if (expert?.profile_picture) {
      return URL.createObjectURL(expert.profile_picture);
    }
    return "/path/to/placeholder-image.png";
  };

  const handleLogout = async () => {
    const response = await logoutExpert();
    if (response.success) {
      localStorage.removeItem("expertAccess");
      localStorage.removeItem("expertId");
      localStorage.removeItem("expertAuth");
      dispatch(setExpertAuthenticated(false));
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row mt-2 bg-white">
      {/* Hamburger Menu Button for Small Screens */}
      <button className="md:hidden p-4" onClick={toggleSidebar}>
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed z-40 p-4 md:static md:z-auto transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-64 md:w-80 bg-white shadow-lg h-full md:h-screen overflow-y-auto`}
      >
        <div className="flex items-center space-x-4 p-3 mb-5 border rounded-lg bg-[#F2F2F2]">
          <img
            src={getImageSrc()}
            alt="Profile"
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <h4 className="font-semibold text-lg text-[#0B2149]">
              {expert?.user_name}
            </h4>
            <p className="text-gray-600">{expert?.email}</p>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex flex-col space-y-2">
          <SidebarItem
            icon={FaUserCircle}
            label="My Profile"
            to="/expert/profile"
            isActive={location.pathname === "/expert/profile"}
            onClick={closeSidebar}
          />
          <SidebarItem
            icon={FaCalendarAlt}
            label="Available Schedule"
            to="/expert/available-schedule"
            isActive={location.pathname === "/expert/available-schedule"}
            onClick={closeSidebar}
          />
          <SidebarItem
            icon={FaBook}
            label="Booking Details"
            to="/expert/booking-details"
            isActive={location.pathname === "/expert/booking-details"}
            onClick={closeSidebar}
          />
          <SidebarItem
            icon={FaComments}
            label="Chat with Student"
            to="/expert/chat-with-student"
            isActive={location.pathname === "/expert/chat-with-student"}
            onClick={closeSidebar}
          />
          <SidebarItem
            icon={FaClock}
            label="Meeting Start"
            to="/expert/meeting-start"
            isActive={location.pathname === "/expert/meeting-start"}
            onClick={closeSidebar}
          />
          <SidebarItem
            icon={FaCreditCard}
            label="Payment History"
            to="/expert/payment-history"
            isActive={location.pathname === "/expert/payment-history"}
            onClick={closeSidebar}
          />
          <SidebarItem
            icon={FaHistory}
            label="Meeting History"
            to="/expert/meeting-history"
            isActive={location.pathname === "/expert/meeting-history"}
            onClick={closeSidebar}
          />
        </nav>

        {/* Logout Button at the Bottom */}
        <div className="mt-auto p-3">
          <div
            className="flex items-center space-x-3 bg-[#F2F2F2] p-3 hover:bg-gray-200 rounded-lg border text-[#0B2149] cursor-pointer"
            onClick={() => {
              handleLogout();
              closeSidebar();
            }}
          >
            <FaSignOutAlt size={24} />
            <span>Logout</span>
          </div>
        </div>
      </div>

      {/* Overlay for Small Screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
