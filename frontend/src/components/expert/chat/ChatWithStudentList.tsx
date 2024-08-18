import { useEffect, useState } from "react";

import { useExpertChat } from "../../../hooks/useExpertChat";
import { IStudent } from "../../../@types/user";
import { getChatByExpertId } from "../../../services/api/ChatApi";
import { IChat, IMessage } from "../../../@types/message";

const ChatWithStudentList = () => {
  const [chatDetails, setChatDetails] = useState<IChat[]>([]);
  const { setChatId, latestMessage } = useExpertChat();

  const fetchAllBooking = async () => {
    try {
      const result = await getChatByExpertId();
      setChatDetails((prev) => [...prev, ...result.data]);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  useEffect(() => {
    fetchAllBooking();
  }, []);

  return (
    <div className="w-1/4 bg-gray-100  p-4  ">
      <input
        type="text"
        placeholder="Search"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <ul>
        {chatDetails.map((chat) => {
          const student = chat.studentId as IStudent;
          const lastMessage = chat.latestMessage as IMessage;

          return (
            <li
              key={student._id}
              className="flex items-center p-3 mb-2 bg-white rounded shadow cursor-pointer hover:bg-gray-200"
              onClick={() => setChatId(chat._id)}
            >
              <img
                src={student.profile_picture}
                alt={student.user_name}
                className="w-14 h-10 rounded-full mr-3"
              />
              <div className="flex flex-col justify-between w-full">
                <span className="font-semibold">{student.user_name}</span>
                <span className="text-sm text-gray-500">
                  {latestMessage ? (
                    latestMessage
                  ) : (
                    <>
                      {lastMessage
                        ? lastMessage.is_delete
                          ? "Deleted message"
                          : lastMessage.text
                        : ""}
                    </>
                  )}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatWithStudentList;
