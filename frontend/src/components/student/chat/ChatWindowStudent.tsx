import React, { useEffect, useState, useRef } from "react";
import { useStudentChat } from "../../../hooks/useStudentChat";
import socket from "../../../config/socket";
import { useAppSelector } from "../../../hooks/useTypeSelector";
import { IMessage } from "../../../@types/message";
import {
  getMessageByChatIdByStudent,
  sendMessageByStudent,
  deleteMessageByStudent,
} from "../../../services/api/ChatApi";
import { IExpert } from "../../../@types/expert";
import { formatTime } from "../../../utils/generalFuncions";
import { FiTrash2 } from "react-icons/fi";
import ConfirmationModal from "../../common/modal/ConfirmationModal";
import { MdOutlineDoNotDisturb } from "react-icons/md";

const ChatWindow: React.FC = () => {
  const { chatId, setlatestMessage, setNotificationCount } = useStudentChat();
  const { user } = useAppSelector((state) => state.student);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [Expert, setExprt] = useState<IExpert>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null
  );
  const [lastMessage, setLastMessage] = useState<string>("");
  const [isChatActive, setIsChatActive] = useState(false);
  // const [notificationCount, setNotificationCount] = useState(0);

  const userId = user?._id;

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const isAutoScroll = useRef(true);

  useEffect(() => {
    if (!user) return;

    const fetchMessages = async () => {
      try {
        if (!chatId) return;
        const response = await getMessageByChatIdByStudent(chatId?.toString());
        setMessages(response.data.messages);
        setExprt(response.data.expertId);
        setLastMessage(response.data.latestMessage);
        setNotificationCount(0);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    const handleReceiveMessage = async (message: IMessage) => {
      if (message.senderId !== userId) {
        setMessages((prevMessages) => [...prevMessages, message]);
        if (message.text) {
          setlatestMessage(message.text);
        }

        if (!isChatActive) {
          setNotificationCount((prev: number) => prev + 1);
        }
      }
    };

    const handleDeleteMessage = (messageId: string) => {
      if (messageId == lastMessage) {
        setlatestMessage("Deleted message");
      }

      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message._id == messageId ? { ...message, is_delete: true } : message
        )
      );
    };
    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("messageDeleted", handleDeleteMessage);

    socket.emit("joinChat", { chatId, userId });

    return () => {
      socket.emit("leaveChat", { chatId, userId });
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("messageDeleted", handleDeleteMessage);
    };
  }, [chatId, lastMessage, setlatestMessage, user, userId]);

  useEffect(() => {
    if (chatId) {
      setIsChatActive(true);
    } else {
      setIsChatActive(false);
    }
  }, [chatId]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const message = {
      chatId: chatId?.toString(),
      text: newMessage,
      senderId: userId,
      timestamp: new Date(),
    };

    try {
      const response = await sendMessageByStudent(message);
      setMessages((prev) => [...prev, response.data]);
      socket.emit("sendMessage", { chatId, message });
      setNewMessage("");
      setlatestMessage(newMessage);
      setLastMessage(response.data._id);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const openDeleteConfirmationModal = (messageId: string) => {
    setSelectedMessageId(messageId);
    setIsModalOpen(true);
  };

  const deleteMessage = async (messageId: string) => {
    try {
      if (messageId == lastMessage) {
        setlatestMessage("Deleted message");
      }
      await deleteMessageByStudent(messageId);
      socket.emit("deleteMessage", { chatId, messageId });
      setMessages((prevMessages) => {
        const updatedMessages = prevMessages.map((message) =>
          message._id == messageId ? { ...message, is_delete: true } : message
        );
        if (
          updatedMessages.length === 1 &&
          updatedMessages[0]._id === messageId
        ) {
          return [
            {
              ...updatedMessages[0],
              text: "This message was deleted",
              is_delete: true,
            },
          ];
        }
        return updatedMessages;
      });
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer && isAutoScroll.current) {
      chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: "smooth",
      });
      isAutoScroll.current = false;
    }
  }, [messages]);

  const handleScroll = () => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainer;
      if (scrollHeight - scrollTop > clientHeight + 50) {
        isAutoScroll.current = false;
      } else {
        isAutoScroll.current = true;
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen">
      {chatId ? (
        <div className="flex-1 flex flex-col">
          {Expert && (
            <div className="flex  items-center bg-blue-950 h-16 text-white p-4">
              <div className="flex items-center max-w-11 h-11 rounded-full overflow-hidden ms-4">
                <img
                  src={Expert.profile_picture}
                  alt="userProfile"
                  className="w-11 h-11 object-cover rounded-full"
                />
              </div>
              <div className="ms-4 flex flex-col">
                <span className=" text-lg font-semibold">
                  {Expert.user_name}
                </span>
              </div>
            </div>
          )}

          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 no-scrollbar"
            style={{ maxHeight: "calc(80vh - 120px)" }}
            onScroll={handleScroll}
          >
            {messages.map((message) => (
              <div
                key={message._id}
                className={`group flex ${
                  message.senderId === userId ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`relative flex p-2 rounded-lg shadow mb-1 ${
                    message.senderId !== userId
                      ? "bg-green-200 text-right"
                      : "bg-gray-200 text-left"
                  }`}
                >
                  <p>
                    {message.is_delete ? (
                      <>
                        {" "}
                        <span className="flex text-gray-500 gap-1">
                          <span className="mt-1">
                            {" "}
                            <MdOutlineDoNotDisturb size={18} />
                          </span>
                          This message was deleted
                        </span>
                      </>
                    ) : (
                      message.text
                    )}
                  </p>
                  <span className="flex justify-end items-end mt-5 text-xs text-gray-500">
                    {formatTime(message.timestamp.toString())}
                  </span>

                  {/* Delete Button only for current user's messages */}
                  {message.senderId === userId && !message.is_delete && (
                    <button
                      className="absolute top-0 right-0 mt-1 mr-1 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => openDeleteConfirmationModal(message._id)}
                    >
                      <FiTrash2 />
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
            <ConfirmationModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onConfirm={() => {
                if (selectedMessageId) {
                  deleteMessage(selectedMessageId);
                }
                setIsModalOpen(false);
              }}
              messageId={selectedMessageId || ""}
            />
          </div>
          <div className="p-4 bg-blue-950 border-t border-gray-300 mt-7">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                className="flex-1 p-2 border rounded-lg focus:outline-none"
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                onClick={sendMessage}
                className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>Please select a user to chat with</div>
      )}
    </div>
  );
};

export default ChatWindow;
