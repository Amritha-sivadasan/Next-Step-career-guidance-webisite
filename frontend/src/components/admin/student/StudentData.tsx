import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import LoadingPage from "../../common/Loading/LoadingPage";
import { useNavigate } from "react-router-dom";
import {
  fetchAllEStudent,
  handleBlockAndUnblockStudent,
} from "../../../services/api/adminApi";
import { IStudent } from "../../../@types/user";

interface Pagination {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
}

interface StduentResponse {
  data: {
    items: IStudent[];
    pagination: Pagination;
  };
  message?: string;
}

const StudentData = () => {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);
  const navigate = useNavigate();

  useEffect(() => {
    const loadStudent = async () => {
      try {
        const response: StduentResponse = await fetchAllEStudent(
          currentPage,
          itemsPerPage
        );
        if (response.data) {
          setStudents(response.data.items);
          setTotalPages(response.data.pagination.totalPages);
        } else {
          toast.error(response.message || "Failed to fetch students");
        }
      } catch (err) {
        toast.error("Failed to fetch students");
      } finally {
        setLoading(false);
      }
    };

    loadStudent();
  }, [currentPage, itemsPerPage]);

  const handleViewButton = useCallback( (studentId: string) => {
      navigate(`/admin/studentView/${studentId}`);
    },
    [navigate]
  );

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const handleBlockUnblock = useCallback(
    async (studentId: string) => {
      const response = await handleBlockAndUnblockStudent(studentId);
      if (response.success) {
        const updatedResponse: StduentResponse = await fetchAllEStudent(
          currentPage,
          itemsPerPage
        );
        toast.success(response.message);
        setStudents(updatedResponse.data.items);
        setTotalPages(updatedResponse.data.pagination.totalPages);
      } else {
        toast.error(response.message);
      }
    },
    [currentPage, itemsPerPage]
  );

  const memoizedRow = useMemo(
    () =>
      students.map((student, index) => (
        <tr key={student._id}>
          <td className="py-2 px-4 border-b text-center text-xs sm:text-sm md:text-center">
            {index + 1}
          </td>
          <td className="py-2 px-4 border-b text-center">
            {typeof student.profile_picture === "string" && (
              <img
                src={student.profile_picture ? student.profile_picture : "/"}
                alt="Profile"
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full mx-auto"
              />
            )}
          </td>
          <td className="py-2 px-4 border-b text-center text-xs sm:text-sm md:text-center">
            {student.user_name}
          </td>
          <td className="py-2 px-4 border-b text-center text-xs sm:text-sm md:text-center">
            {student.education_level}
          </td>
          <td className="py-2 px-4 border-b text-center text-xs sm:text-sm md:text-center">
            {student.email}
          </td>
          <td className="py-2 px-4 border-b text-center text-xs sm:text-sm md:text-center">
            {student.education_background}
          </td>
          <td className="py-2 px-4 border-b text-center">
            <button
              className={`px-3 py-1  text-white rounded-full ${
                student.is_active ? "bg-red-800" : "bg-yellow-500"
              }`}
              onClick={() => handleBlockUnblock(student._id)}
            >
              {student.is_active ? "Block" : "Unblock"}
            </button>
          </td>
          <td className="py-2 px-4 border-b text-center">
            <button
              className="bg-gray-200 px-4 py-1 rounded text-xs sm:text-sm md:text-center"
              onClick={() => handleViewButton(student._id)}
            >
              View
            </button>
          </td>
        </tr>
      )),
    [students, handleBlockUnblock, handleViewButton]
  );

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
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <h1 className="text-2xl sm:text-3xl font-bold">Students List</h1>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white mt-4">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left text-xs sm:text-sm md:text-center">
                  No
                </th>
                <th className="py-2 px-4 border-b text-left text-xs sm:text-sm md:text-center">
                  Profile
                </th>
                <th className="py-2 px-4 border-b text-left text-xs sm:text-sm md:text-center">
                  Student Name
                </th>
                <th className="py-2 px-4 border-b text-left text-xs sm:text-sm md:text-center">
                  Education Level
                </th>
                <th className="py-2 px-4 border-b text-left text-xs sm:text-sm md:text-center">
                  Email Id
                </th>
                <th className="py-2 px-4 border-b text-left text-xs sm:text-sm md:text-center">
                  Subject
                </th>
                <th className="py-2 px-4 border-b text-left text-xs sm:text-sm md:text-center">
                  Status
                </th>
                <th className="py-2 px-4 border-b text-left text-xs sm:text-sm md:text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>{memoizedRow}</tbody>
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

export default StudentData;
