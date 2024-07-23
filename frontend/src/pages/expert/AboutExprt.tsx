import React from "react";

const AboutExpert: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen  text-white">
      {/* Header */}
      <header className="p-4 flex items-center bg-white text-[#0B2149]">
        <img src="/image.png" alt="Website Logo" className="h-6" />
        <h1 className="text-[#0B2149] ms-2 text-xl font-bold">NextStep</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl bg-white text-[#0B2149] p-8 rounded-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Tell us more about yourself
          </h1>

          {/* Form */}
          <form className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {/* Professional Bio */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold">Professional Bio</label>
              <input
                type="text"
                className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
                placeholder="Summarize career achievements and expertise"
                name="professionalBio"
              />
            </div>
            {/* Professional Bio */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold">Professional Bio</label>
              <input
                type="text"
                className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
                placeholder="Summarize career achievements and expertise"
                name="professionalBio"
              />
            </div>

            {/* Areas of Expertise */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold">
                Areas of Expertise
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF] flex-1"
                  placeholder="List your specialized skills and industries"
                  name="areaOfExpertise"
                />
                <button
                  type="button"
                  className="bg-[#0B2149] text-white p-2 rounded-lg font-semibold text-sm"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Fee Structure */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold">Fee Structure</label>
              <input
                type="text"
                className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
                placeholder="Specify your consultation fees range"
                name="feeStructure"
              />
            </div>

            {/* Educational Background */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold">
                Educational Background
              </label>
              <input
                type="text"
                className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
                placeholder="Provide details of your academic qualifications"
                name="educationBackground"
              />
            </div>

            {/* Credential and Experience */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold">
                Credentials and Experience
              </label>
              <input
                type="text"
                className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
                placeholder="Upload your verified certificates"
                name="credentials"
              />
            </div>

            {/* Choose Your Category */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold">
                Choose your category
              </label>
              <select
                className="border text-sm text-gray-600 border-gray-300 p-2 rounded-lg bg-[#F0F8FF]"
                name="category"
              >
                <option value="">Select one</option>
                <option value="1">Category 1</option>
                <option value="2">Category 2</option>
                <option value="3">Category 3</option>
              </select>
            </div>

            {/* Profile Picture */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold">Profile Picture</label>
              <input
                type="file"
                className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
                name="profilePicture"
                accept="image/*"
              />
            </div>

            <button
              type="submit"
              className="bg-[#0B2149] text-white p-3 rounded-lg font-bold text-lg mt-6 md:col-span-2 w-full"
            >
              Take me to Dashboard
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AboutExpert;
