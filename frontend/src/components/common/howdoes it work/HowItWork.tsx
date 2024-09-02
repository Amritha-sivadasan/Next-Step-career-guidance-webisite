import React, { useState, useEffect } from "react";
import { FaSearch, FaLink, FaCompass } from "react-icons/fa";

const HowItWorks: React.FC = () => {
  const [activeIcon, setActiveIcon] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIcon((prev) => (prev === 2 ? 0 : prev + 1));
    }, 1500); // Adjust the timing for the transition

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-14">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl text-[#0B2149] font-bold ">
          How Does It Work?
        </h2>
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4">
          {/* Left Side - Icons with connecting lines */}
          <div className="col-span-1 hidden md:flex flex-col items-center relative">
            <div className="flex flex-col items-center">
              {/* Icon 1 */}
              <div
                className={`bg-[#0B2149] p-4 rounded-full shadow-md transform transition-transform duration-700 ${
                  activeIcon === 0 ? "scale-110" : "scale-100"
                }`}
              >
                <FaSearch className="text-2xl text-white" />
              </div>
              <div
                className={`w-[5px] bg-[#0B2149] h-40 transition-all duration-700 ${
                  activeIcon === 0 ? "h-48" : "h-40"
                }`}
              ></div>
            </div>
            <div className="flex flex-col items-center">
              {/* Icon 2 */}
              <div
                className={`bg-[#0B2149] p-4 rounded-full shadow-md transform transition-transform duration-700 ${
                  activeIcon === 1 ? "scale-110" : "scale-100"
                }`}
              >
                <FaLink className="text-2xl text-white" />
              </div>
              <div
                className={`w-[5px] bg-[#0B2149] h-44 transition-all duration-700 ${
                  activeIcon === 1 ? "h-52" : "h-44"
                }`}
              ></div>
            </div>
            <div className="flex flex-col items-center">
              {/* Icon 3 */}
              <div
                className={`bg-[#0B2149] p-4 rounded-full shadow-md transform transition-transform duration-700 ${
                  activeIcon === 2 ? "scale-110" : "scale-100"
                }`}
              >
                <FaCompass className="text-2xl text-white" />
              </div>
            </div>
          </div>

          {/* Right Side - Detailed Description */}
          <div className="col-span-3 flex flex-col space-y-12 md:space-y-0 ">
            {/* Content 1 */}
            <div className="flex flex-col items-center md:flex-row md:items-start mb-12">
              <div className="flex-1  md:mb-0 text-center md:text-left">
                <h3 className="text-2xl font-bold flex items-center">
                  <FaSearch className="text-2xl text-[#0B2149] md:hidden mr-2" />
                  Explore Career Paths
                </h3>
                <p className="mt-2">
                  Discover a variety of career paths and opportunities tailored
                  to your interests and skills. Our platform provides
                  comprehensive resources and expert guidance to help you
                  navigate your career journey with confidence.
                </p>
              </div>
              <img
                src="/explore.png"
                alt="Explore Career Paths"
                className="w-3/4 md:w-1/4 mt-4 md:mt-0 md:ml-5"
              />
            </div>
            {/* Content 2 */}
            <div className="flex flex-col items-center md:flex-row md:items-start mb-12">
              <div className="flex-1  md:mb-0 text-center md:text-left">
                <h3 className="text-2xl font-bold flex items-center">
                  <FaLink className="text-2xl text-[#0B2149] md:hidden mr-2" />
                  Connect with Experts
                </h3>
                <p className="mt-2">
                  Build meaningful connections with industry experts and mentors
                  who possess a wealth of knowledge and experience. These
                  valuable relationships can offer you profound insights into
                  industry trends, emerging opportunities, and best practices.
                </p>
              </div>
              <img
                src="/connect.png"
                alt="Connect with Experts"
                className="w-[319px]  mb-10 md:w-1/4 mt-4 md:mt-0 md:ml-5"
              />
            </div>
            {/* Content 3 */}
            <div className="flex flex-col items-center md:flex-row md:items-start mb-12">
              <div className="flex-1  md:mb-0 text-center md:text-left">
                <h3 className="text-2xl font-bold flex items-center">
                  <FaCompass className="text-2xl text-[#0B2149] md:hidden mr-2" />
                  Explore Future Opportunities
                </h3>
                <p className="mt-2">
                  Stay informed about the latest trends and opportunities in
                  your field to continuously grow and advance in your career.
                </p>
              </div>
              <img
                src="/path.png"
                alt="Explore Future Opportunities"
                className="w-3/4 md:w-1/4 mt-4 md:mt-0 md:ml-5"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
