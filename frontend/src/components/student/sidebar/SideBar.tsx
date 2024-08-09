import React from "react";

const UserSideBar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen flex flex-col p-4">
      <div className="flex flex-col gap-4">
        {/* Profile Section */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Profile</h2>
          {/* Add profile details or avatar here */}
        </div>

        {/* Second Section */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Second Section</h2>
          {/* Add content for the second section here */}
        </div>

        {/* Third Section */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Third Section</h2>
          {/* Add content for the third section here */}
        </div>

        {/* Fourth Section */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Fourth Section</h2>
          {/* Add content for the fourth section here */}
        </div>

        {/* Fifth Section */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h2 className="text-lg font-semibold">Fifth Section</h2>
          {/* Add content for the fifth section here */}
        </div>
      </div>
    </div>
  );
};

export default UserSideBar;
