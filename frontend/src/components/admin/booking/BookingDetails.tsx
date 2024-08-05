import { useNavigate } from "react-router-dom";

const bookingDetails = [
  {
    id: 1,
    userName: "John Doe",
    categoryName: "Computer Science",
    expertName: "Dr. Smith",
    transactionId: "TX123456789",
    amount: "$100.00",
    paymentStatus: "Completed",
  },
  {
    id: 2,
    userName: "Jane Smith",
    categoryName: "Mechanical Engineering",
    expertName: "Prof. Johnson",
    transactionId: "TX987654321",
    amount: "$150.00",
    paymentStatus: "Pending",
  },
  // Add more booking details as needed
];

const BookingDetails = () => {
  const navigate = useNavigate();
  const handleViewMore = (id: number) => {
    console.log("Viewing more details for booking ID:", id);
    navigate("/admin/booking-view");
  };
  
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Booking Details</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 border-b">
              <th className="py-3 px-4 text-left">Booking ID</th>
              <th className="py-3 px-4 text-left">User Name</th>
              <th className="py-3 px-4 text-left">Category Name</th>
              <th className="py-3 px-4 text-left">Expert Name</th>
              <th className="py-3 px-4 text-left">Transaction ID</th>
              <th className="py-3 px-4 text-left">Amount</th>
              <th className="py-3 px-4 text-left">Payment Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookingDetails.map((detail) => (
              <tr key={detail.id} className="border-b">
                <td className="py-3 px-4 text-sm">{detail.id}</td>
                <td className="py-3 px-4 text-sm">{detail.userName}</td>
                <td className="py-3 px-4 text-sm">{detail.categoryName}</td>
                <td className="py-3 px-4 text-sm">{detail.expertName}</td>
                <td className="py-3 px-4 text-sm">{detail.transactionId}</td>
                <td className="py-3 px-4 text-sm">{detail.amount}</td>
                <td className="py-3 px-4 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-white ${
                      detail.paymentStatus === "Completed"
                        ? "bg-green-500"
                        : detail.paymentStatus === "Pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {detail.paymentStatus}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm">
                  <button
                    className="px-4 py-2 bg-[#0B2149] text-white rounded-lg "
                    onClick={() => handleViewMore(detail.id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default BookingDetails;
