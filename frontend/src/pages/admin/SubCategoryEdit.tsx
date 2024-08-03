import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ISubCategory, ICategory } from "../../@types/dashboard";
import {
  fetchSubCategoryById,
  fetchAllCategories,
  updateSubCategory,
} from "../../services/api/categoryApi";
import { toast } from "react-toastify";
import LoadingPage from "../../components/common/LoadingPage";
import Swal from "sweetalert2";
import { useForm, Controller } from "react-hook-form";

interface FormData {
  catName: string;
  subCatName: string;
  description: string;
  subCatImage: string;
  imageFile: File | null;
}

const EditSubCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [, setSubCategory] = useState<ISubCategory | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      catName: "",
      subCatName: "",
      description: "",
      subCatImage: "",
      imageFile: null,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchSubCategoryById(categoryId!);
        const categoriesResponse = await fetchAllCategories();

        setSubCategory(response.data);
        setCategories(categoriesResponse.data);

        setValue("catName", response.data.catName);
        setValue("subCatName", response.data.subCatName);
        setValue("description", response.data.description);
        setValue("subCatImage", response.data.subCatImage);
        setImagePreview(response.data.subCatImage);
      } catch (error) {
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("imageFile", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to update this subcategory?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      });

      if (result.isConfirmed) {
        const formDataToSend = new FormData();
        formDataToSend.append("catName", data.catName);
        formDataToSend.append("subCatName", data.subCatName);
        formDataToSend.append("description", data.description);
        if (data.imageFile) {
          formDataToSend.append("imageFile", data.imageFile);
        } else {
          formDataToSend.append("subCatImage", data.subCatImage);
        }

        const response = await updateSubCategory(categoryId!, formDataToSend);
        if (response.success) {
          Swal.fire("Updated!", "The subcategory has been updated.", "success");
          navigate("/admin/subCategory");
        } else {
          toast.error(response.message);
        }
      }
    } catch (error) {
      toast.error("Failed to update subcategory");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-w-screen w-full">
        {" "}
        <LoadingPage />
      </div>
    );
  }

  return (
    <div className="mt-4 w-full bg-white">
      <div className="m-5">
        <div className="flex flex-col justify-center  border p-5 rounded-lg  w-8/12  mx-auto">
          <h1 className="text-2xl font-bold">Edit SubCategory</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <div className="mb-4">
              <label
                htmlFor="subCatName"
                className="block text-sm font-medium text-gray-700"
              >
                SubCategory Name
              </label>
              <Controller
                name="subCatName"
                control={control}
                rules={{
                  required: "SubCategory name is required",
                  validate: (value) =>
                    value.trim() !== "" || "SubCategory name be just spaces",
                }}
                render={({ field }) => (
                  <input
                    type="text"
                    id="subCatName"
                    {...field}
                    className="mt-1 block w-full p-2  border rounded bg-[#E8EFFA]"
                  />
                )}
              />
              {errors.subCatName && (
                <p className="text-red-500 text-sm">
                  {errors.subCatName.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <Controller
                name="description"
                control={control}
                rules={{
                  required: "Description is required",
                  validate: (value) =>
                    value.trim() !== "" || "Description be just spaces",
                }}
                render={({ field }) => (
                  <textarea
                    id="description"
                    {...field}
                    className="mt-1 block w-full p-2 border bg-[#E8EFFA] rounded"
                  />
                )}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="catName"
                className="block text-sm font-medium  text-gray-700"
              >
                Category Name
              </label>
              <Controller
                name="catName"
                control={control}
                rules={{ required: "Category name is required" }}
                render={({ field }) => (
                  <select
                    id="catName"
                    {...field}
                    className="mt-1 block w-full p-2 border bg-[#E8EFFA] rounded"
                  >
                    {categories.map((category) => (
                      <option key={category._id} value={category.catName}>
                        {category.catName}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.catName && (
                <p className="text-red-500 text-sm">{errors.catName.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="imageFile"
                className="block text-sm font-medium text-gray-700"
              >
                SubCategory Image
              </label>
              {imagePreview && (
                <div className="mb-2">
                  <img
                    src={imagePreview as string}
                    alt="SubCategory Preview"
                    className="w-32 h-32 object-cover rounded"
                  />
                </div>
              )}
              <input
                type="file"
                id="imageFile"
                onChange={handleImageChange}
                className="mt-1 block w-36 p-2 border border-gray-300 rounded"
              />
              {errors.imageFile && (
                <p className="text-red-500 text-sm">
                  {errors.imageFile.message}
                </p>
              )}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-4 py-2 bg-[#062038] text-white rounded-lg hover:bg-blue-600 focus:outline-none"
              >
                Update SubCategory
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSubCategory;
