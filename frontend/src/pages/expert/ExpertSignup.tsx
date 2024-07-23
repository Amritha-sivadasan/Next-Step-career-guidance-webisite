import React, { useState, ChangeEvent, FormEvent } from "react";
import { setBasicDetails } from "../../features/student/studentSlice";
import { registerStudent } from "../../features/student/middleware/StudentRegisterThunk";
import { IStudent } from "../../@types/user";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";


const Signup: React.FC= () => {
  
  const dispatch: AppDispatch = useDispatch();
  const { basicDetails, additionalInfo, status,} = useSelector(
    (state: RootState) => state.student
  );
  const [userName, setUserName] = useState(basicDetails.user_name);
  const [email, setEmail] = useState(basicDetails.email);
  const [phoneNumber, setPhoneNumber] = useState(basicDetails.phonenumber);
  const [password, setPassword] = useState(basicDetails.password);
  const [confirmPassword, setConfirmPassword] = useState(
    basicDetails.confirmPassword
  );
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "userName":
        setUserName(value);
        dispatch(setBasicDetails({ ...basicDetails, user_name: value }));
        break;
      case "email":
        setEmail(value);
        dispatch(setBasicDetails({ ...basicDetails, email: value }));
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        dispatch(setBasicDetails({ ...basicDetails, phonenumber: value }));
        break;
      case "password":
        setPassword(value);
        dispatch(setBasicDetails({ ...basicDetails, password: value }));
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        dispatch(setBasicDetails({ ...basicDetails, confirmPassword: value }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData: IStudent = {
      user_name: userName,
      email,
      phonenumber: phoneNumber,
      password,
      education_level: additionalInfo.education_level,
      education_background: additionalInfo.education_background,
      user_type:additionalInfo.user_type,
    };

    dispatch(registerStudent(userData));
  };
  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <div className="flex-1 flex items-center justify-center p-4 bg-white relative">
        <div className="absolute top-6 left-8 flex items-center">
          <img src="/image.png" alt="Website Logo" className="h-6" />
          <h1 className="text-[#0B2149] ms-2 text-xl font-bold">NextStep</h1>
        </div>

        <div className="w-8/12 max-w-md md:max-w-lg lg:max-w-xl">
          <h1 className="text-3xl text-[#0B2149] font-bold mb-6 text-center">
            Sign up
          </h1>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="userName"
              value={userName}
              onChange={handleChange}
              className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
              placeholder="Username"
            />
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
              placeholder="Enter email"
            />
            <input
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handleChange}
              className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
              placeholder="Phone number"
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
              placeholder="Password"
            />
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
              placeholder="Confirm password"
            />
            <button
              type="submit"
              className="bg-[#0B2149] text-white p-3 rounded-lg font-bold text-lg shadow-md hover:bg-[#0a1b2c] hover:shadow-lg transition-transform transform hover:scale-105 duration-300"
            >
              {status === "loading" ? "Signing Up..." : "Sign Up"}
            </button>

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

      <div className="hidden md:flex-1 md:flex items-center justify-center p-4">
        <img
          src="/home-image.png"
          alt="Description of Image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Signup;
