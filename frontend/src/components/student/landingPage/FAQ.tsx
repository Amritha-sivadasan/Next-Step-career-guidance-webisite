import React, { useState } from "react";

const Faq: React.FC = () => {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  const handleQuestionClick = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <div className="p-8 container mx-auto">
      <div className="flex justify-center mb-10">
        <h2 className="text-3xl text-[#0B2149] font-bold mb-8 text-center">
          Frequently Asked Questions
        </h2>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Left Side: Image */}
        <div className="w-full md:w-1/2 flex justify-center ">
          <img
            src="/faq.png" // Replace with your image path
            alt="FAQ"
            className="w-[459px] h-[450px] object-cover rounded-lg " // Adjust width here
          />
        </div>

        {/* Right Side: FAQ Content */}
        <div className="w-full md:w-1/2 md:max-w-lg mx-auto">
          {/* FAQ Questions and Answers */}
          <div className="space-y-4">
            {["Question 1", "Question 2", "Question 3"].map(
              (question, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm max-w-md mx-auto"
                >
                  <button
                    onClick={() => handleQuestionClick(index)}
                    className="w-full px-4 py-2 text-left bg-[#E7F1FF] border-b border-gray-300 rounded-t-lg flex justify-between items-center hover:bg-gray-200 focus:outline-none"
                  >
                    <span className="text-lg font-semibold">{question}</span>
                    <svg
                      className={`w-6 h-6 transition-transform duration-300 ${
                        activeQuestion === index ? "rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {activeQuestion === index && (
                    <div className="p-4">
                      <p className="text-base mb-4">
                        This is the answer to the question. It provides detailed
                        information to help the user understand the answer
                        clearly.
                      </p>
                    </div>
                  )}
                </div>
              )
            )}
          </div>

          {/* Ask a Question Section */}
          <div className="mt-10 max-w-sm mx-auto">
            <h3 className="text-xl font-semibold mb-2">Have more questions?</h3>
            <p className="text-base mb-4">
              Feel free to reach out and ask us anything! We’re here to help.
            </p>
            <input
              type="text"
              placeholder="Enter your question here..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-[#E7F1FF] focus:outline-none focus:ring-2 focus:ring-slate-400 transition-colors duration-300"
            />
            <button className="mt-3 px-5 py-2 bg-[#0B2149] text-white rounded-lg shadow-md hover:bg-blue-950 transition-colors duration-300">
              Submit Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;