import { useEffect, useState } from "react";
import { getAllPaymentByUserId } from "../../../services/api/bookingApi";
import { IBooking } from "../../../@types/booking";
import { IExpert } from "../../../@types/expert";
import moment from "moment";

const PaymentDetails = () => {
  const [paymentDetails, setPaymentDetails] = useState<IBooking[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 5;

  const fetchPayments = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await getAllPaymentByUserId(page, itemsPerPage);
      if (response.data.length < itemsPerPage) {
        setHasMore(false);
      }
      console.log("payment", response.data);

      setPaymentDetails((prev) => [...prev, ...response.data]);
    } catch (error) {
      console.error("Failed to fetch payments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments(currentPage);
  }, [currentPage]);

  const handleViewMore = () => {
    if (hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-white border border-gray-300 shadow-lg rounded-lg">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">
        Payment Details
      </h1>
      <div className="flex justify-center mb-6 sm:mb-10">
        <img src="/pay.png" alt="details" className="w-full sm:w-3/4" />
      </div>
      <div className="c">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-x-auto">
          <thead className="bg-gray-100 border-b ">
            <tr>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-gray-600 max-w-5 w-1/12">
                No
              </th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-gray-600 max-w-10 w-2/6 hidden lg:table-cell sm:table-cell ">
                Transaction ID
              </th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-gray-600 w-1/4 truncate  sm:table-cell">
                Date
              </th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-gray-600 w-1/4 truncate  sm:table-cell">
                Expert Name
              </th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-gray-600 w-1/4 truncate hidden lg:table-cell">
                Amount
              </th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-left text-gray-600 w-1/6 truncate">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {paymentDetails.map((payment, index) => {
              const expert = payment.expertId as IExpert;
              return (
                <tr key={payment._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-800 max-w-5 truncate">
                    {index + 1}
                  </td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-800 truncate max-w-10 hidden lg:table-cell md:table-cell sm:table-cell">
                    {payment.transactionId}
                  </td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-800 truncate  sm:table-cell">
                    {moment(payment.createdAt).format("DD/MM/YYYY")}
                  </td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-800 truncate  md:table-cell">
                    {expert.user_name}
                  </td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-800 truncate hidden lg:table-cell">
                    ₹{payment.paymentAmount}
                  </td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4">
                    <span
                      className={`px-2 sm:px-3 py-1 text-xs sm:text-xs font-medium rounded-full ${
                        payment.paymentStatus === "completed"
                          ? "bg-green-500 text-white"
                          : payment.paymentStatus === "pending"
                          ? "bg-yellow-500 text-white"
                          : payment.paymentStatus === "refund"
                          ? "bg-red-400 text-white"
                          : ""
                      }`}
                    >
                      {payment.paymentStatus}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {isLoading && <div className="text-center py-4">Loading...</div>}
      {!isLoading && hasMore && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleViewMore}
            className="px-4 py-2 bg-blue-950 text-white rounded-lg shadow hover:bg-blue-900"
          >
            View More
          </button>
        </div>
      )}
      {!hasMore && !isLoading && (
        <div className="text-center py-4">No more payments available</div>
      )}
    </div>
  );
};

export default PaymentDetails;
