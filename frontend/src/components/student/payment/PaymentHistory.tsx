import { useEffect, useState } from "react";
import { getAllPaymentByUserId } from "../../../services/api/bookingApi";
import { IBooking } from "../../../@types/booking";
import { IExpert } from "../../../@types/expert";

const PaymentDetails = () => {
  const [paymentDetails, setPaymentDetails] = useState<IBooking[]>([]);

  useEffect(() => {
    const fetchAllBooking = async () => {
      const response = await getAllPaymentByUserId();
      console.log('response',response)
      setPaymentDetails(response.data);
    };
    fetchAllBooking();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const day = date.getDate();
    const monthName = date.toLocaleDateString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${dayName}, ${day} ${monthName} ${year}`;
  };

  return (
    <div className="p-6 bg-white border border-gray-300 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Payment Details</h1>
      <div className="flex justify-center mb-10">
        <img src="/pay.png" alt="details" className="w-3/4" />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="py-3 px-4 text-left text-gray-600  max-w-5 w-1/12">
                No
              </th>
              <th className="py-3 px-4 text-left text-gray-600  max-w-10 w-2/6">
                Transaction ID
              </th>
              <th className="py-3 px-4 text-left text-gray-600 w-1/4 truncate">
                Date
              </th>
              <th className="py-3 px-4 text-left text-gray-600 w-1/4 truncate">
                Student Name
              </th>
              <th className="py-3 px-4 text-left text-gray-600 w-1/4 truncate">
                Amount
              </th>
              <th className="py-3 px-4 text-left text-gray-600 w-1/6 truncate">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {paymentDetails.map((payment, index) => {
              const expert = payment.expertId as IExpert;

              return (
                <tr key={payment._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-800 max-w-5 truncate ">
                    {index + 1}
                  </td>
                  <td className="py-3 px-4 text-gray-800 truncate max-w-10">
                    {payment.transactionId}
                  </td>
                  <td className="py-3 px-4 text-gray-800 truncate ">
                    {formatDate(payment.createdAt)}
                  </td>
                  <td className="py-3 px-4 text-gray-800 truncate">
                    {expert.user_name}
                  </td>
                  <td className="py-3 px-4 text-gray-800 truncate">
                    ₹{payment.paymentAmount}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
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
    </div>
  );
};

export default PaymentDetails;
