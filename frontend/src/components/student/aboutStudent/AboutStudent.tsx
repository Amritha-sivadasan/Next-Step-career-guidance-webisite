import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../../features/student/middleware/StudentRegisterThunk";
import { setUser } from "../../../features/student/authSlice";
import { IStudent } from "../../../@types/user";
import LoadingPage from "../../common/Loading/LoadingPage";

interface FormInputs {
  education_level: string;
  education_background: string;
  user_type: string;
}

const AboutUser: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      education_level: "",
      education_background: "",
      user_type: "",
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (updateData) => {
    setLoading(true);
    const userId = localStorage.getItem("userId");
    if (userId) {
      try {
        const response = await dispatch(updateUser({ userId, updateData }));
        if (response.payload?.data) {
          const data = response.payload.data as IStudent;
          console.log("about data : ", data);
          dispatch(setUser(data));
          setTimeout(() => {
            setLoading(false);
            navigate("/");
          }, 1000);
        }
      } catch (error) {
        console.error("Failed to update user:", error);
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
            Tell us more about yourself
          </h1>

          <form
            className="flex flex-col space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col space-y-2">
              <label className="text-sm text-[#0B2149] font-semibold">
                I'm
              </label>
              <select
                className="border text-sm text-gray-600 border-gray-300 p-2 rounded-lg bg-[#F0F8FF]"
                {...register("user_type", {
                  required: "User type is required",
                })}
              >
                <option value="">Select...</option>
                <option value="Student">Student</option>
                <option value="Working">Working</option>
                <option value="Other">Other</option>
              </select>
              {errors.user_type && (
                <p className="text-red-500 text-sm">
                  {errors.user_type.message}
                </p>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm text-[#0B2149] font-semibold">
                Highest Level of Education
              </label>
              <select
                className="border text-sm text-gray-600 border-gray-300 p-2 rounded-lg bg-[#F0F8FF]"
                {...register("education_level", {
                  required: "Education level is required",
                })}
              >
                <option value="">Select...</option>
                <option value="High School">High School</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
              {errors.education_level && (
                <p className="text-red-500 text-sm">
                  {errors.education_level.message}
                </p>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm text-[#0B2149] font-semibold">
                Preferred Subject
              </label>
              <input
                type="text"
                className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
                placeholder="Enter your preferred subject"
                {...register("education_background", {
                  required: "Preferred subject is required",
                  validate: (value) =>
                    !/\s/.test(value) || "Preferred subject is required",
                })}
              />
              {errors.education_background && (
                <p className="text-red-500 text-sm">
                  {errors.education_background.message}
                </p>
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
          src="/home-image.png"
          alt="Description of Image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default AboutUser;
