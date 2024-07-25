import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { VerifyOtp } from "../../features/student/middleware/StudentRegisterThunk";
import {
  verifyOtp,
  setUser,
  setAuthenticated,
} from "../../features/student/studentSlice";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../../services/api/studentApi";
import { registerStudent } from "../../features/student/middleware/StudentRegisterThunk";
import { UserData } from "../../features/student/studentSlice";

interface OtpPageProps {
  userType: "student" | "expert";
}

interface OtpFormInputs {
  otp: string;
}

const OtpPage: React.FC<OtpPageProps> = ({ userType }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormInputs>();
  const [otp, setOtp] = useState("");

  const onSubmit: SubmitHandler<OtpFormInputs> = async (data) => {
    if (userType == "student") {
      const storageData = sessionStorage.getItem("userdata");
      if (storageData) {
        const parsedData = JSON.parse(storageData);
        const email: string = parsedData.email;
        const verifyOtpResult = await dispatch(
          VerifyOtp({ email, otp: data.otp })
        ).unwrap();

        if (verifyOtpResult.success) {
          dispatch(verifyOtp());
          const registerStudentResult = await dispatch(
            registerStudent(parsedData)
          ).unwrap();
          if (registerStudentResult.success) {
            const userData = registerStudentResult.data as UserData;
            if (userData && userData._id) {
              dispatch(setUser(userData));
              dispatch(setAuthenticated(true));
              sessionStorage.removeItem("userdata");
              localStorage.setItem("userId", userData._id);
              localStorage.setItem('userAccess',registerStudentResult.accessToken)
              navigate("/about-student");
            } else {
              console.error("User data is missing or malformed.");
            }
          }
        }
      }
    }
  };

  const resendOtp = () => {
    const storageData = sessionStorage.getItem("userdata");
    if (storageData) {
      const parsedData = JSON.parse(storageData);
      const email: string = parsedData.email;
      sendOtp(email);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <div className="flex-1 flex items-center justify-center p-4 bg-white relative">
        <div className="absolute top-6 left-8 flex items-center">
          <img src="/image.png" alt="Website Logo" className="h-6" />
          <h1 className="text-[#0B2149] ms-2 text-xl font-bold">NextStep</h1>
        </div>

        <div className="w-8/12 max-w-md md:max-w-lg lg:max-w-xl border p-4 rounded-lg">
          <h1 className="text-3xl text-[#0B2149] font-bold mb-6 text-center">
            Verify OTP
          </h1>
          <p className="text-center text-gray-600 mb-6">
            We sent an OTP to your email or phone number. Please enter it below.
          </p>
          <form
            className="flex flex-col space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex ms-6 space-x-8">
              <input
                type="text"
                maxLength={4}
                {...register("otp", {
                  required: "OTP is required",
                  pattern: {
                    value: /^[0-9]{4}$/,
                    message: "OTP must be 4 digits",
                  },
                })}
                className="border h-12 ms-5 rounded-lg w-9/12"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            {errors.otp && (
              <p className="text-red-500 ms-7 text-sm">{errors.otp.message}</p>
            )}

            <button
              type="submit"
              className="bg-[#0B2149] text-white w-9/12 ms-9 p-2 rounded-lg font-bold text-lg shadow-md hover:bg-[#0a1b2c] hover:shadow-lg transition-transform transform hover:scale-105 duration-300"
            >
              Verify OTP
            </button>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Didn't receive the code?{" "}
                <button
                  type="button"
                  onClick={resendOtp}
                  className="text-[#0B2149] font-medium hover:underline"
                >
                  Resend OTP
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>

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
