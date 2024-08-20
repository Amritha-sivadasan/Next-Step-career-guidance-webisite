import { useEffect, useState } from "react";
import { useStudentChat } from "../../../hooks/useStudentChat";
import { IExpert } from "../../../@types/expert";
import { getChatByStudnetId } from "../../../services/api/ChatApi";
import { IChat, IMessage } from "../../../@types/message";

const ChatWithExpertList = () => {
  const [ChatDetials, setChaDetails] = useState<IChat[]>([]);
  const { setChatId, latestMessage } = useStudentChat();
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredChats = ChatDetials.filter((chat: IChat) => {
    const expert = chat.expertId as IExpert;
    return expert.user_name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="w-1/4 bg-gray-100 p-4">
      <input
        type="search"
        placeholder="Search"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredChats.map((chat) => {
          const expert = chat.expertId as IExpert;
          const lastMessage = chat.latestMessage as IMessage;

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
              <div className="flex flex-col justify-between w-full">
                <span className="font-semibold">{expert.user_name}</span>
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

export default ChatWithExpertList;
