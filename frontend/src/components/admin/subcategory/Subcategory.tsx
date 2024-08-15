import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ISubCategory } from "../../../@types/dashboard";
import {
  deleteSubCategory,
  fetchAllSubCategories,
} from "../../../services/api/categoryApi";
import { toast } from "react-toastify";
import LoadingPage from "../../common/Loading/LoadingPage";
import Swal from "sweetalert2";

interface Pagination {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
}

interface categoryResponse {
  data: {
    items: ISubCategory[];
    pagination: Pagination;
  };
  message?: string;
}

function SubCategoryTable() {
  const navigate = useNavigate();
  const [subCategories, setSubCategories] = useState<ISubCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response: categoryResponse = await fetchAllSubCategories(
          currentPage,
          itemsPerPage
        );
        setSubCategories(response.data.items);
        setTotalPages(response.data.pagination.totalPages);
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [currentPage, itemsPerPage]);

  const handleAddCategory = () => {
    navigate("/admin/addSubCategory");
  };

  const handleEdit = (subCategoryId: string) => {
    navigate(`/admin/editSubCategory/${subCategoryId}`);
  };

  const handleDelete = async (subCategoryId: string) => {
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
        await deleteSubCategory(subCategoryId);
        Swal.fire("Deleted!", "Your subcategory has been deleted.", "success");

        const response = await fetchAllSubCategories(currentPage, itemsPerPage);
        setSubCategories(response.data);
      }
    } catch (error) {
      toast.error("Failed to delete subcategory");
    }
  };
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <LoadingPage />
      </div>
    );
  }

  return (
    <div className="mt-4 w-full bg-white">
      <div className="m-5 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">All SubCategories</h1>
      </div>
      <div className="flex justify-end me-10">
        <button
          onClick={handleAddCategory}
          className="px-4 py-2 bg-[#0B2149] text-white rounded-lg hover:bg-[#062038] focus:outline-none"
        >
          Add New SubCategory
        </button>
      </div>
      <div className="m-4 overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead className="bg-[#E8EFFA] border-b">
            <tr>
              <th className="py-2 px-4 text-left text-xs sm:text-sm">No</th>
              <th className="py-2 px-4 text-left text-xs sm:text-sm">
                Category Name
              </th>
              <th className="py-2 px-4 text-left text-xs sm:text-sm">
                SubCategory Image
              </th>
              <th className="py-2 px-4 text-left text-xs sm:text-sm">
                SubCategory Name
              </th>
              <th className="py-2 px-4 text-left text-xs sm:text-sm">
                Description
              </th>
              <th className="py-2 px-4 text-left text-xs sm:text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {subCategories.map((subCategory, index) => (
              <tr key={subCategory._id} className="border-b">
                <td className="py-2 px-4 text-left text-xs sm:text-sm">
                  {index + 1}
                </td>
                <td className="py-2 px-4 text-left text-xs sm:text-sm">
                  {subCategory.catName}
                </td>
                <td className="py-2 px-4 text-left text-xs sm:text-sm">
                  <img
                    src={subCategory.subCatImage}
                    alt={subCategory.subCatName}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="py-2 px-4 text-left text-xs sm:text-sm">
                  {subCategory.subCatName}
                </td>
                <td className="py-2 px-4 text-left text-xs sm:text-sm">
                  {subCategory.description}
                </td>
                <td className="py-2 px-4 text-left text-xs sm:text-sm">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
                      onClick={() => handleEdit(subCategory._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                      onClick={() => handleDelete(subCategory._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4 mb-10">
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 disabled:opacity-50"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2 text-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 disabled:opacity-50"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubCategoryTable;
