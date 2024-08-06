import React from 'react';

const bookingDetails = {
  id: 1,
  studentImage: "/path/to/student1.jpg",
  studentName: "John Doe",
  educationLevel: "Undergraduate",
  educationBackground: "Computer Science",
  scheduleDate: "Monday, August 7, 2024",
  scheduleTimeFrom: "2:00 PM",
  scheduleTimeTo: "3:00 PM",
  transactionId: "TX123456789",
  amount: "$100.00",
  paymentStatus: "Completed",
};

const BookingView = () => {
  const {
    studentImage,
    studentName,
    educationLevel,
    educationBackground,
    scheduleDate,
    scheduleTimeFrom,
    scheduleTimeTo,
    transactionId,
    amount,
    paymentStatus,
  } = bookingDetails;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-600 p-6">
          <h1 className="text-3xl font-bold text-white">Booking Details</h1>
        </div>
        <div className="p-6">
          <div className="flex items-center mb-8">
            <img
              src={studentImage}
              alt="Student"
              className="h-24 w-24 rounded-full object-cover border-4 border-blue-600"
            />
            <div className="ml-6">
              <h2 className="text-2xl font-bold text-gray-800">{studentName}</h2>
              <p className="text-gray-600">{educationLevel}</p>
              <p className="text-gray-600">{educationBackground}</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Schedule Details</h3>
            <p className="text-gray-700">
              <strong>Date:</strong> {scheduleDate}
            </p>
            <p className="text-gray-700">
              <strong>Time:</strong> {scheduleTimeFrom} - {scheduleTimeTo}
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Payment Details</h3>
            <p className="text-gray-700">
              <strong>Transaction ID:</strong> {transactionId}
            </p>
            <p className="text-gray-700">
              <strong>Amount:</strong> {amount}
            </p>
            <p className="text-gray-700">
              <strong>Status:</strong> 
              <span className={`ml-2 px-3 py-1 rounded-full text-white ${paymentStatus === "Completed" ? "bg-green-500" : "bg-yellow-500"}`}>
                {paymentStatus}
              </span>
            </p>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
            View More Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingView;
