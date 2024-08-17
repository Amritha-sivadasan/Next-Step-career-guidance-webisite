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

const ChatWindowExpert: React.FC = () => {
  const { chatId } = useExpertChat();
  const { expert } = useAppSelector((state) => state.expert);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
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
      }
    };
    fetchMessage();
    const handleReceiveMessage = (message: IMessage) => {
      if (message.senderId !== userId) {
        setMessages((prevMessages) => [...prevMessages, message]);
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
          <div className="mb-1 text-white cursor-pointer bg-blue-950 h-20">
            user name
          </div>

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
                  className={`p-3 rounded-lg shadow ${
                    message.senderId !== userId
                      ? "bg-green-200 text-right"
                      : "bg-gray-200 text-left"
                  }`}
                >
                  <p>{message.text}</p>
                  <span className="text-xs text-gray-500">
                    {/* {message.timestamp.toString()} */}
                  </span>
                </div>
              </div>
            ))}
            {/* Ref for scrolling */}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 bg-gray-100 border-t border-gray-300">
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
