import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBookingByIdAdmin } from "../../../services/api/adminApi";
import { IBooking } from "../../../@types/booking";
import { IStudent } from "../../../@types/user";
import { IExpert } from "../../../@types/expert";
import { ISlot } from "../../../@types/slot";
import { formatDate, formatTime } from "../../../utils/generalFuncions";

const BookingDetailsView = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState<IBooking | null>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      if (bookingId) {
        const response = await fetchBookingByIdAdmin(bookingId);
        setBooking(response.data);
      }
    };
    fetchBooking();
  }, [bookingId]);

  return (
    <div className="min-h-screen bg-gray-100 flex w-full justify-center ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mt-10">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Booking Details
        </h1>

        <div className="bg-blue-50 p-4 rounded-lg h-60 flex flex-wrap justify-between space-y-4 sm:space-y-0 items-center">
          <div className="w-full sm:w-1/3">
            <p className="text-gray-600 mb-8">
              <span className="font-semibold">Booking id :</span> {booking?._id}
            </p>
            <p className="text-gray-600 mb-8">
              <span className="font-semibold">User Name:</span>{" "}
              {booking?.studentId && (booking.studentId as IStudent).user_name}
            </p>
            <p className="text-gray-600 mb-8">
              <span className="font-semibold">Expert Name:</span>{" "}
              {booking?.expertId && (booking.expertId as IExpert).user_name}
            </p>
          </div>
          <div className="w-full sm:w-1/3">
            <p className="text-gray-600 mb-8">
              <span className="font-semibold">Category:</span>{" "}
              {booking?.slotId && (booking.slotId as ISlot)._id}
            </p>
            <p className="text-gray-600 mb-8">
              <span className="font-semibold">Amount:</span>
              {booking?.paymentAmount}
            </p>
            <p className="text-gray-600 mb-8">
              <span className="font-semibold">Payment status:</span>{" "}
              <span className="px-2 py-1 bg-green-500 text-white rounded-full">
                {booking?.paymentStatus}
              </span>
            </p>
          </div>
          <div className="w-full sm:w-1/3 ">
            <p className="text-gray-600 mb-8">
              <span className="font-semibold">Sub-category:</span>{" "}
              {booking?.expertId && (booking.expertId as IExpert).subCatName}
            </p>
            <p className="text-gray-600 mb-8">
              <span className="font-semibold">Date:</span>
              {booking?.slotId &&
                formatDate((booking.slotId as ISlot).consultationDate)}
            </p>
            <p className="text-gray-600 mb-8">
              <span className="font-semibold">Time:</span>
              {booking?.slotId &&
                formatTime((booking.slotId as ISlot).consultationStartTime)}
              -
              {booking?.slotId &&
                formatTime((booking.slotId as ISlot).consultationEndTime)}
            </p>
            <p className="text-gray-600 mb-8">
              <span className={`font-semibold `}>Meeting Status:</span>{" "}
              <span
                className={`px-2 py-2 rounded-lg ${
                  booking?.meetingStatus == "pending"
                    ? "bg-orange-300"
                    : "bg-green-600"
                }`}
              >
                {booking?.meetingStatus}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsView;
