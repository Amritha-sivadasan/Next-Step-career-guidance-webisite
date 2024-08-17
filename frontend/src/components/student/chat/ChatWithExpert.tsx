import { useEffect, useState } from "react";
import { useStudentChat } from "../../../hooks/useStudentChat";
import { IExpert } from "../../../@types/expert";
import { getChatByStudnetId } from "../../../services/api/ChatApi";
import { IChat } from "../../../@types/message";

const ChatWithExpertList = () => {
  const [ChatDetials, setChaDetails] = useState<IChat[]>([]);
  const { setChatId } = useStudentChat();

  const fetchAllBooking = async () => {
    try {
      const result = await getChatByStudnetId();
      setChaDetails((prev) => [...prev, ...result.data]);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };
  useEffect(() => {
    fetchAllBooking();
  }, []);

  return (
    <div className="w-1/4 bg-gray-100 p-4  ">
      <input
        type="text"
        placeholder="Search"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <ul>
        {ChatDetials.map((chat) => {
          const expert = chat.expertId as IExpert;

          return (
            <li
              key={expert._id}
              className="flex items-center p-3 mb-2 bg-white rounded shadow cursor-pointer hover:bg-gray-200"
              onClick={() => setChatId(chat._id)}
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
