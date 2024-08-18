import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/useTypeSelector";
import { fetchQusion, sendQustion } from "../../../services/api/studentApi";
import { toast } from "react-toastify";
import { IFaq } from "../../../@types/faq";

const Faq: React.FC = () => {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [newquestion, setnewquestion] = useState<string>("");
  const [questions, setQuestions] = useState<IFaq[]>([]);
  const { user } = useAppSelector((state) => state.student);
  useEffect(() => {
    const fetchQuestion = async () => {
      const response = await fetchQusion();
      const filteredQuestions = response.data.filter(
        (question:IFaq) => question.answer
      );
      setQuestions(filteredQuestions.slice(0, 4));
    };
    fetchQuestion();
  }, []);

  const handleQuestionClick = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const handleQuestion = async () => {
     if(newquestion.trim()==''){
       toast.error('Please enter question')
       return
     }

    const newQuestion = {
      studentId: user?._id,
      question: newquestion,
    };
  
    const response = await sendQustion(newQuestion);
    if (response.success) {
      toast.success("Message send Successfully");
    }
    setnewquestion("");
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

        <div className="w-full md:w-1/2 md:max-w-lg mx-auto">
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm max-w-md mx-auto"
              >
                <button
                  onClick={() => handleQuestionClick(index)}
                  className="w-full px-4 py-2 text-left bg-[#E7F1FF] border-b border-gray-300 rounded-t-lg flex justify-between items-center hover:bg-gray-200 focus:outline-none"
                >
                  <span className="text-lg font-semibold">
                    {question.question}
                  </span>
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
                    <p className="text-base mb-4">{question.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Ask a Question Section */}
          <div className="mt-10 max-w-sm mx-auto">
            <h3 className="text-xl font-semibold mb-2">Have more questions?</h3>
            <p className="text-base mb-4">
              Feel free to reach out and ask us anything! We’re here to help.
            </p>
            <input
              type="text"
              value={newquestion}
              placeholder="Enter your question here..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-[#E7F1FF] focus:outline-none focus:ring-2 focus:ring-slate-400 transition-colors duration-300"
              onChange={(e) => setnewquestion(e.target.value)}
            />
            <button
              onClick={handleQuestion}
              className="mt-3 px-5 py-2 bg-[#0B2149] text-white rounded-lg shadow-md hover:bg-blue-950 transition-colors duration-300"
            >
              Submit Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
