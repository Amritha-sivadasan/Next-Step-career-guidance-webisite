// src/components/ChatWindow.tsx

import React, { useEffect, useState, useRef } from "react";
import { useExpertChat } from "../../../hooks/useExpertChat";
import { useAppSelector } from "../../../hooks/useTypeSelector";
import { IMessage } from "../../../@types/message";
import socket from "../../../config/socket";
import {
  getMessageByChatIdExpert,
  sendMessageByExpert,
} from "../../../services/api/ChatApi";
import { IStudent } from "../../../@types/user";
import { formatTime } from "../../../utils/generalFuncions";

const ChatWindowExpert: React.FC = () => {
  const { chatId, setlatestMessage } = useExpertChat();
  const { expert } = useAppSelector((state) => state.expert);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [student, setStudent] = useState<IStudent>();
  const userId = expert?._id;

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!expert) {
      return;
    }

    const fetchMessage = async () => {
      if (chatId) {
        const response = await getMessageByChatIdExpert(chatId?.toString());
        setMessages(response.data.messages);
        setStudent(response.data.studentId);
      }
    };
    fetchMessage();
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

    if (chatId) {
      socket.emit("joinChat", { chatId, userId });
    }
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [chatId, expert, userId]);

  const sendMessage = async () => {
    const message = {
      chatId: chatId?.toString(),
      text: newMessage,
      senderId: userId,
      timestamp: new Date(),
    };

    const reponse = await sendMessageByExpert(message);
    setMessages((prev) => [...prev, reponse.data]);
    socket.emit("sendMessage", { chatId, message });
    setNewMessage("");
    setlatestMessage(newMessage);
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
          {student && (
            <div className="flex items-center bg-blue-950 h-16 text-white p-4">
              <div className="flex items-center max-w-11 h-11 rounded-full overflow-hidden ms-4">
                <img
                  src={student.profile_picture}
                  alt="userProfile"
                  className="w-11 h-11 object-cover rounded-full"
                />
              </div>
              <span className="ms-4 text-lg font-semibold">
                {student.user_name}
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
                className={`flex ${
                  message.senderId === userId ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex p-2 rounded-lg shadow mb-1 ${
                    message.senderId !== userId
                      ? "bg-green-200 text-right"
                      : "bg-gray-200 text-left"
                  }`}
                >
                  <p>{message.text}</p>
                  <span className="flex justify-end items-end mt-5 text-xs text-gray-500 ms-2">
                    {formatTime(message.timestamp.toString())}
                  </span>
                </div>
              </div>
            ))}
            {/* Ref for scrolling */}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 bg-blue-950 border-t border-gray-300">
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

export default ChatWindowExpert;
