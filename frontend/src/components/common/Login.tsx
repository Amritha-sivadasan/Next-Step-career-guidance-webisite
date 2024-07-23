import React from "react";

interface LoginPageProps {
  userType: "student" | "expert";
}

const Login: React.FC<LoginPageProps> = ({ userType }) => {
  const isExpert = userType === "expert";

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
   
      <div className="flex-1 flex items-center justify-center p-4 bg-white relative">
      
        <div className="absolute top-6 left-8 flex items-center">
          <img src="/image.png" alt="Website Logo" className="h-6" />
          <h1 className="text-[#0B2149] ms-2 text-xl font-bold">NextStep</h1>
        </div>

       
        <div className="w-8/12 max-w-md md:max-w-lg lg:max-w-xl">
          <h1 className="text-3xl text-[#0B2149] font-bold mb-6 text-center">
            Log In
          </h1>
          <form className="flex flex-col space-y-4">
            <input
              type="email"
              className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
              placeholder="Enter email"
            />
            <input
              type="password"
              className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
              placeholder="Password"
            />
            <button
              type="submit"
              className="bg-[#0B2149] text-white p-3 rounded-lg font-bold text-lg shadow-md hover:bg-[#0a1b2c] hover:shadow-lg transition-transform transform hover:scale-105 duration-300"
            >
              Log In
            </button>

           
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="text-[#0B2149] font-medium hover:underline"
                >
                  Sign up
                </a>
              </p>
            </div>
          </form>

          <div className="mt-6 text-center">
            <h2 className="text-lg mb-2">Or log in with</h2>
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

export default Login;
