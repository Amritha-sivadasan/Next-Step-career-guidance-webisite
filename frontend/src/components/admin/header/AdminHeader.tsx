import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { useAppSelector } from "../../../hooks/useTypeSelector";

const Header: React.FC = () => {
  const { admin } = useAppSelector((state) => state.admin);
  return (
    <header className="sticky top-0 flex flex-col md:flex-row items-center h-14 w-full p-4 bg-white shadow border  z-50">
      {/* Centered on small screens */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full">
        <div className="flex items-center space-x-2 md:space-x-2">
          <img src="/image.png" alt="Website Logo" className="h-6" />
          <h1 className="text-[#0B2149] text-xl font-bold">NextStep</h1>
        </div>
        {/* Hidden on small screens, visible on medium and larger screens */}
        <div className="hidden md:flex items-center space-x-4 md:space-x-5 ml-auto me-8">
          <button className="relative ">
            <IoIosNotifications size={24} />
          </button>
          <div className="flex items-center space-x-2">
            <img
              src="/dummyprofile.jpg"
              alt="User avatar"
              className="h-8 w-8 rounded-full"
            />
            <span className="hidden sm:inline">{admin}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
