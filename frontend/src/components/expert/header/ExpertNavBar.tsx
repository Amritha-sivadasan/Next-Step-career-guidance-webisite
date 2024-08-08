import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { useAppSelector } from "../../../hooks/useTypeSelector";

const ExpertNavbar: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAuthenticated, expert } = useAppSelector((state) => state.expert);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleProfile = () => {
    navigate("/expert/profile");
  };

  return (
    <header className="bg-white shadow w-full">
      <div className="w-full px-4 py-3 flex justify-between items-center">
        <Link
          to="/expert"
          className="flex items-center space-x-3 md:space-x-2 ms-7"
        >
          <img src="/image.png" alt="Website Logo" className="h-6" />
          <h1 className="text-[#0B2149] text-2xl font-bold">NextStep</h1>
        </Link>

        <div className="md:hidden flex items-center">
          <button onClick={toggleSidebar} className="text-[#0B2149]">
            {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        <div className="hidden md:flex w-5/12 justify-between me-5">
          <nav className="flex items-center space-x-20 w-full">
            <ul className="flex space-x-8">
              <li>
                <a
                  href="#"
                  className="text-[#0B2149] font-thin hover:text-black"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-[#0B2149] font-thin hover:text-black"
                >
                  How it Works
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-[#0B2149] font-thin hover:text-black"
                >
                  Contact us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#0B2149] font-thin hover:text-black"
                >
                  About Us
                </a>
              </li>
            </ul>
          </nav>

          {isAuthenticated ? (
            <>
              <FaUser size={20} style={{ color: "#0B2149" }} />
              <button className="font-bold w-32 " onClick={handleProfile}>
                {expert?.user_name}
              </button>
            </>
          ) : (
            <Link
              to="/expert/login"
              className="bg-[#0B2149] text-white px-4 py-2 rounded-lg hover: transition duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Sidebar for mobile screens */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleSidebar} className="text-[#0B2149]">
            <FaTimes size={24} />
          </button>
        </div>
        <nav className="flex flex-col items-center">
          <ul className="space-y-4 mt-8">
            <li>
              <Link
                to="/expert"
                className="text-[#0B2149] font-thin hover:text-blue-800"
                onClick={toggleSidebar} // Close the sidebar on click
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/how-it-works"
                className="text-[#0B2149] font-thin hover:text-blue-800"
                onClick={toggleSidebar}
              >
                How it Works
              </Link>
            </li>

            <li>
              <Link
                to="/contact-us"
                className="text-[#0B2149] font-thin hover:text-blue-800"
                onClick={toggleSidebar}
              >
                Contact us
              </Link>
            </li>
            <li>
              <Link
                to="/about-us"
                className="text-[#0B2149] font-thin hover:text-blue-800"
                onClick={toggleSidebar}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/expert/login"
                className="text-[#0B2149] font-thin hover:text-blue-800"
                onClick={toggleSidebar}
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default ExpertNavbar;
