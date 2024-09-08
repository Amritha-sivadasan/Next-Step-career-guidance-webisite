import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const menuItems = [
  { title: "My Profile", imageUrl: "/profile.png", path: "/profile" },
  {
    title: "Schedule Session",
    imageUrl: "/session.png",
    path: "/schedule-session",
  },
  {
    title: "Psychometric Test Result",
    imageUrl: "/test.png",
    path: "/test-result",
  },
  {
    title: "Meeting History",
    imageUrl: "/meeting.png",
    path: "/meeting-history",
  },
  { title: "Payment History", imageUrl: "/payment-user.png", path: "/payment" },
];

const UserSideBar: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = isDropdownOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative  md:w-1/3 lg:w-1/4 p-4 border-gray-300">
      <button
        onClick={toggleDropdown}
        className="block md:hidden absolute lg:hidden  top-4 left-4 p-2 mb-4 text-white rounded-lg shadow-lg border border-gray-200 bg-white "
      >
        <FaBars color="black" />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="fixed inset-0 z-40 bg-white shadow-lg border border-gray-200">
          <div className="absolute top-0 right-0 p-4">
            <button
              onClick={toggleDropdown}
              className="p-2 text-black rounded-lg"
            >
              Close
            </button>
          </div>
          <div className="mt-28">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center p-4 border-b border-gray-200 hover:bg-gray-100 ${
                  location.pathname === item.path ? "bg-blue-100" : ""
                }`}
                onClick={() => setDropdownOpen(false)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-6 h-6 mr-2"
                />
                <span className="text-lg">{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Desktop Menu */}
      <div className="hidden md:block">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex flex-col items-center p-4 mb-4 rounded-lg shadow-lg border border-gray-200 cursor-pointer ${
              location.pathname === item.path ? "bg-gray-200" : ""
            }`}
          >
            <span className="text-lg">{item.title}</span>
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-22 h-24 mb-2"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserSideBar;
