import React, { useState, useEffect } from "react";
import { IPsychometricQuestion } from "../../../@types/psychometricTest";
import {
  getPsychometricTests,
  deletePsychometricTest,
} from "../../../services/api/psychometricApi";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const PsychometricTest: React.FC = () => {
  const [questions, setQuestions] = useState<IPsychometricQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(3);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getPsychometricTests();
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch questions");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = questions.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(questions.length / itemsPerPage);

  const handleQuestionClick = (id: string) => {
    setExpandedQuestionId((prevId) => (prevId === id ? null : id));
  };

  const handleDelete = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deletePsychometricTest(id);
        setQuestions((prevQuestions) =>
          prevQuestions.filter((q) => q._id !== id)
        );
      }
    } catch (error) {
      setError("Failed to delete question");
    }
  };

  const handleAddnew = async () => {
    navigate("/admin/add-psychometric-test");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-screen-lg mx-auto p-8 bg-white shadow-lg rounded-lg mt-10 border">
      <h1 className="text-2xl font-bold mb-6">Psychometric Questions</h1>
      <div className="flex justify-end mt-6 mb-5">
        <button
          onClick={handleAddnew}
          className="bg-blue-950 text-white py-2 px-6 rounded-lg shadow-md transition duration-200 ease-in-out"
        >
          Add New Question
        </button>
      </div>
      {currentItems.map((question) => (
        <div key={question._id} className="mb-6">
          {/* Question Card */}
          <div
            onClick={() => handleQuestionClick(question._id || "")}
            className="cursor-pointer p-6 bg-blue-50 rounded-lg shadow-lg hover:bg-blue-100 transition duration-300 ease-in-out"
          >
            <h2 className="text-lg font-semibold text-blue-950">
              {question.question}
            </h2>
          </div>

          {/* Expanded Question Details */}
          {expandedQuestionId === question._id && (
            <div className="mt-4 p-4 border border-gray-300 rounded-lg shadow-sm bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800">Options</h3>
                <button
                  onClick={() => handleDelete(question._id || "")}
                  className="text-red-600 hover:text-red-800 transition duration-300 ease-in-out"
                >
                  <MdDeleteForever size={24} />
                </button>
              </div>

              {question.options.map((option, optIndex) => (
                <div
                  key={optIndex}
                  className="mb-4 p-4 border border-gray-200 rounded-lg bg-gray-50"
                >
                  <strong className="text-md text-blue-900">
                    {optIndex + 1}. {option.text}
                  </strong>
                  <ul className="mt-2 list-disc ml-5 text-gray-700">
                    {option.scores.map((score, scoreIndex) => (
                      <li key={scoreIndex} className="text-sm">
                        <span className="font-semibold">{score.category}:</span>{" "}
                        {score.score}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg mx-2 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg mx-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PsychometricTest;
