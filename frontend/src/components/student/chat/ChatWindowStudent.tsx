import React, { useEffect, useState, useRef } from "react";
import { useStudentChat } from "../../../hooks/useStudentChat";
import socket from "../../../config/socket";
import { useAppSelector } from "../../../hooks/useTypeSelector";
import { IMessage } from "../../../@types/message";
import {
  getMessageByChatIdByStudent,
  sendMessageByStudent,
} from "../../../services/api/ChatApi";
import { IExpert } from "../../../@types/expert";
import { formatTime } from "../../../utils/generalFuncions";

const ChatWindow: React.FC = () => {
  const { chatId, setlatestMessage } = useStudentChat();
  const { user } = useAppSelector((state) => state.student);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [Expert, setExprt] = useState<IExpert>();
  const userId = user?._id;

  // Ref for the messages container
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!user || !chatId) return;

    const fetchMessages = async () => {
      try {
        const response = await getMessageByChatIdByStudent(chatId?.toString());
        setMessages(response.data.messages);
        setExprt(response.data.expertId);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    const handleReceiveMessage = (message: IMessage) => {
      if (message.senderId !== userId) {
        setMessages((prevMessages) => [...prevMessages, message]);
        if (message.text) {
          setlatestMessage(message.text);
        }
      }
    };

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server with id:", socket.id);
    });

    socket.on("receiveMessage", handleReceiveMessage);

    socket.emit("joinChat", { chatId, userId });

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [chatId, user, userId]);

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
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      chatContainerRef.current?.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col h-screen">
      {chatId ? (
        <div className="flex-1 flex flex-col">
          {Expert && (
            <div className="flex items-center bg-blue-950 h-16 text-white p-4">
              <div className="flex items-center max-w-11 h-11 rounded-full overflow-hidden ms-4">
                <img
                  src={Expert.profile_picture}
                  alt="userProfile"
                  className="w-11 h-11 object-cover rounded-full"
                />
              </div>
              <span className="ms-4 text-lg font-semibold">
                {Expert.user_name}
              </span>
            </div>
          )}

          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4  no-scrollbar"
            style={{ maxHeight: "calc(80vh - 120px)" }}
          >
            {messages.map((message) => (
              <div
                key={message._id}
                className={`flex  ${
                  message.senderId === userId ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex p-2 rounded-lg shadow mb-1 ${
                    message.senderId !== userId
                      ? "bg-green-200 text-right "
                      : "bg-gray-200 text-left"
                  }`}
                >
                  <p>{message.text}</p>
                  <span className="flex justify-end items-end mt-5  text-xs text-gray-500">
                    {formatTime(message.timestamp.toString())}
                  </span>
                </div>
              </div>
            ))}
            {/* Ref for scrolling */}
            <div ref={messagesEndRef} />
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
