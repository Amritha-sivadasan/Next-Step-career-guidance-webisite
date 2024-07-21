import React from "react";

interface SignupPageProps {
  userType: "student" | "expert";
}

const Signup: React.FC<SignupPageProps> = ({ userType }) => {
  const isExpert = userType === "expert";
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
        <div className="w-8/12 max-w-md md:max-w-lg lg:max-w-xl">
          <h1 className="text-3xl text-[#0B2149] font-bold mb-6 text-center">
            Sign up
          </h1>
          <form className="flex flex-col space-y-4">
            <input
              type="text"
              className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
              placeholder="Username"
            />
            <input
              type="email"
              className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
              placeholder="Enter email"
            />
            <input
              type="text"
              className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
              placeholder="Phone number"
            />
            <input
              type="password"
              className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
              placeholder="Password"
            />
            <input
              type="password"
              className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
              placeholder="Confirm password"
            />
            <button
              type="submit"
              className="bg-[#0B2149] text-white p-3 rounded-lg font-bold text-lg shadow-md hover:bg-[#0a1b2c] hover:shadow-lg transition-transform transform hover:scale-105 duration-300"
            >
              Sign Up
            </button>

            {/* Already have an account text */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="text-[#0B2149] font-medium hover:underline"
                >
                  LogIn
                </a>
              </p>
            </div>
          </form>

          <div className="mt-6 text-center">
            <h2 className="text-lg mb-2">Or sign up with</h2>
            <button
              type="button"
              className="flex items-center justify-center w-full max-w-xs mx-auto p-2 bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
            >
              <img
                src="/google-logo.svg"
                alt="Google Logo"
                className="h-6 mr-2"
              />
              <span className="text-[#0B2149] font-medium">Google</span>
            </button>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="hidden md:flex-1 md:flex items-center justify-center p-4">
        <img
          src={isExpert ? "/experts.png" : "/home-image.png"}
          alt="Description of Image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Signup;
