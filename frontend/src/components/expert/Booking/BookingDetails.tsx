import React from 'react';

const bookingDetails = [
  {
    id: 1,
    studentImage: "/path/to/student1.jpg",
    studentName: "John Doe",
    scheduleDate: "Monday, August 7, 2024",
    scheduleTimeFrom: "2:00 PM",
    scheduleTimeTo: "3:00 PM",
  },
  {
    id: 2,
    studentImage: "/path/to/student2.jpg",
    studentName: "Jane Smith",
    scheduleDate: "Wednesday, August 9, 2024",
    scheduleTimeFrom: "10:00 AM",
    scheduleTimeTo: "11:00 AM",
  },
  // Add more booking details as needed
];

const BookingDetails = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Booking Details</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 border-b">
              <th className="py-3 px-4 text-left">Profile Picture</th>
              <th className="py-3 px-4 text-left">Student Name</th>
              <th className="py-3 px-4 text-left">Schedule Date</th>
              <th className="py-3 px-4 text-left">Schedule Time</th>
            </tr>
          </thead>
          <tbody>
            {bookingDetails.map((detail) => (
              <tr key={detail.id} className="border-b">
                <td className="py-3 px-4">
                  <img
                    src={detail.studentImage}
                    alt="Student"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </td>
                <td className="py-3 px-4">{detail.studentName}</td>
                <td className="py-3 px-4">{detail.scheduleDate}</td>
                <td className="py-3 px-4">
                  {detail.scheduleTimeFrom} - {detail.scheduleTimeTo}
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
