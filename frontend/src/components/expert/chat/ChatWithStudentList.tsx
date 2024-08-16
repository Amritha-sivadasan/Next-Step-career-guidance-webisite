import { useEffect, useState } from "react";
import { IBooking } from "../../../@types/booking";
import { getConfirmBooking } from "../../../services/api/bookingApi";
import { useExpertChat } from "../../../hooks/useExpertChat";
import { IStudent } from "../../../@types/user";

const ChatWithStudentList = () => {
  const [bookingDetails, setBookingDetails] = useState<IBooking[]>([]);
  const [currentPage] = useState(1);
  const { setSelectedStudentId } = useExpertChat();

  const itemsPerPage = 3;

  const fetchAllBooking = async (page: number) => {
    try {
      const result = await getConfirmBooking(page, itemsPerPage);
      setBookingDetails((prev) => [...prev, ...result.data]);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  useEffect(() => {
    fetchAllBooking(currentPage);
  }, [currentPage]);

  return (
    <div className="w-1/4 bg-gray-100  p-4 mt-3 ">
      <input
        type="text"
        placeholder="Search"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <ul>
        {bookingDetails.map((booking) => {
          const student = booking.studentId as IStudent;

          return (
            <li
              key={student._id}
              className="flex items-center p-3 mb-2 bg-white rounded shadow cursor-pointer hover:bg-gray-200"
              onClick={() => setSelectedStudentId(student._id)}
            >
              <img
                src={student.profile_picture}
                alt={student.user_name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div className="flex justify-between w-full">
                <span className="font-semibold">{student.user_name}</span>
                <span className="text-sm text-gray-500">18:18</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatWithStudentList;
