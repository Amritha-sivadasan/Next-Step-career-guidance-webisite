// src/components/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaCalendarAlt, FaComments, FaCreditCard, FaHistory, FaClock, FaSignOutAlt } from 'react-icons/fa';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, to }) => {
  return (
    <Link to={to} className="flex items-center space-x-3 p-2 text-gray-600 hover:bg-gray-200 rounded-lg">
      <Icon className="h-6 w-6" />
      <span>{label}</span>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-white p-4 shadow-lg">
      <div className="flex items-center space-x-4 p-2 mb-5">
        <FaUserCircle className="h-10 w-10 text-gray-500" />
        <div>
          <h4 className="font-semibold text-lg">Amritha</h4>
          <p className="text-gray-600">amr@gmail.com</p>
        </div>
      </div>
      <nav className="space-y-2">
        <SidebarItem icon={FaUserCircle} label="My Profile" to="/profile" />
        <SidebarItem icon={FaCalendarAlt} label="Booking Request" to="/booking-request" />
        <SidebarItem icon={FaCalendarAlt} label="Available Schedule" to="/available-schedule" />
        <SidebarItem icon={FaComments} label="Chat with Student" to="/chat-with-student" />
        <SidebarItem icon={FaClock} label="Meeting Start" to="/meeting-start" />
        <SidebarItem icon={FaCreditCard} label="Payment History" to="/payment-history" />
        <SidebarItem icon={FaHistory} label="Meeting History" to="/meeting-history" />
        <SidebarItem icon={FaSignOutAlt} label="Logout" to="/logout" />
      </nav>
    </div>
  );
};

export default Sidebar;
