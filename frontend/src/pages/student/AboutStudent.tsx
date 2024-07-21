import React from "react";

const AboutUser: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center p-4 bg-white relative ">
        {/* Logo */}
        <div className="absolute top-6 left-8 flex items-center">
          <img src="/image.png" alt="Website Logo" className="h-6" />
          <h1 className="text-[#0B2149] ms-2 text-xl font-bold">NextStep</h1>
        </div>

        {/* Form Container */}
        <div className="w-8/12 max-w-md md:max-w-lg lg:max-w-xl  ">
          <h1 className="text-3xl text-[#0B2149] font-bold mb-6 text-center">
            Tell us more about yourself
          </h1>

          <form className="flex flex-col space-y-4">
            {/* User Role Selection */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-[#0B2149] font-semibold">
                i'am
              </label>
              <select
                className="border text-sm text-gray-600 border-gray-300 p-2 rounded-lg bg-[#F0F8FF]"
                name="educationLevel"
              >
                <option value="">Select...</option>

                <option value="Student">Student</option>
                <option value="working">working</option>
                <option value="">other</option>
              </select>
            </div>

            {/* Highest Level of Education */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-[#0B2149] font-semibold">
                Highest Level of Education
              </label>
              <select
                className="border text-sm text-gray-600 border-gray-300 p-2 rounded-lg bg-[#F0F8FF]"
                name="educationLevel"
              >
                <option value="">Select...</option>
                <option value="highSchool">High School</option>
                <option value="undergraduate">Undergraduate</option>
                <option value="postgraduate">Postgraduate</option>
                <option value="doctorate">Doctorate</option>
              </select>
            </div>

            {/* Subject */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-[#0B2149] font-semibold">
                Preferred Subject
              </label>
              <input
                type="text"
                className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
                placeholder="Enter your preferred subject"
                name="subject"
              />
            </div>

            <button
              type="submit"
              className="bg-[#0B2149] text-white p-3 rounded-lg font-bold text-lg shadow-md hover:bg-[#0a1b2c] hover:shadow-lg transition-transform transform hover:scale-105 duration-300 mt-6"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Image Section */}
      <div className="hidden md:flex-1 md:flex items-center justify-center p-4">
        <img
          src="/home-image.png" // Replace with the path to your image
          alt="Description of Image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default AboutUser;
