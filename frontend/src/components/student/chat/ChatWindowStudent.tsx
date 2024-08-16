import React from "react";
import { useStudentChat } from "../../../hooks/useStudentChat";
const messages = [
  {
    id: 1,
    text: "Hi, what are you doing?!",
    sender: "John Doe",
    time: "Sun",
    align: "left",
  },
  {
    id: 2,
    text: "I am doing nothing man!",
    sender: "You",
    time: "Sun",
    align: "right",
  },
];

const ChatWindow: React.FC = () => {
  const { selectedExpertId } = useStudentChat();
  return (
    <div className="flex-1  flex flex-col  ">
      {selectedExpertId ? (
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div className="mb-4 text-right cursor-pointer bg-blue-950 h-20">
            user name
          </div>
          <h2>Chat with {selectedExpertId}</h2>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.align === "right" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-lg shadow ${
                  message.align === "right"
                    ? "bg-green-200 text-right"
                    : "bg-gray-200 text-left"
                }`}
              >
                <p>{message.text}</p>
                <span className="text-xs text-gray-500">{message.time}</span>
              </div>
            </div>
          ))}
          <div className=" p-4 bg-gray-100 border-t border-gray-300">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none"
              />
              <button className="ml-2 p-2 bg-blue-500 text-white rounded-lg">
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
