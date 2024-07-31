import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ISubCategory } from "../../@types/dashboard";
import {
  deleteSubCategory,
  fetchAllSubCategories,
} from "../../services/api/adminApi";
import { toast } from "react-toastify";
import LoadingPage from "../../components/common/LoadingPage";
import Swal from "sweetalert2";

function CategoryTable() {
  const navigate = useNavigate();
  const [Subcategories, setSubCategories] = useState<ISubCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchAllSubCategories();
        setSubCategories(response.data);
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleAddCategory = () => {
    navigate("/admin/addSubCategory");
  };

  const handleEdit = (categoryId: string) => {
    navigate(`/admin/editSubCategory/${categoryId}`);
  };

  const handleDelete = async (categoryId: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteSubCategory(categoryId);
        Swal.fire("Deleted!", "Your category has been deleted.", "success");
    
        const response = await fetchAllSubCategories();
        setSubCategories(response.data);
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
        <h1 className="text-2xl font-bold">All SubCategories</h1>
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
              <th className="py-2 px-4 text-left">Categroy Name</th>
              <th className="py-2 px-4 text-left">SubCategory Image</th>
              <th className="py-2 px-4 text-left">SubCategory Name</th>
             
              <th className="py-2 px-4 text-left">Description</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Subcategories.map((Subcategory, index) => (
              <tr key={Subcategory._id} className="border-b">
                <td className="py-2 px-4 text-left">{index + 1}</td>
                <td className="py-2 px-4 text-left">{Subcategory.catName}</td>
                <td className="py-2 px-4 text-left">
                  <img
                    src={Subcategory.subCatImage}
                    alt={Subcategory.subCatName}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="py-2 px-4 text-left">{Subcategory.subCatName}</td>
                <td className="py-2 px-4 text-left">
                  {Subcategory.description}
                </td>
                <td className="py-2 px-4 text-left">
                  <button
                    className="px-2 py-1 bg-green-500 text-white rounded mr-2 hover:bg-green-600 focus:outline-none"
                    onClick={() => handleEdit(Subcategory._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                    onClick={() => handleDelete(Subcategory._id)}
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
