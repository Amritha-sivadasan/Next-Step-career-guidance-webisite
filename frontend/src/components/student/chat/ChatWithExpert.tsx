import { useEffect, useState } from "react";
import { useStudentChat } from "../../../hooks/useStudentChat";
import { IExpert } from "../../../@types/expert";
import {
  getChatByStudnetId,
  getNotificationsByChatId,
} from "../../../services/api/ChatApi";
import { IChat, IMessage } from "../../../@types/message";
import { useAppSelector } from "../../../hooks/useTypeSelector";
import socket from "../../../config/socket";
import { IChatNotification } from "../../../@types/notification";

const ChatWithExpertList = () => {
  const { user } = useAppSelector((state) => state.student);
  const [ChatDetials, setChaDetails] = useState<IChat[]>([]);
  const { chatId, setChatId, latestMessage, notificationCount } =
    useStudentChat();
  const [notifications, setNotifications] = useState<{
    [chatId: string]: number;
  }>({});

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleNotification = (notification: IChatNotification) => {
      console.log('notification',notification)
      if(notification.userId==user?._id){
        setNotifications((prev) => ({
          ...prev,
          [notification.chatId]: notification.count,
        }));
      }

      }

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, [socket]);

  const fetchAllBooking = async () => {
    try {
      const result = await getChatByStudnetId();
      setChaDetails(result.data);
      await fetchNotifications(result.data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  const fetchNotifications = async (chats: IChat[]) => {
    for (const chat of chats) {
      try {
        if (!user) return;
        const notificationData = await getNotificationsByChatId(
          chat._id,
          user?._id
        );
        if (!notificationData.data) return;
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
    if (notificationCount) {
      setNotifications((prev) => ({
        ...prev,
        [notificationCount.chatId]: notificationCount.count,
      }));
    }
  }, [notificationCount]);

  useEffect(() => {
    fetchAllBooking();
  }, []);

  useEffect(() => {
    const sortedChats = ChatDetials.slice().sort((a, b) =>
      a._id === chatId ? -1 : b._id === chatId ? 1 : 0
    );
    setChaDetails(sortedChats);
  }, [chatId]);

  const filteredChats = ChatDetials.filter((chat: IChat) => {
    const expert = chat.expertId as IExpert;
    return expert.user_name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div
      className={`w-full md:w-2/6   bg-gray-100 p-4 h-full md:h-auto overflow-auto ${
        chatId ? "sm:hidden md:block" : ""
      }`}
    >
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
          const count = notifications[chat._id] || 0;

          return (
            <li
              key={expert._id}
              className="flex items-center rounded-lg px-2 mb-2 bg-white  shadow cursor-pointer hover:bg-gray-200"
              onClick={() => setChatId(chat._id)}
            >
              <img
                src={expert.profile_picture}
                alt={expert.user_name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div className="flex flex-col justify-between w-full p-2">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-lg">
                    {expert.user_name}
                  </span>

                  {count > 0 && chat._id !== chatId && (
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

                <span className="text-sm text-gray-500 mt-1">
                  {latestMessage && latestMessage.expertId == expert._id ? (
                    <>
                      {latestMessage.expertId == expert._id &&
                        latestMessage.lastMessage}
                    </>
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
