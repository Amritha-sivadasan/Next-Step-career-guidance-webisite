import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllBookingByAdmin } from "../../../services/api/adminApi";
import { IBooking } from "../../../@types/booking";
import { toast } from "react-toastify";
import { IStudent } from "../../../@types/user";
import { IExpert } from "../../../@types/expert";
import LoadingPage from "../../common/Loading/LoadingPage";

const BookingDetails = () => {
  const [bookingDetails, setBookingDetails] = useState<IBooking[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredBookings, setFilteredBookings] = useState<IBooking[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetchAllBookingByAdmin(
          currentPage,
          itemsPerPage
        );
        if (response.data) {
          setBookingDetails(response.data.items);
          setFilteredBookings(response.data.items);
          setTotalPages(response.data.pagination.totalPages);
        } else {
          toast.error(response.message || "Failed to fetch Bookings");
        }
      } catch (error) {
        toast.error("Failed to fetch Bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [currentPage, itemsPerPage]);
  useEffect(() => {
    if (searchQuery) {
      const filtered = bookingDetails.filter((detail) => {
        const student = detail.studentId as IStudent;
        const expert = detail.expertId as IExpert
        return (
          detail._id.includes(searchQuery) ||
          student.user_name.toLowerCase().includes(searchQuery.toLowerCase())||
          expert.user_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilteredBookings(filtered);
    } else {
      setFilteredBookings(bookingDetails);
    }
  }, [searchQuery, bookingDetails]);

  const handleViewMore = (id: string) => {
    console.log("Viewing more details for booking ID:", id);
    navigate(`/admin/booking-view/${id}`);
  };
  const handlePageChange = (page: number) => {
    setLoading(true);
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
    <div className="p-4 bg-gray-100 min-h-screen w-10/12">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Booking Details</h1>
      <div className="mb-4 w-6/12">
        <input
          type="search"
          placeholder="Search by Booking ID or Student Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 w-full border border-gray-300 rounded-lg shadow-sm"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md table-fixed">
          <thead>
            <tr className="bg-gray-200 border-b">
              <th className="py-3 px-2 text-left ">No</th>
              <th className="py-3 px-2 text-left w-1/6">Booking ID</th>
              <th className="py-3 px-2 text-left w-28">User Name</th>
              <th className="py-3 px-2 text-left w-28">Category Name</th>
              <th className="py-3 px-2 text-left w-28">Expert Name</th>
              <th className="py-3 px-4 text-left   w-2/12">Transaction ID</th>
              <th className="py-3 px-2 text-left w-20">Amount</th>
              <th className="py-3 px-2 text-left w-28">Payment Status</th>
              <th className="py-3 px-2 text-left w-24">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((detail, index) => {
              const student = detail.studentId as IStudent;
              const expert = detail.expertId as IExpert;

              return (
                <tr key={detail._id} className="border-b">
                  <td className="py-3 px-2 text-sm">{index + 1}</td>
                  <td className="py-3 px-2 text-sm w-1/6">{detail._id}</td>
                  <td className="py-3 px-2 text-sm truncate">
                    {student.user_name}
                  </td>
                  <td className="py-3 px-2 text-sm truncate">
                    {expert.subCatName}
                  </td>
                  <td className="py-3 px-2 text-sm truncate">
                    {expert.user_name}
                  </td>
                  <td className="py-3 px-4 truncate max-w-10 w-2/12">
                    {detail.transactionId}
                  </td>
                  <td className="py-3 px-2 text-sm">{detail.paymentAmount}</td>
                  <td className="py-3 px-2 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-white ${
                        detail.paymentStatus === "completed"
                          ? "bg-green-500"
                          : detail.paymentStatus === "Pending"
                          ? "bg-yellow-500"
                          : "bg-red-800"
                      }`}
                    >
                      {detail.paymentStatus}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-sm">
                    <button
                      className="px-4 py-2 bg-[#0B2149] text-white rounded-lg"
                      onClick={() => handleViewMore(detail._id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
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
  );
};

export default BookingDetails;
