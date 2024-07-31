import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICategory } from "../../@types/dashboard";
import { deleteCategory, fetchAllCategories } from "../../services/api/categoryApi";
import { toast } from "react-toastify";
import LoadingPage from "../../components/common/LoadingPage";
import Swal from 'sweetalert2';

function CategoryTable() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchAllCategories();
        setCategories(response.data);
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleAddCategory = () => {
    navigate("/admin/addCategory");
  }

  const handleEdit = (categoryId: string) => {
    navigate(`/admin/editCategory/${categoryId}`);
  }

  const handleDelete = async (categoryId: string) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        await deleteCategory(categoryId);
        Swal.fire(
          'Deleted!',
          'Your category has been deleted.',
          'success'
        );
        // Refresh the category list
        const response = await fetchAllCategories();
        setCategories(response.data);
      }
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="mt-4 w-full bg-white">
      <div className="m-5 flex justify-between items-center">
        <h1 className="text-2xl font-bold">All Categories</h1>
      </div>
      <div className="flex justify-end me-8">
        <button
          onClick={handleAddCategory}
          className="px-4 py-2 bg-[#0B2149] text-white rounded-lg hover:bg-[#062038] focus:outline-none"
        >
          Add New Category
        </button>
      </div>
      <div className="m-4">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead className="bg-[#E8EFFA] border-b">
            <tr>
              <th className="py-2 px-4 text-left">No</th>
              <th className="py-2 px-4 text-left">Category Image</th>
              <th className="py-2 px-4 text-left">Category Name</th>
              <th className="py-2 px-4 text-left">Description</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category._id} className="border-b">
                <td className="py-2 px-4 text-left">{index + 1}</td>
                <td className="py-2 px-4 text-left">
                  <img
                    src={category.catImage}
                    alt={category.catName}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="py-2 px-4 text-left">{category.catName}</td>
                <td className="py-2 px-4 text-left">{category.description}</td>
                <td className="py-2 px-4 text-left">
                  <button
                    className="px-2 py-1 bg-green-500 text-white rounded mr-2 hover:bg-green-600 focus:outline-none"
                    onClick={() => handleEdit(category._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                    onClick={() => handleDelete(category._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CategoryTable;
