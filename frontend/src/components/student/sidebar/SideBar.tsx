import React from "react";
import { Link } from "react-router-dom";

// Update with paths to your image assets or URLs
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
  { title: "Meeting History", imageUrl: "/meeting.png", path: "/meeting-history" },
  { title: "Payment History", imageUrl: "/payment-user.png", path: "/payment" },
];

const UserSideBar: React.FC = () => {
  return (
    <div className="md:w-1/3 lg:w-1/4 p-4 border-gray-300">
      {menuItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className="flex flex-col items-center p-4 mb-4 bg-white rounded-lg shadow-lg border border-gray-200 cursor-pointer "
        >
          <span className="text-lg">{item.title}</span>
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-22 h-24 mb-2" // Adjust size as needed
          />
        </Link>
      ))}
    </div>
  );
};

export default UserSideBar;
