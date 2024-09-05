import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { resetPasssword } from "../../../services/api/studentApi";
import { useNavigate } from "react-router-dom";
import { resetPassswordExpert } from "../../../services/api/ExpertApi";
import { toast } from "react-toastify";
import LoadingPage from "../Loading/LoadingPage";

interface ResetPasswordProps {
  userType: "student" | "expert";
}

interface FormData {
  newPassword: string;
  confirmPassword: string;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ userType }) => {
  const isExpert = userType === "expert";
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    if (userType == "student") {
      const storageData = sessionStorage.getItem("userEmail");
      if (storageData) {
        const parsedData = JSON.parse(storageData);
        const email: string = parsedData;
        const response = await resetPasssword(email, data.newPassword);
        if (response&& response.success) {
          toast.success("Reset password successfully");
          setTimeout(() => {
            setLoading(false);
            navigate("/login");
          });
        } else {
          toast.error("Something went wrong please try again");
        }
      }
    } else if (userType == "expert") {
      const storageData = sessionStorage.getItem("expertEmail");
      if (storageData) {
        const parsedData = JSON.parse(storageData);
        const email: string = parsedData;
        const response = await resetPassswordExpert(email, data.newPassword);
        if (response.data.success) {
          setTimeout(() => {
            setLoading(false);
            navigate("/login");
            toast.success("Reset password successfully");
            navigate("/expert/login");
          });
        } else {
          toast.error("Something went wrong please try again");
        }
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
            Reset Your Password
          </h1>

          <form
            className="flex flex-col space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* New Password Input */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-[#0B2149] font-medium">
                New Password
              </label>
              <input
                type="password"
                className={`border p-2 text-sm rounded-lg bg-[#F0F8FF] ${
                  errors.newPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter new password"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
              {errors.newPassword && (
                <span className="text-red-500 text-sm">
                  {errors.newPassword.message}
                </span>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-[#0B2149] font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                className={`border p-2 text-sm rounded-lg bg-[#F0F8FF] ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Confirm your new password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("newPassword") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="bg-[#0B2149] text-white p-3 rounded-lg font-bold text-lg shadow-md hover:bg-[#0a1b2c] hover:shadow-lg transition-transform transform hover:scale-105 duration-300 mt-6"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>

      {/* Image Section */}
      <div className="hidden md:flex-1 md:flex items-center justify-center p-4">
        <img
          src={isExpert ? "/experts.png" : "/home-image.png"}
          alt={isExpert ? "Expert Image" : "Home Image"}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ResetPassword;
