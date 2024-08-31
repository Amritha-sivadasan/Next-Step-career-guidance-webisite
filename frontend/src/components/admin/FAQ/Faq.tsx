import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { fetchAllFaq, submitAnswer } from "../../../services/api/adminApi";
import { IFaq } from "../../../@types/faq";
import { FaCheckCircle } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import LoadingPage from "../../common/Loading/LoadingPage";

interface IFormInput {
  [key: string]: string;
}

const Faq: React.FC = () => {
  const [questions, setQuestions] = useState<IFaq[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(
    null
  );
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const fetchQuestions = async () => {
    try {
      const response = await fetchAllFaq();
      setQuestions(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch questions");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  if (loading) {
    return <div><LoadingPage/></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleQuestionClick = (id: string) => {
    setExpandedQuestionId((prevId) => (prevId === id ? null : id));
  };

  const handleEditAnswer = (id: string) => {
    setIsEditing((prevEditing) => ({
      ...prevEditing,
      [id]: true,
    }));
    reset({ [id]: answers[id] || "" }); // Initialize form with existing answer
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const id = Object.keys(data)[0];
    await submitAnswer(id, data[id]);

    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: data[id],
    }));

    setIsEditing((prevEditing) => ({
      ...prevEditing,
      [id]: false,
    }));

    reset(); // Clear form data
    fetchQuestions();
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = questions.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(questions.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setExpandedQuestionId(null); // Collapse expanded question on page change
  };

  return (
    <div className="max-w-screen-lg mx-auto p-8 bg-white shadow-lg rounded-lg mt-10 border">
      <h1 className="text-2xl font-bold mb-6">Frequently Asked Questions</h1>
      {currentItems.map((question) => (
        <div key={question._id} className="mb-6">
          {/* Question Card */}
          <div
            onClick={() => handleQuestionClick(question._id || "")}
            className="cursor-pointer justify-between flex p-6 bg-blue-50 rounded-lg shadow-lg hover:bg-blue-100 transition duration-300 ease-in-out"
          >
            <h2 className="text-lg font-semibold text-blue-950">
              {question.question}
            </h2>
            <p className="me-10">
              {question.answer && <FaCheckCircle size={24} color="green" />}
            </p>
          </div>

          {/* Expanded Question Details */}
          {expandedQuestionId === question._id && (
            <div className="mt-4 p-4 border border-gray-300 rounded-lg shadow-sm bg-white">
              <div className="flex justify-between items-center mb-4">
                {question.answer && !isEditing[question._id] ? (
                  <div className="flex justify-between w-full">
                    <p className="mb-2">{question.answer}</p>
                    <button
                      onClick={() => handleEditAnswer(question._id || "")}
                      className="px-4 py-2"
                    >
                      <MdModeEdit size={24} />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <textarea
                      {...register(question._id || "", {
                        required: "Answer is required",
                        validate: {
                          noSpaces: (value) =>
                            value.trim() === "" ? "Answer cannot be just spaces" : true,
                        },
                      })}
                      className="w-full p-2 border rounded"
                      placeholder="Type your answer here..."
                    />
                    {errors[question._id] && (
                      <p className="text-red-500">{errors[question._id]?.message}</p>
                    )}
                    <button
                      type="submit"
                      className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      {question.answer ? "Update Answer" : "Submit Answer"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-l hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Faq;
