import React from "react";

const paymentDetails = [
  {
    id: 1,
    transactionId: "TX123456789",
    date: "August 7, 2024",
    studentName: "John Doe",
    amount: "$100.00",
    status: "Completed",
  },
  {
    id: 2,
    transactionId: "TX987654321",
    date: "August 9, 2024",
    studentName: "Jane Smith",
    amount: "$150.00",
    status: "Pending",
  },
  // Add more payment details as needed
];

const PaymentDetails = () => {
  return (
    <div className="p-6 bg-white border border-gray-300 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Payment Details</h1>
      <div className="flex justify-center mb-10">
        <img src="/pay.png" alt="details" className="w-3/4" />
      </div>
      <div className="overflow-x-auto ">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg ">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="py-3 px-4 text-left text-gray-600">
                Transaction ID
              </th>
              <th className="py-3 px-4 text-left text-gray-600">Date</th>
              <th className="py-3 px-4 text-left text-gray-600">
                Student Name
              </th>
              <th className="py-3 px-4 text-left text-gray-600">Amount</th>
              <th className="py-3 px-4 text-left text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentDetails.map((payment) => (
              <tr key={payment.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-800">
                  {payment.transactionId}
                </td>
                <td className="py-3 px-4 text-gray-800">{payment.date}</td>
                <td className="py-3 px-4 text-gray-800">
                  {payment.studentName}
                </td>
                <td className="py-3 px-4 text-gray-800">{payment.amount}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      payment.status === "Completed"
                        ? "bg-green-500 text-white"
                        : payment.status === "Pending"
                        ? "bg-yellow-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentDetails;
