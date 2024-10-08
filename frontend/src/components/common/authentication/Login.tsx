import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import {
  LoginResponse,
  loginUser,
} from "../../../features/student/middleware/StudentLoginThunk";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { setUser, setAuthenticated } from "../../../features/student/authSlice";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../../config/firebase";
import { IStudent } from "../../../@types/user";
import { registerStudentWithGoogle } from "../../../features/student/middleware/StudentRegisterThunk";
import {
  Expertlogin,
  LoginResponseExpert,
} from "../../../features/expert/middleware/ExpertLoginThunk";
import {
  setExpert,
  setExpertAuthenticated,
} from "../../../features/expert/expertAuthSlice";
import { IExpert } from "../../../@types/expert";
import { registerExpertWithGoogle } from "../../../features/expert/middleware/ExpertRegisterThunk";
import LoadingPage from "../Loading/LoadingPage";
import { motion } from "framer-motion";

interface LoginPageProps {
  userType: "student" | "expert";
}
interface LoginFormInput {
  email: string;
  password: string;
}

//component start--------------------------------------//
const Login: React.FC<LoginPageProps> = ({ userType }) => {
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  const isExpert = userType === "expert";
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>();

  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    setDataLoading(true);
    if (userType === "student") {
      const result = await dispatch(loginUser(data));
      const loginResponse = result.payload as LoginResponse;
      if (loginResponse.success && loginResponse.data) {
        setDataLoading(false);
        setLoading(true);
        const userData = loginResponse.data;
        dispatch(setUser(userData));
        dispatch(setAuthenticated(true));
        localStorage.setItem("userAccess", loginResponse.accessToken);
        localStorage.setItem("userId", loginResponse.data._id);
        localStorage.setItem("userAuth", "true");
        if (loginResponse.data.is_data_entered == true) {
          setTimeout(() => {
            setLoading(false);
            navigate("/");
          }, 1000);
        } else {
          setTimeout(() => {
            setLoading(false);
            navigate("/about-student");
          }, 1000);
        }
      } else {
        setDataLoading(false);
        console.log("Login failed or user data is missing");
      }
    } else if (userType === "expert") {
      const result = await dispatch(Expertlogin(data));
      console.log("result", result.payload);
      const loginResponse = result.payload as LoginResponseExpert;
      if (loginResponse.success && loginResponse.data) {
        setDataLoading(false);
        const expert = loginResponse.data;
        dispatch(setExpert(expert));
        dispatch(setExpertAuthenticated(true));
        localStorage.setItem("expertAccess", loginResponse.accessToken);
        localStorage.setItem("expertId", loginResponse.data._id);
        localStorage.setItem("expertAuth", "true");
        setTimeout(() => {
          setLoading(false);
          navigate("/expert");
        }, 1000);
      } else {
        setLoading(false);
        setDataLoading(false);
        console.log("Login failed or expert data is missing ");
      }
    }
  };

  //--------------------Googole authentication----------------//

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
        if (userType === "student") {
          const registerStudentResult = await dispatch(
            registerStudentWithGoogle(token.toString())
          ).unwrap();

          if (registerStudentResult.success) {
            const userData = registerStudentResult.data as IStudent;
            dispatch(setUser(userData));
            localStorage.setItem("userId", userData._id);
            localStorage.setItem(
              "userAccess",

              registerStudentResult.accessToken
            );
            localStorage.setItem("userAuth", "true");
            if (registerStudentResult.data?.is_data_entered) {
              setTimeout(() => {
                setLoading(false);
                navigate("/");
              }, 1000);
            } else {
              setTimeout(() => {
                setLoading(false);
                navigate("/about-student");
              }, 1000);
            }
          }
        } else if (userType === "expert") {
          const registerExpertResult = await dispatch(
            registerExpertWithGoogle(token.toString())
          ).unwrap();
          if (registerExpertResult.success) {
            const expertData = registerExpertResult.data as IExpert;
            dispatch(setExpert(expertData));
            localStorage.setItem("expertId", expertData._id);
            localStorage.setItem(
              "expertAccess",
              registerExpertResult.accessToken
            );
            localStorage.setItem("expertAuth", "true");
            if (registerExpertResult.data?.is_data_entered) {
              setTimeout(() => {
                setLoading(false);
                navigate("/expert");
              }, 1000);
            } else {
              setTimeout(() => {
                setLoading(false);
                navigate("/expert/about-expert");
              }, 1000);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  ///jsx----------------------------------///
  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <motion.div
        className="flex-1 flex items-center justify-center p-4 bg-white relative"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <Link
          to={userType == "student" ? "/" : "/expert"}
          className="absolute top-6 left-8 flex items-center"
        >
          <img src="/image.png" alt="Website Logo" className="h-6" />
          <h1 className="text-[#0B2149] ms-2 text-xl font-bold">NextStep</h1>
        </Link>

        <div className="w-8/12 max-w-md md:max-w-lg lg:max-w-xl">
          <h1 className="text-3xl text-[#0B2149] font-bold mb-6 text-center">
            Log In
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            <button
              type="submit"
              className="bg-[#0B2149] text-white p-3 rounded-lg font-bold text-lg shadow-md hover:bg-[#0a1b2c] hover:shadow-lg transition-transform transform hover:scale-105 duration-300"
            >
              {dataLoading ? <ClipLoader color="white"/> : "Log In"}
            </button>
            <div className="flex justify-end ">
              {isExpert ? (
                <NavLink
                  to="/expert/forgot-password"
                  className="text-[#203253] font-medium hover:underline"
                >
                  Forgot your password ?
                </NavLink>
              ) : (
                <NavLink
                  to="/forgot-password"
                  className="text-[#203253] font-medium hover:underline"
                >
                  Forgot your password ?
                </NavLink>
              )}
            </div>
          </form>

          <div className="mt-6 text-center">
            <h2 className="text-lg mb-2">Or log in with</h2>
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

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              {isExpert ? (
                <NavLink
                  to="/expert/signup"
                  className="text-[#0B2149] font-medium hover:underline"
                >
                  Sign up
                </NavLink>
              ) : (
                <NavLink
                  to="/signup"
                  className="text-[#0B2149] font-medium hover:underline"
                >
                  Sign up
                </NavLink>
              )}
            </p>
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
          src={isExpert ? "/experts.png" : "/home-image.png"}
          alt="Description of Image"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
};

export default Login;
