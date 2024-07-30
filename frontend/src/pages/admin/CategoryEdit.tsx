import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ICategory } from "../../@types/dashboard";
import { fetchCategoryById, updateCategory } from "../../services/api/adminApi";
import { toast } from "react-toastify";
import LoadingPage from "../../components/common/LoadingPage";
import Swal from "sweetalert2";

const EditCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState<ICategory | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    catName: "",
    description: "",
    catImage: "",
    imageFile: null as File | null,
  });
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetchCategoryById(categoryId!);
        setCategory(response.data);
        setFormData({
          catName: response.data.catName,
          description: response.data.description,
          catImage: response.data.catImage,
          imageFile: null,
        });
        setImagePreview(response.data.catImage);
      } catch (error) {
        toast.error("Failed to fetch category");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        imageFile: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        formDataToSend.append("catName", formData.catName);
        formDataToSend.append("description", formData.description);

        // Append either imageFile or the existing catImage URL
        if (formData.imageFile) {
          formDataToSend.append("imageFile", formData.imageFile);
        } else {
          formDataToSend.append("catImage", formData.catImage);
        }

        const response = await updateCategory(categoryId!, formDataToSend);
        if (response.success) {
          Swal.fire("Updated!", "The category has been updated.", "success");
          navigate("/admin/category");
        } else {
            console.log(response);
            
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
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label
              htmlFor="catName"
              className="block text-sm font-medium text-gray-700"
            >
              Category Name
            </label>
            <input
              type="text"
              id="catName"
              name="catName"
              value={formData.catName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
              required
            />
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
              name="imageFile"
              onChange={handleImageChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
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
