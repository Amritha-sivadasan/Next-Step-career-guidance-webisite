import  { useEffect, useState } from "react";
import { IBooking } from "../../../@types/booking";
import { fetchAllBookingByAdmin } from "../../../services/api/adminApi";
import { IStudent } from "../../../@types/user";
import { IExpert } from "../../../@types/expert";
import moment from "moment";
import { CSVLink } from "react-csv";
import LoadingPage from "../../common/Loading/LoadingPage";

const PaymentReport = () => {
  const [paymentDetails, setPaymentDetails] = useState<IBooking[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetchAllBookingByAdmin(
        currentPage - 1,
        itemsPerPage
      );
      setLoading(false);
      setPaymentDetails(response.data.items);
      setTotalPages(Math.ceil(response.data.pagination.totalPages));
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const headers = [
    { label: "No", key: "no" },
    { label: "Transaction Id", key: "transactionId" },
    { label: "Student Name", key: "studentName" },
    { label: "Expert Name", key: "expertName" },
    { label: "Date", key: "date" },
    { label: "Meeting Status", key: "meetingStatus" },
    { label: "Amount", key: "paymentAmount" },
  ];
  const csvData = paymentDetails.map((booking, index) => {
    const formattedDate = moment(booking.createdAt).format("DD/MM/YYYY");

    return {
      no: index + 1,
      transactionId: booking.transactionId,
      studentName: (booking.studentId as IStudent).user_name,
      expertName: (booking.expertId as IExpert).user_name,
      date: formattedDate,
      meetingStatus: booking.meetingStatus,
      paymentAmount: booking.paymentAmount,
    };
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <LoadingPage />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold">Payment Report</h1>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="text-gray-600">
              Showing page {currentPage} of {totalPages}
            </div>
            <div className="space-x-2">
              <CSVLink
                data={csvData}
                headers={headers}
                filename={`payment-report-page-${currentPage}.csv`}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Download
              </CSVLink>
            </div>
          </div>

          {/* Table for medium and large screens */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    No
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction Id
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expert Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Meeting Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paymentDetails.map((booking, index) => {
                  const student = booking.studentId as IStudent;
                  const expert = booking.expertId as IExpert;

                  return (
                    <tr key={booking._id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div
                          className="text-sm text-gray-900 truncate max-w-xs"
                          title={booking.transactionId}
                        >
                          {booking.transactionId}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {student.user_name}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {expert.user_name}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {moment(booking.createdAt).format("DD/MM/YYYY")}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            booking.meetingStatus === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {booking.meetingStatus}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.paymentAmount}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Card layout for small screens */}
          <div className="md:hidden space-y-4">
            {paymentDetails.map((booking, index) => {
              const student = booking.studentId as IStudent;
              const expert = booking.expertId as IExpert;

              return (
                <div
                  key={booking._id}
                  className="bg-white p-4 rounded-lg shadow"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-500">
                      No: {index + 1}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        booking.meetingStatus === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {booking.meetingStatus}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Transaction ID:</span>{" "}
                    {booking.transactionId}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Student:</span>{" "}
                    {student.user_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Expert:</span>{" "}
                    {expert.user_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Amount:</span>{" "}
                    {booking.paymentAmount}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentReport;
