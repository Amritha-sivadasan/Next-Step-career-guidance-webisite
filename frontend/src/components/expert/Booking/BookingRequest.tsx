import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // For Confirm and Cancel icons

const bookingRequests = [
  {
    id: 1,
    studentImage: "/path/to/student1.jpg",
    studentName: "John Doe",
    educationLevel: "Undergraduate",
    educationBackground: "Computer Science",
    scheduleDate: "Monday, August 7, 2024",
    scheduleTimeFrom: "2:00 PM",
    scheduleTimeTo: "3:00 PM",
  },
  {
    id: 2,
    studentImage: "/path/to/student2.jpg",
    studentName: "Jane Smith",
    educationLevel: "Graduate",
    educationBackground: "Mechanical Engineering",
    scheduleDate: "Wednesday, August 9, 2024",
    scheduleTimeFrom: "10:00 AM",
    scheduleTimeTo: "11:00 AM",
  },
  // Add more booking requests as needed
];

const BookingRequest = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Booking Requests</h1>
      <div className="space-y-4">
        {bookingRequests.map((request) => (
          <div
            key={request.id}
            className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-white shadow-md rounded-lg h-auto"
          >
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <img
                src={request.studentImage}
                alt="Student"
                className="h-16 w-16 rounded-full object-cover"
              />
              <div className="text-lg text-gray-800">
                <div className="font-semibold">{request.studentName}</div>
                <div className="text-sm text-gray-600">
                  {request.educationLevel}
                </div>
                <div className="text-sm text-gray-600">
                  {request.educationBackground}
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-col items-start md:items-center justify-between space-y-2 md:space-y-5">
              <div className="text-md text-gray-800 mb-2 md:mb-0">
                <div><strong>Date:</strong> {request.scheduleDate}</div>
                <div><strong>From:</strong> {request.scheduleTimeFrom}</div>
                <div><strong>To:</strong> {request.scheduleTimeTo}</div>
              </div>
              <div className="flex space-x-4">
                <button
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  onClick={() => handleConfirm(request.id)}
                >
                  <FaCheckCircle className="mr-2" />
                  Confirm
                </button>
                <button
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  onClick={() => handleCancel(request.id)}
                >
                  <FaTimesCircle className="mr-2" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const handleConfirm = (id: number) => {
  // Handle confirm action
  console.log("Confirmed request with ID:", id);
};

const handleCancel = (id: number) => {
  // Handle cancel action
  console.log("Cancelled request with ID:", id);
};

export default BookingRequest;
