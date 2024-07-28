import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { UpdateExpert } from "../../features/expert/middleware/ExpertRegisterThunk";
import { IExpert } from "../../@types/expert";
import { setExpert } from "../../features/expert/expertAuthSlice";
import { useNavigate } from "react-router-dom";

type FormValues = {
  personal_bio: string;
  area_of_expertise: string;
  consultation_fee: number;
  educationBackground: string;
  category: string;
  credential: FileList;
  profilePicture: FileList;
};

const AboutExpert: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = new FormData();
    formData.append("personal_bio", data.personal_bio);
    formData.append("area_of_expertise", data.area_of_expertise);
    formData.append("consultation_fee", data.consultation_fee.toString());
    formData.append("educationBackground", data.educationBackground);
    formData.append("category", data.category);
    formData.append("credential", data.credential[0]);
    formData.append("profilePicture", data.profilePicture[0]);

    const expertId = localStorage.getItem("expertId");
    if (expertId) {
      const response = await dispatch(
        UpdateExpert({ expertId, updateData: formData })
      );
      if (response.payload?.data) {
        const data = response.payload.data as IExpert;
        dispatch(setExpert(data));
        navigate("/expert");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-white">
      {/* Header */}
      <header className="p-4 flex items-center bg-white text-[#0B2149]">
        <img src="/image.png" alt="Website Logo" className="h-6" />
        <h1 className="text-[#0B2149] ms-2 text-xl font-bold">NextStep</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl bg-white text-[#0B2149] p-8 rounded-lg border">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Tell us more about yourself
          </h1>

          {/* Form */}
          <form
            className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Professional Bio */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold">Professional Bio</label>
              <textarea
                className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
                placeholder="Summarize career achievements and expertise"
                {...register("personal_bio", {
                  required: "Professional Bio is required.",
                })}
              />
              {errors.personal_bio && (
                <p className="text-red-500 text-sm">
                  {errors.personal_bio.message}
                </p>
              )}
            </div>

            {/* Areas of Expertise */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold">
                Areas of Expertise
              </label>
              <input
                type="text"
                className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF] flex-1"
                placeholder="List your specialized skills and industries"
                {...register("area_of_expertise", {
                  required: "Areas of Expertise are required.",
                })}
              />
              {errors.area_of_expertise && (
                <p className="text-red-500 text-sm">
                  {errors.area_of_expertise.message}
                </p>
              )}
            </div>

            {/* Fee Structure */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold">Fee Structure</label>
              <input
                type="text"
                className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
                placeholder="Min amount"
                {...register("consultation_fee", {
                  required: "Fee Structure is required.",
                })}
              />
              {errors.consultation_fee && (
                <p className="text-red-500 text-sm">
                  {errors.consultation_fee.message}
                </p>
              )}
            </div>

            {/* Educational Background */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold">
                Educational Background
              </label>
              <input
                type="text"
                className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
                placeholder="Provide details of your academic qualifications"
                {...register("educationBackground", {
                  required: "Educational Background is required.",
                })}
              />
              {errors.educationBackground && (
                <p className="text-red-500 text-sm">
                  {errors.educationBackground.message}
                </p>
              )}
            </div>

            {/* Choose Your Category */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold">
                Choose your category
              </label>
              <select
                className="border text-sm text-gray-600 border-gray-300 p-2 rounded-lg bg-[#F0F8FF]"
                {...register("category", {
                  required: "Category selection is required.",
                })}
              >
                <option value="">Select one</option>
                <option value="1">Category 1</option>
                <option value="2">Category 2</option>
                <option value="3">Category 3</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Credentials and Experience */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold">
                Credentials and Experience
              </label>
              <input
                type="file"
                className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
                {...register("credential", {
                  required: "Credentials are required.",
                })}
              />
              {errors.credential && (
                <p className="text-red-500 text-sm">
                  {errors.credential.message}
                </p>
              )}
            </div>

            {/* Profile Picture */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-semibold">Profile Picture</label>
              <input
                type="file"
                className="border border-gray-300 p-2 text-sm rounded-lg bg-[#F0F8FF]"
                {...register("profilePicture", {
                  required: "Profile Picture is required.",
                })}
                accept="image/*"
              />
              {errors.profilePicture && (
                <p className="text-red-500 text-sm">
                  {errors.profilePicture.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="bg-[#0B2149] text-white p-3 rounded-lg font-bold text-lg mt-6 md:col-span-2 w-full"
            >
              Take me to Dashboard
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AboutExpert;
