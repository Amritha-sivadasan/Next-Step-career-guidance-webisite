import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { addSubCategory } from "../../services/api/adminApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../components/common/LoadingPage";

interface IFormInput {
  subCatName: string;
  catName:string;
  subcatImage: FileList | string;
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
    formData.append("SubCatName", data.catName);
    formData.append("description", data.description);
    formData.append("catname", data.description);
    if (data.subcatImage.length > 0) {
      formData.append("SubcatImage", data.subcatImage[0]);
    }
    setLoading(true);
    const response = await addSubCategory(formData);
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
            <h1 className="text-2xl font-bold mb-10">Add New Category</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" w-6/12 border p-6 rounded-lg "
            >
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
                    errors.catName ? "border-red-500" : ""
                  }`}
                  {...register("catName", {
                    required: "Category Name is required",
                  })}
                />
                {errors.catName && (
                  <p className="text-red-500 mt-1">{errors.catName.message}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Category Description
                </label>
                <textarea
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
                    errors.description ? "border-red-500" : ""
                  }`}
                  {...register("description", {
                    required: "Sub Category Description is required",
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
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500 ${
                    errors.subcatImage ? "border-red-500" : ""
                  }`}
                  {...register("subcatImage", {
                    required: "Category Image is required",
                  })}
                />
                {errors.subcatImage && (
                  <p className="text-red-500 mt-1">{errors.subcatImage.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#0B2149] text-white rounded-lg hover:bg-[#062038] focus:outline-none"
              >
                Add  SubCategory
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AddnewCategory;
