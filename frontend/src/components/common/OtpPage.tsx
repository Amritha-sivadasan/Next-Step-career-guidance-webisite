import React from "react";

interface OtpPageProps {
  userType: "student" | "expert";
}

const OtpPage: React.FC<OtpPageProps> = ({ userType }) => {
  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center p-4 bg-white relative">
        {/* Logo */}
        <div className="absolute top-6 left-8 flex items-center">
          <img src="/image.png" alt="Website Logo" className="h-6" />
          <h1 className="text-[#0B2149] ms-2 text-xl font-bold">NextStep</h1>
        </div>

        {/* Form Container */}
        <div className="w-8/12 max-w-md md:max-w-lg lg:max-w-xl border p-4 rounded-lg">
          <h1 className="text-3xl text-[#0B2149] font-bold mb-6 text-center">
            Verify OTP
          </h1>
          <p className="text-center text-gray-600 mb-6">
            We sent an OTP to your email or phone number. Please enter it below.
          </p>
          <form className="flex flex-col space-y-4">
            <div className="flex ms-6 space-x-8">
              {/* OTP Input Fields */}
              {[...Array(4)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 border border-gray-300 text-center text-lg rounded-lg bg-[#F0F8FF]"
                  placeholder="0"
                />
              ))}
            </div>
            <button
              type="submit"
              className="bg-[#0B2149] text-white w-9/12 ms-9 p-2 rounded-lg font-bold text-lg shadow-md hover:bg-[#0a1b2c] hover:shadow-lg transition-transform transform hover:scale-105 duration-300"
            >
              Verify OTP
            </button>

            {/* Resend OTP text */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Didn't receive the code?{" "}
                <a href="#" className="text-[#0B2149] font-medium hover:underline">
                  Resend OTP
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Image Section */}
      <div className="hidden md:flex-1 md:flex items-center justify-center p-4">
        <img
          src={userType === "student" ? "/home-image.png" : "/experts.png"}
          alt="Description of Image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default OtpPage;
