import { useEffect, useState } from "react";
import { useExpertChat } from "../../../hooks/useExpertChat";
import { IStudent } from "../../../@types/user";
import { getChatByExpertId, getNotificationsByExpert } from "../../../services/api/ChatApi";
import { IChat, IMessage } from "../../../@types/message";
import { useAppSelector } from "../../../hooks/useTypeSelector";

const ChatWithStudentList = () => {
  const {expert}= useAppSelector(state=>state.expert)
  const [chatDetails, setChatDetails] = useState<IChat[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { chatId,setChatId, latestMessage, } = useExpertChat();
  const [notifications, setNotifications] = useState<{
    [chatId: string]: number;
  }>({});

  const fetchAllBooking = async () => {
    try {
      const result = await getChatByExpertId();
      setChatDetails(result.data);
      await fetchNotifications(result.data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };
  const fetchNotifications = async (chats: IChat[]) => {
    for (const chat of chats) {

      try {
        if(!expert) return
        const notificationData = await getNotificationsByExpert(
          chat._id,
          expert?._id,
        );
        if(!notificationData.data) return 
        setNotifications((prev) => ({
          ...prev,
          [chat._id]: notificationData.data.count,
        }));
      } catch (error) {
        console.error(
          `Failed to fetch notifications for chat ${chat._id}:`,
          error
        );
      }
    }
  };

  useEffect(() => {
    fetchAllBooking();
  }, []);


  const filteredChats = chatDetails.filter((chat) => {
    const student = chat.studentId as IStudent;
    return student.user_name.toLowerCase().includes(searchTerm.toLowerCase());
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
          const student = chat.studentId as IStudent;
          const lastMessage = chat.latestMessage as IMessage;
          const count = notifications[chat._id] || 0;

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
              <div className="flex items-center space-x-2">
                  <span className="font-semibold text-lg">
                    {student.user_name}
                  </span>
                  {count>0 && chat._id !== chatId && (
                    <span className="relative flex items-center justify-center w-8 h-8 bg-green-600 text-white font-bold rounded-full shadow-lg">
                      {chat._id === chatId
                        ? ""
                        : count && count > 0
                        ? count
                        : ""}
                      {/* {count > 0 && (
                      <div className="absolute -top-1 -right-1 text-xs bg-white text-red-600 rounded-full w-4 h-4 flex items-center justify-center">
                        {count}
                      </div>
                    )} */}
                    </span>
                  )}
                </div>
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
