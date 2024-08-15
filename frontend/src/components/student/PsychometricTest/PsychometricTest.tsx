import { useState, useEffect } from "react";
import { FcAlarmClock } from "react-icons/fc";
import {
  getAllQuestions,
  submitTestAnswers,
} from "../../../services/api/psychometricApi";
import { IPsychometricQuestion } from "../../../@types/psychometricTest";
import { useAppDispatch, useAppSelector } from "../../../hooks/useTypeSelector";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../features/student/authSlice";

const PsychometricTest = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30); 
  const [questions, setQuestions] = useState<IPsychometricQuestion[]>([]);
  const [answers, setAnswers] = useState<Array<string | null>>([]);
  const { user } = useAppSelector((state) => state.student);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (timeRemaining <= 0) {
      handleNextQuestion();
      return;
    }

    const timerId = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeRemaining]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await getAllQuestions();
      if (response.success) {
        setQuestions(response.data);
        setAnswers(new Array(response.data.length).fill(null));
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
        setTimeRemaining(1800);
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = async () => {
    if (user) {
      const response = await submitTestAnswers(user._id, answers);
      if (response.success) {
        dispatch(setUser(response.data));
        navigate("/test-result");
      }
    }
  };

  const isAnswerSelected = answers[currentQuestionIndex] !== null;

  return (
    <div className="mx-auto p-6 bg-gradient-to-r bg-blue-950 rounded-lg shadow-md max-w-screen-lg mt-11 mb-12 h-[90vh]">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">
        Psychometric Test
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FcAlarmClock size={24} />
            <span className="text-lg font-semibold text-gray-700">
              {Math.floor(timeRemaining / 60)}:
              {String(timeRemaining % 60).padStart(2, "0")}
            </span>
          </div>
          <span className="text-lg font-semibold text-gray-700">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {questions[currentQuestionIndex]?.question || "Loading..."}
        </h2>
        <div className="flex flex-col space-y-2">
          {questions[currentQuestionIndex]?.options.map(
            (option, optionIndex) => (
              <div
                key={optionIndex}
                className={`p-4 rounded-lg cursor-pointer transition-colors duration-300 ease-in-out w-80 border  ${
                  answers[currentQuestionIndex] === option._id
                    ? "bg-blue-950 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => handleAnswerChange(option._id)}
              >
                {option.text}
              </div>
            )
          )}
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={handleNextQuestion}
            disabled={!isAnswerSelected}
            className={`bg-blue-950 text-white py-2 px-6 rounded-lg shadow-md transition-colors duration-300 ease-in-out ${
              !isAnswerSelected
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-900"
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
