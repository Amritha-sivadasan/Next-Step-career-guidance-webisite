import React from "react";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 flex flex-col md:flex-row items-center h-14 w-full p-4 bg-white shadow border  z-50">
      {/* Centered on small screens */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full">
        <div className="flex items-center space-x-2 md:space-x-2">
          <img src="/image.png" alt="Website Logo" className="h-6" />
          <h1 className="text-[#0B2149] text-xl font-bold">NextStep</h1>
        </div>
        {/* Hidden on small screens, visible on medium and larger screens */}
        <div className="hidden md:flex items-center space-x-4 md:space-x-10 ml-auto">
          <button className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.437L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
          <div className="flex items-center space-x-2">
            <span className="hidden sm:inline">Anika</span>
            <img
              src="https://via.placeholder.com/150"
              alt="User avatar"
              className="h-8 w-8 rounded-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
