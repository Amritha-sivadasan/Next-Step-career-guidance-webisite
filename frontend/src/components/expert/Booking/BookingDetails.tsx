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
import {
  createVideoCall,
  updateVideoCall,
  getVideoCallDetails,
  sendNotification,
} from "../../../services/api/videoCallApi";
import { IvidoeCall } from "../../../@types/videoCall";
import { requestFCMToken } from "../../../config/firebase";
import { formatDate, formatTime } from "../../../utils/generalFuncions";
import ClipLoader from "react-spinners/ClipLoader";
// import { generateToken, onMessageListener } from "../../../config/firebase";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY!);

const BookingDetails = () => {
  const { expert } = useAppSelector((state) => state.expert);
  const [bookingDetails, setBookingDetails] = useState<IBooking[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showCancelForm, setShowCancelForm] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [urlInputs, setUrlInputs] = useState<Record<string, string>>({});
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [videoCallDetails, setVideoCallDetails] = useState<
    Record<string, IvidoeCall>
  >({});

  const itemsPerPage = 3;

  useEffect(() => {
    const fetchFcmToken = async () => {
      try {
        const token = await requestFCMToken();
        setFcmToken(token!);
        console.log("token:->", token);
      } catch (error) {
        console.log("error during fetch fcm token", error);
      }
    };
    fetchFcmToken();
  }, []);

  const fetchConfirmBooking = async (page: number) => {
    try {
      const result = await getConfirmBooking(page, itemsPerPage);
      if (result.data.length === 0) {
        setHasMore(false);
      } else {
        setBookingDetails((prev) => [...prev, ...result.data]);
        const bookingIds = result.data.map((booking: IBooking) => booking._id);
        bookingIds.forEach(async (bookingId: string) => {
          try {
            const videoCallResult = await getVideoCallDetails(bookingId);

            setVideoCallDetails((prev) => ({
              ...prev,
              [bookingId]: videoCallResult.data,
            }));
          } catch (error) {
            console.error(
              `Failed to fetch video call details for ${bookingId}:`,
              error
            );
          }
        });
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  useEffect(() => {
    fetchConfirmBooking(currentPage);
  }, [currentPage]);

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

  const handleCreateVideoCall = async (
    bookingId: string,
    studentId: string
  ) => {
    const url = urlInputs[bookingId];
    if (url) {
      const videocallDetails = {
        expertId: expert?._id,
        bookingId: bookingId,
        studentId: studentId,
        url: url,
      };

      await localStorage.setItem("bookingId", bookingId);
      setLoading(true);
      try {
        const response = await createVideoCall(videocallDetails);
        const newVideoCallDetails = response.data;
        setVideoCallDetails((prevDetails) => ({
          ...prevDetails,
          [bookingId]: newVideoCallDetails,
        }));
        setUrlInputs((prevInputs) => ({
          ...prevInputs,
          [bookingId]: url,
        }));
        setLoading(false);
        toast.success("Video call URL created successfully.");
        setUrlInputs((prevInputs) => ({ ...prevInputs, [bookingId]: "" }));
        const title = "Next Step meeting Link";
        const body = "Your meeeting link is share to  email ";
        const role = "student";
        const result = await sendNotification(title, body, fcmToken!, role);
        console.log("result for notification ", result);
      } catch (error) {
        setLoading(false);
        console.error("Failed to create video call:", error);
        toast.error("Failed to create video call. Please try again.");
      }
    }
  };

  const handleUpdateVideoCall = async (id: string) => {
    const url = urlInputs[id];
    if (url) {
      const update = {
        url: url,
      };
      const existUrl = videoCallDetails[id];
      if (existUrl.url == url) {
        setIsEditing(null);
        return;
      }
      await localStorage.setItem("bookingId", id);

      try {
        const response = await updateVideoCall(id, update);
        const newVideoCallDetails = response.data;
        setVideoCallDetails((prevDetails) => ({
          ...prevDetails,
          [id]: newVideoCallDetails,
        }));
        const title = "Next Step meeting Link";
        const body = "Your meeeting link is share to  email ";
        const role = "student";
        const result = await sendNotification(title, body, fcmToken!, role);
        console.log("result for notification ", result);
        toast.success("Video call URL updated successfully.");
        setIsEditing(null);
      } catch (error) {
        console.error("Failed to update video call:", error);
        toast.error("Failed to update video call. Please try again.");
      }
    }
  };

  const handleEdit = (id: string) => {
    setIsEditing(id);
    setUrlInputs((prevInputs) => ({
      ...prevInputs,
      [id]: videoCallDetails[id]?.url || "",
    }));
  };

  return (
    <div className="p-4 min-h-screen bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Booking Details</h1>
      {/* {notification?.title && (
        <div className="notification-popup">
          <h4>{notification.title}</h4>
          <p>{notification.body}</p>
        </div>
      )} */}
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
                className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-[#F2F2F2] shadow-md rounded-lg h-auto"
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
                      {videoCallDetails[request._id] && !isEditing ? (
                        <>
                          <span className="text-sm text-gray-700">
                            {videoCallDetails[request._id].url}
                          </span>
                          <button
                            onClick={() => handleEdit(request._id)}
                            className="px-4 py-2 bg-gray-300 text-sm font-semibold rounded-lg shadow-md hover:bg-gray-400 transition duration-300 ease-in-out"
                          >
                            Edit URL
                          </button>
                        </>
                      ) : (
                        <>
                          {request.bookingStatus !== "cancelled" && (
                            <>
                              {" "}
                              <input
                                type="text"
                                placeholder="Enter URL"
                                value={urlInputs[request._id] || ""}
                                onChange={(e) =>
                                  setUrlInputs((prevInputs) => ({
                                    ...prevInputs,
                                    [request._id]: e.target.value,
                                  }))
                                }
                                className="flex-1 border border-gray-300 rounded-lg p-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              <button
                                onClick={() =>
                                  isEditing
                                    ? handleUpdateVideoCall(request._id)
                                    : handleCreateVideoCall(
                                        request._id,
                                        student._id
                                      )
                                }
                                disabled={loading}
                                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition duration-300 ease-in-out"
                              >
                                {loading ? (
                                  <ClipLoader size={20} color="#fff" />
                                ) : isEditing ? (
                                  "Update URL"
                                ) : (
                                  "Send URL"
                                )}
                              </button>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-col items-start md:items-center justify-between space-y-2 md:space-y-5">
                  <div className="text-md text-gray-800 mb-2 md:mb-0">
                    <div className="flex sm:just justify-end mb-2">
                      {request.bookingStatus == "confirmed" && (
                        <button
                          className="flex  items-center px-4 py-1 bg-gray-400 text-white rounded-lg hover:bg-red-700"
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
                    <div>
                      Meetign Status:{" "}
                      <strong className="text-gray-800">
                        {" "}
                        {request.meetingStatus}
                      </strong>
                    </div>
                  </div>
                  <div>
                    <p>
                      Booking Status :{" "}
                      <span
                        className={` border p-2 rounded-lg text-white ${
                          request.bookingStatus === "completed"
                            ? "bg-green-600"
                            : request.bookingStatus === "confirmed"
                            ? "bg-green-600"
                            : request.bookingStatus === "canceled"
                            ? "bg-red-600"
                            : "bg-yellow-600"
                        }`}
                      >
                        {" "}
                        {request.bookingStatus}{" "}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {hasMore && bookingDetails.length > 0 && (
        <div className="text-center mt-4">
          <button
            onClick={handleViewMore}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition duration-300 ease-in-out"
          >
            View More
          </button>
        </div>
      )}

      {showCancelForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Cancel Booking</h2>
            <h3>
              Please note:{" "}
              <span className="text-red-700">
                {" "}
                By clicking 'Submit,' you will automatically initiate the refund
                payment process.
              </span>
            </h3>
            <form onSubmit={handleCancelSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="cancelReason"
                  className="block text-sm font-medium text-gray-700"
                >
                  Reason for Cancellation:
                </label>
                <textarea
                  id="cancelReason"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 mt-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  required
                ></textarea>
              </div>
              <div className="flex justify-end space-x-4  ">
                <button
                  type="button"
                  onClick={() => setShowCancelForm(false)}
                  className="px-4 py-2 bg-gray-300   text-gray-700 text-sm font-semibold rounded-lg shadow-md hover:bg-gray-400 transition duration-300 ease-in-out"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white text-sm font-semibold rounded-lg shadow-md hover:from-red-600 hover:to-red-800 transition duration-300 ease-in-out"
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
