import React, { useEffect, useState } from "react";
import { useStudentChat } from "../../../hooks/useStudentChat";
import socket from "../../../config/socket";
import { useAppSelector } from "../../../hooks/useTypeSelector";
import { IMessage } from "../../../@types/message";


const ChatWindow: React.FC = () => {
  const { chatId } = useStudentChat();
  const { user } = useAppSelector((state) => state.student);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const userId = user?._id;

  useEffect(() => {
    if (!user) {
      return;
    }
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server with id:", socket.id);
    });

    socket.emit("joinChat", { chatId, userId });
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    


  }, [chatId, user, userId]);

  const sendMessage = () => {
    const message = {
      text: newMessage,
      sender: userId,
      time: new Date().toLocaleTimeString(),
    };
    socket.emit("sendMessage", { chatId, message });
    setNewMessage("");
  };

  return (
    <div className="flex-1  flex flex-col  ">
      {chatId ? (
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div className="mb-4 text-right cursor-pointer bg-blue-950 h-20">
            user name
          </div>
          <h2>Chat with {chatId}</h2>
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
                  {message.timestamp.toDateString()}
                </span>
              </div>
            </div>
          ))}
          <div className=" p-4 bg-gray-100 border-t border-gray-300">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Type a message..."
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
