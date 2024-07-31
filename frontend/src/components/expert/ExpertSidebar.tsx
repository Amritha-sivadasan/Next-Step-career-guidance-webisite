// src/components/Sidebar.tsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaCalendarAlt,
  FaComments,
  FaCreditCard,
  FaHistory,
  FaClock,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAppSelector } from "../../hooks/useTypeSelector";

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
  const getImageSrc = () => {
    if (typeof expert?.profile_picture === "string") {
      return expert.profile_picture;
    }
    if (expert?.profile_picture instanceof File) {
      return URL.createObjectURL(expert.profile_picture);
    }
    return "/path/to/placeholder-image.png";
  };
  return (
    <div className="w-72 bg-white p-4 shadow-lg">
      <div className="flex items-center space-x-4 p-3 w-full  mb-5 border rounded-lg h-32 bg-[#F2F2F2]">
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
      <nav className="space-y-2 ">
    
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
        <SidebarItem icon={FaSignOutAlt} label="Logout" to="/expert/logout" />
      </nav>
    </div>
  );
};

export default Sidebar;
