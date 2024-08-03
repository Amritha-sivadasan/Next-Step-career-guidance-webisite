import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { addCategory } from "../../../services/api/categoryApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../../components/common/LoadingPage";

interface IFormInput {
  catName: string;
  catImage: FileList | string;
  description: string;
}

const AddnewCategory: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const formData = new FormData();
    formData.append("catName", data.catName);
    formData.append("description", data.description);
    if (data.catImage.length > 0) {
      formData.append("catImage", data.catImage[0]);
    }
    setLoading(true);
    const response = await addCategory(formData);
    console.log("response", response);
    if (response.success) {
      setLoading(false);
      toast.success(response.message);
      navigate("/admin/category");
    } else {
      toast.error(response.message);
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 w-full bg-white p-8 rounded-lg shadow-md">
      <div className="flex  flex-col justify-center">
        {loading ? (
          <LoadingPage />
        ) : (
          <>
            <div className="shadow-md flex flex-col justify-center  border p-5 rounded-lg  w-8/12  mx-auto">
              <h1 className="text-2xl font-bold mb-10">Add New Category</h1>
              <form onSubmit={handleSubmit(onSubmit)} className="  ">
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Category Name
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none   bg-[#E8EFFA] focus:border-blue-950 ${
                      errors.catName ? "border-red-500" : ""
                    }`}
                    {...register("catName", {
                      required: "Category Name is required",
                      validate: (value) =>
                        value.trim().length > 0 || "Category Name cannot be empty",
                    })}
                  />
                  {errors.catName && (
                    <p className="text-red-500 mt-1">
                      {errors.catName.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Category Description
                  </label>
                  <textarea
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none bg-[#E8EFFA] focus:border-blue-950 ${
                      errors.description ? "border-red-500" : ""
                    }`}
                    {...register("description", {
                      required: "Category Description is required",
                      validate: (value) =>
                        value.trim().length > 0 || "Category Description is empty",
                    })}
                  />
                  {errors.description && (
                    <p className="text-red-500 mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Category Image
                  </label>
                  <input
                    type="file"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none bg-[#E8EFFA] focus:border-blue-950 ${
                      errors.catImage ? "border-red-500" : ""
                    }`}
                    {...register("catImage", {
                      required: "Category Image is required",
                    })}
                  />
                  {errors.catImage && (
                    <p className="text-red-500 mt-1">
                      {errors.catImage.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0B2149] text-white rounded-lg hover:bg-[#062038] focus:outline-none"
                >
                  Add Category
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddnewCategory;
