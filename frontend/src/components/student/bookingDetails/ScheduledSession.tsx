import { useEffect, useState } from "react";
import { getAllBookingDetailsByStudentId } from "../../../services/api/bookingApi";
import { IBooking } from "../../../@types/booking";
import { ISlot } from "../../../@types/slot";
import { IExpert } from "../../../@types/expert";
import { formatDate, formatTime } from "../../../utils/generalFuncions";






const ScheduledSession = () => {
  const [bookingDetails, setBookingDetails] = useState<IBooking[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 3;

  const fetchAllBooking = async (page: number) => {
    try {
      const result = await getAllBookingDetailsByStudentId(page, itemsPerPage);
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
    fetchAllBooking(currentPage);
  }, [currentPage]);

  const handleViewMore = () => {
    if (hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  return (
    <div className="p-4 min-h-screen bg-white rounded-lg w-10/12">
      <div className="bg-blue-950 h-32 mb-9 rounded-xl flex items-center justify-center">
        <h1 className="text-2xl font-bold mb-4 text-white">Booking Details</h1>
      </div>
      <div className="space-y-4 ">
        {bookingDetails.length === 0 ? (
          <p className="text-gray-600 text-center">No bookings here</p>
        ) : (
          bookingDetails.map((request) => {
            const Expert = request.expertId as IExpert;
            const slot = request.slotId as ISlot;

            return (
              <div
                key={request._id}
                className="flex flex-col border md:flex-row items-start md:items-center justify-between p-4 shadow-md rounded-lg h-auto"
              >
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <img
                    src={Expert?.profile_picture}
                    alt="Student"
                    className="h-28 w-28 rounded-lg object-cover"
                  />
                  <div className="text-lg text-gray-800">
                    <div className="font-semibold"> {Expert.user_name}</div>
                    <div className="text-sm text-gray-600">
                      <p>{Expert.subCatName}</p>
                    </div>

                    <div className="text-sm text-gray-600">
                      <p>{Expert.educationBackground}</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>₹{Expert.consultation_fee}</p>
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
                  <div
                    className={`flex border p-2 rounded-lg text-white ${
                      request.bookingStatus === "confirmed"
                        ? "bg-green-600"
                        : request.bookingStatus === "cancelled"
                        ? "bg-red-800"
                        : request.bookingStatus === "rescheduled"
                        ? "bg-yellow-600"
                        : "bg-gray-600"
                    }`}
                  >
                    <p>
                      Booking Status : <span>{request.bookingStatus}</span>
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
    </div>
  );
};

export default ScheduledSession;
