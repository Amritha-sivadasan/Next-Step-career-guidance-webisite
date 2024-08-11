import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { VerifyOtp } from "../../../features/student/middleware/StudentRegisterThunk";
import { VerifyOtpExpert } from "../../../features/expert/middleware/ExpertRegisterThunk";

import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../services/api/studentApi";
import {
  forgotPasswordExpertOtp,
  upadateExpert,
} from "../../../services/api/ExpertApi";
import LoadingPage from "./LoadingPage";
import { useAppSelector } from "../../../hooks/useTypeSelector";

interface OtpPageProps {
  userType: "student" | "expert";
}

interface OtpFormInputs {
  otp: string;
}

const UpdateWithOtp: React.FC<OtpPageProps> = ({ userType }) => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(10);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const { expert } = useAppSelector((state) => state.expert);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormInputs>();

  const onSubmit: SubmitHandler<OtpFormInputs> = async (data) => {
    setLoading(true);
    if (userType == "student") {
      const storageData = sessionStorage.getItem("userEmail");
      if (storageData) {
        const parsedData = JSON.parse(storageData);
        const email: string = parsedData;
        const verifyOtpResult = await dispatch(
          VerifyOtp({ email, otp: data.otp })
        ).unwrap();

        if (verifyOtpResult.success) {
          setTimeout(() => {
            setLoading(false);
            navigate("/reset-password");
          }, 1000);
        }
      }
    } else if (userType == "expert") {
      const storageData = sessionStorage.getItem("expertEmail");
      if (storageData) {
        const parsedData = JSON.parse(storageData);
        const email: string = parsedData;
        const verifyOtpResult = await dispatch(
          VerifyOtpExpert({ email, otp: data.otp })
        ).unwrap();
        if (verifyOtpResult.success && expert && expert._id) {
          const response = await upadateExpert(expert._id, { email: email });
          if (response.success) {
            setTimeout(() => {
              setLoading(false);
              navigate("/expert/profile");
            });
          }
        }
      }
    }
  };

  const resendOtp = () => {
    if (userType == "student") {
      const storageData = sessionStorage.getItem("userEmail");
      console.log("storagedata", storageData);

      if (storageData) {
        const parsedData = JSON.parse(storageData);
        const email: string = parsedData;
        forgotPassword(email);
        setTimer(10);
        setCanResend(false);
      }
    } else if (userType === "expert") {
      const storageData = sessionStorage.getItem("expertEmail");
      if (storageData) {
        const parsedData = JSON.parse(storageData);
        const email: string = parsedData;
        forgotPasswordExpertOtp(email);
        setTimer(10);
        setCanResend(false);
      }
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

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
            <div className="flex  justify-center">
              <input
                type="text"
                maxLength={4}
                className="border border-gray-300 p-2 text-sm rounded-lg w-8/12 "
                {...register("otp", {
                  required: "OTP is required",
                  pattern: {
                    value: /^[0-9]{4}$/,
                    message: "OTP must be 4 digits",
                  },
                })}
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                placeholder="  Enter OTP"
              />
            </div>
            {errors.otp && (
              <p className="text-red-500 flex justify-center text-sm">
                {errors.otp.message}
              </p>
            )}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#0B2149] text-white w-7/12  p-2 rounded-lg font-bold text-lg shadow-md hover:bg-[#0a1b2c] hover:shadow-lg transition-transform transform hover:scale-105 duration-300"
              >
                Verify OTP
              </button>
            </div>
            <div className="text-center mt-4">
              {canResend ? (
                <button
                  type="button"
                  onClick={resendOtp}
                  className="text-[#0B2149] font-medium hover:underline"
                >
                  Resend OTP
                </button>
              ) : (
                <p className="text-sm text-rose-800">
                  Resend OTP in {timer} seconds
                </p>
              )}
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

export default UpdateWithOtp;
