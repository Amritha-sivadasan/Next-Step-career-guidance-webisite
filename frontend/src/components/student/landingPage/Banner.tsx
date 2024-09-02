import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/useTypeSelector";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const Banner: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.student);

  const handleGetStart = () => {
    navigate("/login");
  };
  return (
    <section className="bg-[#0B2149] text-white h-[80vh] py-20 rounded-b-3xl flex flex-col md:flex-row items-center">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* Text Section */}
        <motion.div
          className="md:w-3/4 w-full text-center  md:text-left mb-8 md:mb-0"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <h1 className="text-2xl md:text-4xl font-bold mb-6 md:mb-10">
            Discover Your Future: Connect with Industry Experts Today!
          </h1>
          {/* <p className="text-base md:text-lg mb-6 md:mb-8">
            Navigate your career path with unwavering confidence and expert
            guidance. NextStep is here to support and empower you through every
            pivotal decision and opportunity, ensuring you're prepared for
            success.
          </p> */}
          <div className="">
            <TypeAnimation
              className="text-base md:text-lg mb-6 md:mb-8"
              sequence={[
                `Navigate your career path with unwavering confidence and expert
            guidance. NextStep is here to support and empower you through every
            pivotal decision and opportunity, ensuring you're prepared for
            success.`,
                1000,
              ]}
              wrapper="span"
              speed={60}
              style={{ fontSize: "1.2em", display: "inline-block" }}
              repeat={Infinity}
            />
          </div>
          {!isAuthenticated && (
            <button
              className="bg-white text-blue-900 px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold"
              onClick={handleGetStart}
            >
              Get Started
            </button>
          )}
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="md:w-2/4 w-full flex justify-center md:justify-end hidden md:flex"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <img
            src="/home.png"
            alt="Banner Image"
            className="w-full h-auto object-cover rounded-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
