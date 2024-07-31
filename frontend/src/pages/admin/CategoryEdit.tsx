import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ICategory } from "../../@types/dashboard";
import { fetchCategoryById, updateCategory } from "../../services/api/adminApi";
import { toast } from "react-toastify";
import LoadingPage from "../../components/common/LoadingPage";
import Swal from "sweetalert2";
import { useForm, Controller } from "react-hook-form";

interface FormData {
  catName: string;
  description: string;
  catImage: string;
  imageFile: File | null;
}

const EditCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [, setCategory] = useState<ICategory | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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
      description: "",
      catImage: "",
      imageFile: null,
    },
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetchCategoryById(categoryId!);
        setCategory(response.data);
        setValue("catName", response.data.catName);
        setValue("description", response.data.description);
        setValue("catImage", response.data.catImage);
        setImagePreview(response.data.catImage);
      } catch (error) {
        toast.error("Failed to fetch category");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
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
        text: "Do you want to update this category?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      });

      if (result.isConfirmed) {
        const formDataToSend = new FormData();
        formDataToSend.append("catName", data.catName);
        formDataToSend.append("description", data.description);

        if (data.imageFile) {
          formDataToSend.append("imageFile", data.imageFile);
        } else {
          formDataToSend.append("catImage", data.catImage);
        }

        const response = await updateCategory(categoryId!, formDataToSend);
        if (response.success) {
          Swal.fire("Updated!", "The category has been updated.", "success");
          navigate("/admin/category");
        } else {
          toast.error(response.message);
        }
      }
    } catch (error) {
      toast.error("Failed to update category");
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="mt-4 w-full bg-white">
      <div className="m-5">
        <h1 className="text-2xl font-bold">Edit Category</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div className="mb-4">
            <label
              htmlFor="catName"
              className="block text-sm font-medium text-gray-700"
            >
              Category Name
            </label>
            <Controller
              name="catName"
              control={control}
              rules={{ required: "Category name is required" }}
              render={({ field }) => (
                <input
                  type="text"
                  id="catName"
                  {...field}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                />
              )}
            />
            {errors.catName && (
              <p className="text-red-500 text-sm">{errors.catName.message}</p>
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
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <textarea
                  id="description"
                  {...field}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
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
              htmlFor="imageFile"
              className="block text-sm font-medium text-gray-700"
            >
              Category Image
            </label>
            {imagePreview && (
              <div className="mb-2">
                <img
                  src={imagePreview as string}
                  alt="Category Preview"
                  className="w-32 h-32 object-cover rounded"
                />
              </div>
            )}
            <input
              type="file"
              id="imageFile"
              onChange={handleImageChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
            {errors.imageFile && (
              <p className="text-red-500 text-sm">{errors.imageFile.message}</p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Update Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
