import { useEffect, useState } from "react";
import { IBooking } from "../../../@types/booking";
import { getAllBookingDetailsByStudentId } from "../../../services/api/bookingApi";
import { IExpert } from "../../../@types/expert";
import { ISlot } from "../../../@types/slot";

const ChatWithExpertList = () => {
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
    <div className="flex justify-center items-center w-full h-screen bg-gray-50">
      <div className="w-full h-full max-w-md bg-white shadow-lg border-r overflow-y-scroll">
        <h2 className="text-xl font-semibold p-4 border-b">
          Chat with Experts
        </h2>
        <ul className="divide-y divide-gray-200">
          {bookingDetails.map((item) => {
            const expert = item.expertId as IExpert;
            const slot = item.slotId as ISlot;

            return (
              <li
                key={item._id}
                className="p-4 flex items-center hover:bg-gray-200 cursor-pointer"
              >
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {expert?.user_name?.charAt(0).toUpperCase()}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium">
                    {expert?.user_name || "Unknown Expert"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Last interaction: {slot?.consultationStartTime} -{" "}
                    {slot?.consultationEndTime}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
        {hasMore && (
          <button
            onClick={handleViewMore}
            className="w-full py-2 bg-blue-500 text-white text-center mt-4"
          >
            View More
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatWithExpertList;
