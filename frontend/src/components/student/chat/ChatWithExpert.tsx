import { useEffect, useState } from "react";
import { IBooking } from "../../../@types/booking";
import { getAllBookingDetailsByStudentId } from "../../../services/api/bookingApi";
import { useStudentChat } from "../../../hooks/useStudentChat";
import { IExpert } from "../../../@types/expert";

const ChatWithExpertList = () => {
  const [bookingDetails, setBookingDetails] = useState<IBooking[]>([]);
  const [currentPage] = useState(1);
  const itemsPerPage = 10;
  const { setSelectedExpertId } = useStudentChat();

  const fetchAllBooking = async (page: number) => {
    try {
      const result = await getAllBookingDetailsByStudentId(page, itemsPerPage);
      setBookingDetails((prev) => [...prev, ...result.data]);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  useEffect(() => {
    fetchAllBooking(currentPage);
  }, [currentPage]);

  return (
    <div className="w-1/4 bg-gray-100 p-4 mt-3 ">
      <input
        type="text"
        placeholder="Search"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <ul>
        {bookingDetails.map((booking) => {
          const expert = booking.expertId as IExpert;

          return (
            <li
              key={expert._id}
              className="flex items-center p-3 mb-2 bg-white rounded shadow cursor-pointer hover:bg-gray-200"
              onClick={() => setSelectedExpertId(expert._id)}
            >
              <img
                src={expert.profile_picture}
                alt={expert.user_name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div className="flex justify-between w-full">
                <span className="font-semibold">{expert.user_name}</span>
                <span className="text-sm text-gray-500">18:18</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatWithExpertList;
