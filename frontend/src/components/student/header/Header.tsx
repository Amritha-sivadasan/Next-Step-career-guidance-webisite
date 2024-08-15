import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAppSelector } from "../../../hooks/useTypeSelector";

const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isAuthenticated, user } = useAppSelector((state) => state.student);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleProfile = () => {
    try {
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const smoothScrollTo = (targetId: string, duration: number) => {
    const targetElement = targetId ? document.getElementById(targetId) : null;
    const start = window.scrollY;
    const targetPosition = targetElement
      ? targetElement.getBoundingClientRect().top + start
      : 0; // Scroll to the top if no targetId is provided
    const distance = targetPosition - start;
    const startTime = performance.now();

    const scroll = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      window.scrollTo(0, start + distance * easeInOutQuad(progress));
      if (timeElapsed < duration) {
        requestAnimationFrame(scroll);
      }
    };

    const easeInOutQuad = (t: number) => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    requestAnimationFrame(scroll);
  };

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    if (targetId === "") {
      smoothScrollTo("", 1200);
    } else {
      smoothScrollTo(targetId, 1200);
    }
  };

  return (
    <header className="bg-white shadow fixed top-0 left-0 w-full z-50">
      <div className="w-full px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 md:space-x-2 ms-7">
          <img src="/image.png" alt="Website Logo" className="h-6" />
          <h1 className="text-[#0B2149] text-2xl font-bold">NextStep</h1>
        </Link>

        <div className="md:hidden flex items-center">
          <button onClick={toggleSidebar} className="text-[#0B2149]">
            {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        <div className="hidden md:flex w-7/12 justify-between me-5">
          <nav className="flex items-center space-x-20 w-full ">
            <ul className="flex space-x-8 ">
              <li className="transition-transform duration-200 hover:scale-105">
                <Link
                  to="/"
                  className="text-[#0B2149] font-thin hover:text-black "
                  onClick={(e) => handleScroll(e, "")}
                >
                  Home
                </Link>
              </li>
              <li className="transition-transform duration-300 hover:scale-105">
                <a
                  href="#find_path"
                  className="text-[#0B2149] font-thin hover:text-black"
                  onClick={(e) => handleScroll(e, "find_path")}
                >
                  Find Your Path
                </a>
              </li>
              <li className="transition-transform duration-300 hover:scale-105">
                <a
                  href="#how_work"
                  className="text-[#0B2149] font-thin hover:text-black"
                  onClick={(e) => handleScroll(e, "how_work")}
                >
                  How it Works
                </a>
              </li>
              <li className="transition-transform duration-300 hover:scale-105">
                <Link
                  to="/expert"
                  className="text-[#0B2149] font-thin hover:text-black"
                >
                  Professional
                </Link>
              </li>
              <li className="transition-transform duration-300 hover:scale-105">
                <a
                  href="#"
                  className="text-[#0B2149] font-thin hover:text-black"
                >
                  Contact us
                </a>
              </li>
              <li className="transition-transform duration-300 hover:scale-105">
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
              <div className="flex items-center ">
                <img
                  src={
                    user?.profile_picture
                      ? user?.profile_picture
                      : "/dummyprofile.jpg"
                  }
                  alt="User avatar"
                  className="h-8 w-8 rounded-full"
                />
                {/* <span className="hidden sm:inline">{admin}</span> */}
                <button className="font-bold  w-24" onClick={handleProfile}>
                  {user?.user_name}
                </button>
              </div>
            </>
          ) : (
            <Link
              to="/login"
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
        } transition-transform duration-300 ease-in-out md:hidden z-50`}
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
                to="/"
                className="text-[#0B2149] font-thin hover:text-blue-800"
                onClick={toggleSidebar} // Close the sidebar on click
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/find-your-path"
                className="text-[#0B2149] font-thin hover:text-blue-800"
                onClick={toggleSidebar}
              >
                Find Your Path
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
                to="/expert"
                className="text-[#0B2149] font-thin hover:text-blue-800"
                onClick={toggleSidebar}
              >
                Professional
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
              {isAuthenticated ? (
                <Link
                  to="/profile"
                  className="text-[#0B2149] font-thin hover:text-blue-800"
                  onClick={toggleSidebar}
                >
                  Profile
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="text-[#0B2149] font-thin hover:text-blue-800"
                  onClick={toggleSidebar}
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
