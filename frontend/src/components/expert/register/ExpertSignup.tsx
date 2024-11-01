import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { sendOtpExpert } from "../../../services/api/ExpertApi";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../../config/firebase";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { registerExpertWithGoogle } from "../../../features/expert/middleware/ExpertRegisterThunk";
import { setExpert } from "../../../features/expert/expertAuthSlice";
import { IExpert } from "../../../@types/expert";
import LoadingPage from "../../common/Loading/LoadingPage";
import { validatePhoneNumber } from "../../../utils/validator/studentsingupvalidator";

interface SignupFormInputs {
  user_name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

const ExpertSignup: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupFormInputs>({
    defaultValues: {
      user_name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const Errornotify = (msg: string) => {
    toast.error(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    setLoading(true);
    if (data.password !== data.confirmPassword) {
      Errornotify("Password and confirm password do not match");
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...expertData } = data;
    const response = await sendOtpExpert(data.email);
    if (response.success) {
      sessionStorage.setItem("expertdata", JSON.stringify(expertData));
      setTimeout(() => {
        setLoading(false);
        navigate("/expert/otp-verify");
      }, 1000);
    } else {
      setLoading(false);
      Errornotify(response.message);
    }
  };

  const handleGoogleSignup = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      console.log("credential", credential);
      const token = await auth.currentUser?.getIdToken();

      if (token) {
        setLoading(true);
        const registerExpertResult = await dispatch(
          registerExpertWithGoogle(token.toString())
        ).unwrap();

        if (registerExpertResult.success) {
          const userData = registerExpertResult.data as IExpert;
          dispatch(setExpert(userData));

          localStorage.setItem("expertId", userData._id);
          localStorage.setItem(
            "expertAccess",
            registerExpertResult.accessToken
          );
          localStorage.setItem("expertAuth", "true");

          setTimeout(() => {
            setLoading(false);
            navigate("/expert/about-expert");
          }, 1000);
        }
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };
  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="h-screen">
      <header className="p-4 flex items-center bg-white text-[#0B2149]">
        <img src="/image.png" alt="Website Logo" className="h-6" />
        <h1 className="text-[#0B2149] ms-2 text-xl font-bold">NextStep</h1>
      </header>

      <div className="flex flex-col md:flex-row w-full max-h-screen">
        <motion.div
          className="flex-1 flex items-center justify-center p-4 bg-white relative"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <div className="w-8/12 max-w-md md:max-w-lg lg:max-w-xl">
            <h1 className="text-3xl text-[#0B2149] font-bold mb-6 text-center">
              Sign up
            </h1>
            <form
              className="flex flex-col space-y-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type="text"
                {...register("user_name", {
                  required: "Username is required",
                  validate: {
                    noSpaces: (value) => {
                      return (
                        value.trim().length > 0 || "Name cannot be just spaces"
                      );
                    },
                  },
                })}
                className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
                placeholder="Username"
              />
              {errors.user_name && (
                <p className="text-red-500 text-sm">
                  {errors.user_name.message}
                </p>
              )}
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
                placeholder="Enter email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
              <input
                type="text"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  validate: validatePhoneNumber,
                })}
                className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
                placeholder="Phone number"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">
                  {errors.phoneNumber.message}
                </p>
              )}
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  // validate: validatePassword,
                })}
                className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
                placeholder="Confirm password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
              <button
                type="submit"
                className="bg-[#0B2149] text-white p-3 rounded-lg font-bold text-lg shadow-md hover:bg-[#0a1b2c] hover:shadow-lg transition-transform transform hover:scale-105 duration-300"
              >
                {status === "loading" ? "Signing Up..." : "Sign Up"}
              </button>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <NavLink
                    to="/expert/login"
                    className="text-[#0B2149] font-medium hover:underline"
                  >
                    LogIn
                  </NavLink>
                </p>
              </div>
            </form>

            <div className="mt-6 text-center">
              <h2 className="text-lg mb-2">Or sign up with</h2>
              <button
                type="button"
                onClick={handleGoogleSignup}
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
        </motion.div>

        <motion.div
          className="hidden md:flex-1 md:flex items-center justify-center p-4"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <img
            src="/experts.png"
            alt="Description of Image"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ExpertSignup;
