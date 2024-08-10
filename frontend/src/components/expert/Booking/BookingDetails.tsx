import { useEffect, useState } from "react";
import { getConfirmBooking } from "../../../services/api/bookingApi";
import { IBooking } from "../../../@types/booking";
import { IStudent } from "../../../@types/user";
import { ISlot } from "../../../@types/slot";

const BookingDetails = () => {
  const [bookingDetails, setBookingDetails] = useState<IBooking[]>([]);

  useEffect(() => {
    const fetchConfirmBooking = async () => {
      const result = await getConfirmBooking();
      setBookingDetails(result.data);
    };

    fetchConfirmBooking();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const day = date.getDate();
    const monthName = date.toLocaleDateString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${dayName}, ${day} ${monthName} ${year}`;
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div className="p-4 min-h-screen  bg-white rounded-lg ">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Booking Details</h1>

      <div className="space-y-4">
        {bookingDetails.map((request) => {
          const student = request.studentId as IStudent;
          const slot = request.slotId as ISlot;

          return (
            <div
              key={request._id}
              className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-gray-200 shadow-md rounded-lg h-auto"
            >
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <img
                  src={student?.profile_picture}
                  alt="Student"
                  className="h-28 w-28 rounded-lg object-cover"
                />
                <div className="text-lg text-gray-800">
                  <div className="font-semibold"> {student.user_name}</div>
                  <div className="text-sm text-gray-600">
                    Current Status : <strong>{student.user_type}</strong>
                  </div>
                  <div className="text-sm text-gray-600">
                    Education Level: <strong>{student.education_level}</strong>
                  </div>
                  <div className="text-sm text-gray-600">
                    Education Background :{" "}
                    <strong>{student.education_background}</strong>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-col items-start md:items-center justify-between space-y-2 md:space-y-5">
                <div className="text-md text-gray-800 mb-2 md:mb-0">
                  <div>
                    Date:{" "}
                    <strong className="text-gray-800">
                      {formatDate(slot.consultationDate)}
                    </strong>
                  </div>
                  <div>
                    From:
                    <strong className="text-gray-800">
                      {" "}
                      {formatTime(slot.consultationStartTime)}
                    </strong>
                  </div>
                  <div>
                    To:{" "}
                    <strong className="text-gray-800">
                      {" "}
                      {formatTime(slot.consultationEndTime)}
                    </strong>
                  </div>
                </div>
                <div className="flex border p-2 rounded-lg bg-green-600 text-white">
                  <p>
                    Booking Status : <span>{request.bookingStatus}</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
     
    </div>
  );
};

export default BookingDetails;
