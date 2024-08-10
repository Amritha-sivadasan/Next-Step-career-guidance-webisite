import React from "react";

// Update with paths to your image assets or URLs
const menuItems = [
  { title: "My Profile", imageUrl: "/profile.png" },
  { title: "Schedule Session", imageUrl: "/session.png" },
  { title: "Psychometric Test", imageUrl: "/test.png" },
  { title: "Meeting History", imageUrl: "/meeting.png" },
  { title: "Payment History", imageUrl: "/payment-user.png" },
];

const UserSideBar: React.FC = () => {
  return (
    <div className="sm: md:w-1/3 lg:w-1/4 p-4 border-gray-300">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center p-4 mb-4 bg-white rounded-lg shadow-lg border border-gray-200 cursor-pointer"
        >
          <span className="text-lg">{item.title}</span>
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-22 h-24 mb-2" // Adjust size as needed
          />
        </div>
      ))}
    </div>
  );
};

export default UserSideBar;
