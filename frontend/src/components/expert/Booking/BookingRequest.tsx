import  { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // For Confirm and Cancel icons
import {
  confirmBooking,
  getAllBookingByExpertId,
  refundPayment,
} from "../../../services/api/bookingApi";
import { IBooking } from "../../../@types/booking";
import { IStudent } from "../../../@types/user";
import { ISlot } from "../../../@types/slot";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.VITE_STRIPE_PUBLISHABLE_KEY!);


const BookingRequest = () => {
  const [bookingRequests, setBookingRequests] = useState<IBooking[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      const result = await getAllBookingByExpertId();

      setBookingRequests(result.data);
    };
    fetchBookings();
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

  const handleConfirm = async (id: string) => {
    const status = "confirmed";

    const response = await confirmBooking(id, status);
    if (response.success) {
      toast.success("Booking Confirmed");
      navigate("/expert/booking-details");
    }
  };

  const handleCancel =async (id: string) => {
    const stripe = await stripePromise;
    const response = await refundPayment(id)

    const result = await stripe?.redirectToCheckout({
      sessionId: response.data.sessionId,
    });
    if (result?.error) {
      toast.error(
        result.error.message ||
          "An error occurred while redirecting to Stripe"
      );
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Booking Requests</h1>
      <div className="space-y-4">
        {bookingRequests.map((request) => {
          const student = request.studentId as IStudent;
          const slot = request.slotId as ISlot;

          return (
            <div
              key={request._id}
              className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-white shadow-md rounded-lg h-auto"
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
                <div className="flex space-x-4">
                  <button
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    onClick={() => handleConfirm(request?._id)}
                  >
                    <FaCheckCircle className="mr-2" />
                    Confirm
                  </button>
                  <button
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    onClick={() => handleCancel(request._id)}
                  >
                    <FaTimesCircle className="mr-2" />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingRequest;
