import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  addSubCategory,
  fetchAllCategories,
} from "../../../services/api/categoryApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../../components/common/LoadingPage";
import { ICategory } from "../../../@types/dashboard";

interface IFormInput {
  subCatName: string;
  catName: string;
  subCatImage: FileList | string;
  description: string;
}

const AddSubCategory: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetchAllCategories(1, 10);
      if (response.success) {
        setCategories(response.data.items);
      } else {
        toast.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const formData = new FormData();
    formData.append("subCatName", data.subCatName);
    formData.append("description", data.description);
    formData.append("catName", data.catName);
    if (data.subCatImage.length > 0) {
      formData.append("subcatImage", data.subCatImage[0]);
    }

    setLoading(true);
    const response = await addSubCategory(formData);
    if (response.success) {
      setLoading(false);
      toast.success(response.message);
      navigate("/admin/subCategory");
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
              <h1 className="text-2xl font-bold mb-10">Add New SubCategory</h1>
              <form onSubmit={handleSubmit(onSubmit)} className="  ">
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    SubCategory Name
                  </label>
                  <input
                    type="text"
                    className={`w-full px-4 py-2 border rounded-lg  bg-[#E8EFFA] focus:outline-none focus:border-blue-950 ${
                      errors.subCatName ? "border-red-500" : ""
                    }`}
                    {...register("subCatName", {
                      required: "SubCategory Name is required",
                      validate: (value) =>
                        value.trim().length > 0 ||
                        "SubCategory Name is required",
                    })}
                  />
                  {errors.subCatName && (
                    <p className="text-red-500 mt-1">
                      {errors.subCatName.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Select Category
                  </label>
                  <select
                    className={`w-full px-4 py-2 border rounded-lg bg-[#E8EFFA] focus:outline-none focus:border-blue-950 ${
                      errors.catName ? "border-red-500" : ""
                    }`}
                    {...register("catName", {
                      required: "Category is required",
                    })}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category: ICategory) => (
                      <option key={category._id} value={category.catName}>
                        {category.catName}
                      </option>
                    ))}
                  </select>
                  {errors.catName && (
                    <p className="text-red-500 mt-1">
                      {errors.catName.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    SubCategory Description
                  </label>
                  <textarea
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none bg-[#E8EFFA] focus:border-blue-950 ${
                      errors.description ? "border-red-500" : ""
                    }`}
                    {...register("description", {
                      required: "Sub Category Description is required",
                      validate: (value) =>
                        value.trim().length > 0 ||
                        "Sub Category Description is required",
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
                    SubCategory Image
                  </label>
                  <input
                    type="file"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none bg-[#E8EFFA] focus:border-blue-500 ${
                      errors.subCatImage ? "border-red-500" : ""
                    }`}
                    {...register("subCatImage", {
                      required: "Category Image is required",
                    })}
                  />
                  {errors.subCatImage && (
                    <p className="text-red-500 mt-1">
                      {errors.subCatImage.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0B2149] text-white rounded-lg hover:bg-[#062038] focus:outline-none"
                >
                  Add SubCategory
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddSubCategory;
