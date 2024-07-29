import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { forgotPassword } from "../../services/api/studentApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { forgotPasswordExpert } from "../../services/api/ExpertApi";
import LoadingPage from "./LoadingPage";

interface ForgotPasswordProps {
  userType: "student" | "expert";
}

interface FormData {
  email: string;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ userType }) => {
  const [loading, setLoading] = useState(false);
  const isExpert = userType === "expert";
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    if (userType == "student") {
      const response = await forgotPassword(data.email);
      if (response?.success) {
        toast.success("Otp send successfully");
        sessionStorage.setItem("userEmail", JSON.stringify(response.data));
        setTimeout(() => {
          setLoading(false);
          navigate("/fortgot-password-otp");
        }, 1000);
      } else {
        toast.error(response.message);
      }
    } else if (userType === "expert") {
      const response = await forgotPasswordExpert(data.email);
      if (response?.success) {
        toast.success("Otp send successfully");
        sessionStorage.setItem("expertEmail", JSON.stringify(response.data));
        setTimeout(() => {
          setLoading(false);
          navigate("/expert/fortgot-password-otp");
        });
      } else {
        toast.error(response.message);
      }
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

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
            Forgot Password
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Please enter your email address to reset password
          </p>
          <form
            className="flex flex-col space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Email Input */}
            <div className="flex flex-col space-y-2">
              <label className="text-lg text-[#0B2149] font-medium">
                Email Address
              </label>
              <input
                type="email"
                className={`border p-2 text-sm rounded-lg bg-[#F0F8FF] ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your email address"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
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
          src={isExpert ? "/experts.png" : "/home-image.png"} // Conditional image source
          alt={isExpert ? "Expert Image" : "Home Image"}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
