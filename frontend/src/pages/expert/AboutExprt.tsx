import React from "react";

const AboutExpert: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="p-4 flex items-center bg-white">
        <img src="/image.png" alt="Website Logo" className="h-6" />
        <h1 className="text-[#0B2149] ms-2 text-xl font-bold">NextStep</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl border p-3 rounded-lg shadow-md">
          <h1 className="text-3xl text-[#0B2149] font-bold mb-6 text-center">
            Tell us more about yourself
          </h1>

          {/* Profile Picture Section */}
          <div className="mb-6 flex flex-col items-center space-y-4">
            {/* Profile Picture */}
            <div className="relative w-32 h-32 rounded-full border border-gray-300 overflow-hidden bg-white flex items-center justify-center">
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                name="profilePicture"
                accept="image/*"
              />
              <span className="text-[#0B2149] text-sm font-semibold">
                Upload Profile Picture
              </span>
            </div>
            <button
              type="button"
              className="bg-[#0B2149] text-white p-2 rounded-full font-semibold text-sm"
            >
              Add Profile
            </button>
          </div>

          {/* Form */}
          <form className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6  p-8 ">
            {/* Education Background */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-[#0B2149] font-semibold">
                Education Background
              </label>
              <input
                type="text"
                className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
                placeholder="Enter your education background"
                name="educationBackground"
              />
            </div>

            {/* Area of Expertise */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-[#0B2149] font-semibold">
                Area of Expertise
              </label>
              <input
                type="text"
                className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
                placeholder="Enter your area of expertise"
                name="areaOfExpertise"
              />
            </div>

            {/* Personal Bio */}
            <div className="flex flex-col space-y-2 md:col-span-2">
              <label className="text-sm text-[#0B2149] font-semibold">
                Personal Bio
              </label>
              <textarea
                className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
                placeholder="Enter a brief personal bio"
                name="personalBio"
                rows={4}
              />
            </div>

            {/* Consultation Fee */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-[#0B2149] font-semibold">
                Consultation Fee
              </label>
              <input
                type="number"
                className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
                placeholder="Enter your consultation fee"
                name="consultationFee"
              />
            </div>

            {/* Credentials */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-[#0B2149] font-semibold">
                Credentials
              </label>
              <input
                type="text"
                className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
                placeholder="Enter your credentials"
                name="credentials"
              />
            </div>

            {/* Sub-Category */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-[#0B2149] font-semibold">
                Sub-Category
              </label>
              <select
                className="border text-sm text-gray-600 border-gray-300 p-2 rounded-lg bg-[#F0F8FF]"
                name="subCategoryId"
              >
                <option value="">Select...</option>
                <option value="1">Category 1</option>
                <option value="2">Category 2</option>
                <option value="3">Category 3</option>
                {/* Add more options as needed */}
              </select>
            </div>
          </form>
          <div className="flex justify-center items-center">
            {" "}
            <button
              type="submit"
              className="bg-[#0B2149] text-white p-2 rounded-md font-semibold text-base mt-6 w-24"
            >
              Submit
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutExpert;
