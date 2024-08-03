import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaCalendarAlt,
  FaComments,
  FaCreditCard,
  FaHistory,
  FaClock,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { useAppSelector } from "../../hooks/useTypeSelector";
import { logoutExpert } from "../../services/api/ExpertApi";
import { useDispatch } from "react-redux";
import { setExpertAuthenticated } from "../../features/expert/expertAuthSlice";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, to }) => {
  return (
    <Link
      to={to}
      className="flex items-center space-x-3 p-2 text-gray-600 hover:bg-gray-200 rounded-lg"
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

  const getImageSrc = () => {
    if (typeof expert?.profile_picture === "string") {
      return expert.profile_picture;
    }
    if (expert?.profile_picture instanceof File) {
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

  return (
    <div className="md:flex">
      <button className="md:hidden p-4" onClick={toggleSidebar}>
        <FaBars size={24} />
      </button>
      <div
        className={`fixed z-40 md:static md:z-auto transition-transform transform md:transform-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:w-72 bg-white p-4 shadow-lg`}
      >
        <div className="flex items-center space-x-4 p-3 w-full mb-5 border rounded-lg h-32 bg-[#F2F2F2]">
          <img
            src={getImageSrc()}
            alt="Profile"
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <h4 className="font-semibold text-lg">{expert?.user_name}</h4>
            <p className="text-gray-600">{expert?.email}</p>
          </div>
        </div>
        <nav className="space-y-2">
          <SidebarItem
            icon={FaUserCircle}
            label="My Profile"
            to="/expert/profile"
          />
          <SidebarItem
            icon={FaCalendarAlt}
            label="Booking Request"
            to="/expert/booking-request"
          />
          <SidebarItem
            icon={FaCalendarAlt}
            label="Available Schedule"
            to="/expert/available-schedule"
          />
          <SidebarItem
            icon={FaComments}
            label="Chat with Student"
            to="/expert/chat-with-student"
          />
          <SidebarItem
            icon={FaClock}
            label="Meeting Start"
            to="/expert/meeting-start"
          />
          <SidebarItem
            icon={FaCreditCard}
            label="Payment History"
            to="/expert/payment-history"
          />
          <SidebarItem
            icon={FaHistory}
            label="Meeting History"
            to="/expert/meeting-history"
          />
          <div className="flex items-center space-x-3 p-2 text-gray-600 hover:bg-gray-200 rounded-lg">
            <FaSignOutAlt />
            <button onClick={handleLogout}>Logout</button>
          </div>
        </nav>
      </div>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={toggleSidebar}
      ></div>
    </div>
  );
};

export default Sidebar;
