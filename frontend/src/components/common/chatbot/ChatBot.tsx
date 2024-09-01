import React, { useState, useEffect, useRef } from "react";
import { Send, X } from "lucide-react";

type ChatMessage = {
  sender: "user" | "bot";
  message: string;
};

const FAQChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const faqData: { [key: string]: string } = {
    "How does your career guidance service work?":
      "Our service connects students with industry experts for personalized career advice. You can browse expert profiles, book sessions, and get insights directly from professionals in your field of interest.",

    "Who are the industry experts on your platform?":
      "Our experts are verified professionals from various industries with at least 5 years of experience. They include CEOs, managers, engineers, designers, and more from top companies across different sectors.",

    "How much does it cost to connect with an expert?":
      "Prices vary depending on the expert and the type of session. You can find free introductory sessions, while in-depth consultations typically range from $50 to $200 per hour. Check each expert's profile for specific pricing.",

    "What types of career guidance can I get?":
      "You can get guidance on choosing a career path, industry insights, resume reviews, interview preparation, networking tips, and advice on skill development. Our experts offer both general career advice and industry-specific guidance.",

    "How do I schedule a session with an expert?":
      "To schedule a session, browse our expert profiles, select the expert you'd like to connect with, choose an available time slot, and book your session. You'll receive a confirmation email with further instructions.",

    "Can I get a refund if I'm not satisfied with a session?":
      "We have a satisfaction guarantee. If you're not satisfied with your session, please contact our support team within 24 hours, and we'll work to resolve the issue or provide a refund.",
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleQuestionClick = (question: keyof typeof faqData) => {
    addMessage("user", String(question));
    simulateTyping(faqData[question]);
  };

  const handleCustomMessage = () => {
    if (inputMessage.trim() === "") return;

    addMessage("user", inputMessage);
    setInputMessage("");

    const matchedQuestion = findBestMatch(inputMessage, Object.keys(faqData));
    if (matchedQuestion) {
      simulateTyping(faqData[matchedQuestion]);
    } else {
      simulateTyping(
       "If you have any more questions, you can ask our agents. Below is an option to connect with them."
      );
    }
  };

  const addMessage = (sender: "user" | "bot", message: string) => {
    setChatHistory((prevHistory) => [...prevHistory, { sender, message }]);
  };

  const simulateTyping = (message: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage("bot", message);
    }, 1500);
  };

  const findBestMatch = (input: string, questions: string[]): string | null => {
    const inputLower = input.toLowerCase();
    for (const question of questions) {
      if (question.toLowerCase().includes(inputLower)) {
        return question;
      }
    }
    return null;
  };

  return (
    <div className="fixed bottom-4 right-4 font-sans z-40">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-900 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 flex items-center space-x-2"
        >
          <span>Chat with Us</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      ) : (
        <div className="w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-blue-950 text-white p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">FAQ Assistant</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <X size={24} />
            </button>
          </div>
          <div
            ref={chatContainerRef}
            className="flex-grow p-4 space-y-4 overflow-y-auto"
          >
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`flex ${
                  chat.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`${
                    chat.sender === "user"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  } rounded-lg p-3 max-w-[80%] shadow`}
                >
                  {chat.message}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 rounded-lg p-3 max-w-[80%] shadow">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 bg-gray-100">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleCustomMessage()}
                placeholder="Type your question..."
                className="flex-grow p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleCustomMessage}
                className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-300"
              >
                <Send size={20} />
              </button>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-600">Suggested questions:</p>
              {Object.keys(faqData).map((question) => (
                <button
                  key={question}
                  onClick={() =>
                    handleQuestionClick(question as keyof typeof faqData)
                  }
                  className="block text-left text-sm text-blue-600 hover:text-blue-800"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <style>{`
        .typing-indicator {
          display: flex;
          justify-content: center;
        }
        .typing-indicator span {
          height: 10px;
          width: 10px;
          background-color: #9ca3af;
          border-radius: 50%;
          display: inline-block;
          margin: 0 2px;
          animation: bounce 1.4s infinite ease-in-out both;
        }
        .typing-indicator span:nth-child(1) {
          animation-delay: -0.32s;
        }
        .typing-indicator span:nth-child(2) {
          animation-delay: -0.16s;
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default FAQChatBot;
