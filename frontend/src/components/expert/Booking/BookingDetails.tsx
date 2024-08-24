import { useEffect, useState } from "react";
import {
  getConfirmBooking,
  refundPayment,
} from "../../../services/api/bookingApi";
import { IBooking } from "../../../@types/booking";
import { IStudent } from "../../../@types/user";
import { ISlot } from "../../../@types/slot";
import { FaTimesCircle } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../hooks/useTypeSelector";
import { createVideoCall } from "../../../services/api/videoCallApi";

const stripePromise = loadStripe(process.env.VITE_STRIPE_PUBLISHABLE_KEY!);

const BookingDetails = () => {
  const {expert}= useAppSelector(state=>state.expert)
  const [bookingDetails, setBookingDetails] = useState<IBooking[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showCancelForm, setShowCancelForm] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [urlToSend, setUrlToSend] = useState("");
  const itemsPerPage = 3;

  const fetchConfirmBooking = async (page: number) => {
    try {
      const result = await getConfirmBooking(page, itemsPerPage);
      if (result.data.length === 0) {
        setHasMore(false);
      } else {
        setBookingDetails((prev) => [...prev, ...result.data]);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  useEffect(() => {
    fetchConfirmBooking(currentPage);
  }, [currentPage]);

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

  const handleViewMore = () => {
    if (hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleCancel = (id: string) => {
    setCurrentBookingId(id);
    setShowCancelForm(true);
  };

  const handleCancelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentBookingId && cancelReason) {
      try {
        const stripe = await stripePromise;
        const response = await refundPayment(currentBookingId, cancelReason);

        const result = await stripe?.redirectToCheckout({
          sessionId: response.data.sessionId,
        });
        if (result?.error) {
          toast.error(
            result.error.message ||
              "An error occurred while redirecting to Stripe"
          );
        } else {
          setShowCancelForm(false);
          setCancelReason("");
        }
      } catch (error) {
        console.error("Failed to cancel booking:", error);
        toast.error("Failed to cancel booking. Please try again.");
      }
    }
  };
  const handleSendUrl = async(id:string) => {
    if (urlToSend) {
     const videocallDetails={
      expertId:expert?._id,
      bookingId:id,
      url:urlToSend,

     }

     const response= await createVideoCall(videocallDetails)
     console.log(response)
      
      console.log("URL to send:", urlToSend, id);
      setUrlToSend(""); 
    }
  };

  return (
    <div className="p-4 min-h-screen bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Booking Details</h1>
      <div className="space-y-4">
        {bookingDetails.length === 0 ? (
          <p className="text-gray-600 text-center">No bookings here</p>
        ) : (
          bookingDetails.map((request) => {
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
                      Education Level:{" "}
                      <strong>{student.education_level}</strong>
                    </div>
                    <div className="text-sm text-gray-600">
                      Education Background :{" "}
                      <strong>{student.education_background}</strong>
                    </div>
                    <div className="mt-4 flex items-center space-x-3">
                      <input
                        type="text"
                        placeholder="Enter URL"
                        value={urlToSend}
                        onChange={(e) => setUrlToSend(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg p-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => handleSendUrl(request._id)}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition duration-300 ease-in-out"
                      >
                        Send URL
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-col items-start md:items-center justify-between space-y-2 md:space-y-5">
                  <div className="text-md text-gray-800 mb-2 md:mb-0">
                    <div className="flex justify-end mb-2">
                      {request.bookingStatus == "confirmed" && (
                        <button
                          className="flex items-center px-4 py-1 bg-gray-400 text-white rounded-lg hover:bg-red-700"
                          onClick={() => handleCancel(request._id)}
                        >
                          Cancel
                          <FaTimesCircle className="ml-2" />
                        </button>
                      )}
                    </div>
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
                  <div>
                    <p>
                      Booking Status :{" "}
                      <span
                        className={` border p-2 rounded-lg text-white ${
                          request.bookingStatus === "confirmed"
                            ? "bg-green-600"
                            : request.bookingStatus === "cancelled"
                            ? "bg-red-800"
                            : request.bookingStatus === "rescheduled"
                            ? "bg-yellow-600"
                            : "bg-gray-600"
                        }`}
                      >
                        {request.bookingStatus}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleViewMore}
            className="px-4 py-2 bg-blue-950 text-white rounded-lg shadow hover:bg-blue-900"
          >
            View More
          </button>
        </div>
      )}

      {showCancelForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
            <h2 className="text-xl font-semibold mb-4">Cancel Booking</h2>
            <form onSubmit={handleCancelSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="cancelReason"
                  className="block text-gray-700 mb-2"
                >
                  Cancellation Reason
                </label>
                <textarea
                  id="cancelReason"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowCancelForm(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetails;
