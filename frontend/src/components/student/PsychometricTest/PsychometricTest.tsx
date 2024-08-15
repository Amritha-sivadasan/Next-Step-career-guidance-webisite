import { useState, useEffect } from "react";
import { FcAlarmClock } from "react-icons/fc";
import { getAllQuestions, submitTestAnswers } from "../../../services/api/psychometricApi";
import { IPsychometricQuestion } from "../../../@types/psychometricTest";
import { useAppSelector } from "../../../hooks/useTypeSelector";

const PsychometricTest = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes
  const [questions, setQuestions] = useState<IPsychometricQuestion[]>([]);
  const [answers, setAnswers] = useState<Array<string | null>>([]);
  const  {user}= useAppSelector(state=>state.student)

  useEffect(() => {
    // Timer logic
    if (timeRemaining <= 0) {
      handleNextQuestion(); // Automatically move to next question
      return;
    }

    const timerId = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeRemaining]);

  useEffect(() => {
    // Fetch questions from the API
    const fetchQuestions = async () => {
      const response = await getAllQuestions();
      if (response.success) {
        setQuestions(response.data);
        setAnswers(new Array(response.data.length).fill(null)); // Initialize answers based on number of questions
      }
    };
    fetchQuestions();
  }, []);

  const handleAnswerChange = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = option;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (answers[currentQuestionIndex] !== null) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setTimeRemaining(1800); // Reset timer for the next question
      } else {
        handleSubmit(); // All questions answered, submit
      }
    }
  };

  const handleSubmit = async() => {
    console.log("Submitted Answers:", answers);
   if(user){
     const reponse = await submitTestAnswers(user?._id,answers)
     console.log('results of psychomeric test',reponse)
   }

  };

  const isAnswerSelected = answers[currentQuestionIndex] !== null;

  return (
    <div className="mx-auto p-6 bg-blue-950 rounded-lg shadow-md max-w-screen-lg mt-11 mb-12 h-[80vh]">
      <h1 className="text-3xl font-bold text-center  mb-8 text-white">
        Psychometric Test
      </h1>
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex justify-end gap-3">
          <FcAlarmClock size={24} />
          {Math.floor(timeRemaining / 60)}:
          {String(timeRemaining % 60).padStart(2, "0")}
        </div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          {questions[currentQuestionIndex]?.question || "Loading..."}
        </h2>
        <div className="flex flex-col space-y-2">
          {questions[currentQuestionIndex]?.options.map((option, optionIndex) => (
            <label key={optionIndex} className="flex items-center text-gray-600">
              <input
                type="radio"
                name={`question-${currentQuestionIndex}`}
                value={option.text} 
                checked={answers[currentQuestionIndex] === option._id}
                onChange={() => handleAnswerChange(option._id)}
                className="mr-2 h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-500 cursor-pointer"
              />
              {option.text}
            </label>
          ))}
        </div>
        <div className="flex justify-end items-center mt-4">
          <button
            onClick={handleNextQuestion}
            disabled={!isAnswerSelected}
            className={`bg-[#0B2149] text-white py-2 px-4 rounded-lg shadow-lg transition duration-300 ${
              !isAnswerSelected ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PsychometricTest;
