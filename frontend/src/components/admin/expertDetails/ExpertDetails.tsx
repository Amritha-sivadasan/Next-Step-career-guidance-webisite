import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingPage from "../../common/Loading/LoadingPage"; // Ensure you have a LoadingPage component
import { useNavigate } from "react-router-dom";
import {
  fetchAllExpert,
  handleBlockAndUnblockExpert,
} from "../../../services/api/adminApi";
import { IExpert } from "../../../@types/expert";
interface Pagination {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
}

interface ExpertsResponse {
  data: {
    items: IExpert[];
    pagination: Pagination;
  };
  message?: string;
}

const Experts: React.FC = () => {
  const [experts, setExperts] = useState<IExpert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);

  const navigate = useNavigate();

  useEffect(() => {
    const loadExperts = async () => {
      try {
        const response: ExpertsResponse = await fetchAllExpert(
          currentPage,
          itemsPerPage
        );
        if (response.data) {
          setExperts(response.data.items);
          setTotalPages(response.data.pagination.totalPages);
        } else {
          toast.error(response.message || "Failed to fetch experts");
        }
      } catch (err) {
        toast.error("Failed to fetch experts");
      } finally {
        setLoading(false);
      }
    };

    loadExperts();
  }, [currentPage, itemsPerPage]);

  const handleViewButton = (expertId: string) => {
    navigate(`/admin/expertView/${expertId}`);
  };
  const handleBlockUnblock = async (expertId: string) => {
    const response = await handleBlockAndUnblockExpert(expertId);
    if (response.success) {
      const updatedResponse: ExpertsResponse = await fetchAllExpert(
        currentPage,
        itemsPerPage
      );
      toast.success(response.message);
      setExperts(updatedResponse.data.items);
      setTotalPages(updatedResponse.data.pagination.totalPages);
      console.log("expert response", response);
    } else {
      toast.error(response.message);
    }
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <LoadingPage />
      </div>
    );
  }

  return (
    <main className="flex-1 p-6 bg-gray-100">
      <div className="bg-white p-4 shadow rounded-lg">
        <div className="m-5 flex flex-col sm:flex-row sm:justify-between sm:items-center mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold">Experts List</h1>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white mt-4">
            <thead>
              <tr>
                <th className="py-2 border-b text-left text-xs sm:text-sm md:text-center">
                  No
                </th>
                <th className="py-2 border-b text-left text-xs sm:text-sm md:text-center">
                  Profile
                </th>
                <th className="py-2 border-b text-left text-xs sm:text-sm md:text-center">
                  Expert Name
                </th>
                <th className="py-2 border-b text-left text-xs sm:text-sm md:text-center">
                  SubCategory Name
                </th>
                <th className="py-2 border-b text-left text-xs sm:text-sm md:text-center">
                  Email Id
                </th>
                <th className="py-2 border-b text-left text-xs sm:text-sm md:text-center">
                  Status
                </th>
                <th className="py-2 px-4 border-b text-left text-xs sm:text-sm md:text-center">
                  Active
                </th>
                <th className="py-2 border-b text-left text-xs sm:text-sm md:text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {experts.map((expert, index) => (
                <tr key={expert._id}>
                  <td className="py-2 border-b text-center text-xs sm:text-sm md:text-center">
                    {index + 1}
                  </td>
                  <td className="py-2 border-b text-center">
                    {typeof expert.profile_picture == "string" && (
                      <img
                        src={expert.profile_picture}
                        alt="Profile"
                        className="h-8 w-8 sm:h-10 sm:w-10 rounded-full mx-auto"
                      />
                    )}
                  </td>
                  <td className="py-2 border-b text-center text-xs sm:text-sm md:text-center">
                    {expert.user_name}
                  </td>
                  <td className="py-2 border-b text-center text-xs sm:text-sm md:text-center">
                    {expert.subCatName}
                  </td>
                  <td className="py-2 border-b text-center text-xs sm:text-sm md:text-center">
                    {expert.email}
                  </td>
                  <td className="py-2 border-b text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs sm:text-sm md:text-center ${
                        expert.is_credential_validate === "pending"
                          ? "bg-yellow-500"
                          : expert.is_credential_validate === "true"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {expert.is_credential_validate === "pending"
                        ? "Pending"
                        : expert.is_credential_validate === "true"
                        ? "Validate"
                        : "Rejected"}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      className={`px-3 py-1  text-white rounded-full ${
                        expert.is_active ? "bg-red-800" : "bg-yellow-500"
                      }`}
                      onClick={() => handleBlockUnblock(expert._id)}
                    >
                      {expert.is_active ? "Block" : "Unblock"}
                    </button>
                  </td>
                  <td className="py-2 border-b text-center">
                    <button
                      className="bg-gray-200 px-2 py-1 rounded text-xs sm:text-sm md:text-base"
                      onClick={() => handleViewButton(expert._id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Experts;
