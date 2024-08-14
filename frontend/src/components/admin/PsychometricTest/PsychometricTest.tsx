import React, { useState, useEffect } from "react";
import { IPsychometricQuestion } from "../../../@types/psychometricTest";
import {
  getPsychometricTests,
  deletePsychometricTest,
} from "../../../services/api/adminApi";
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
  const navigate= useNavigate()

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

         if(result.isConfirmed){
             
             await deletePsychometricTest(id);
             setQuestions((prevQuestions) =>
               prevQuestions.filter((q) => q._id !== id)
             );
         } 

    } catch (error) {
      setError("Failed to delete question");
    }
  };
  const handleAddnew= async()=>{
    navigate('/admin/add-psychometric-test')
  }

  return (
    <div className="max-w-screen-lg mx-auto p-8 bg-white shadow-lg  rounded-lg mt-10 border ">
      <h1 className="text-2xl font-bold mb-6">Psychometric Questions</h1>
      <div className="flex justify-end mt-6 mb-5">
        <button onClick={handleAddnew} className="bg-blue-950 text-white py-2 px-6 rounded-lg shadow-md transition duration-200 ease-in-out">
          Add New Question
        </button>
      </div>

      {questions.map((question) => (
        <div key={question._id} className="mb-4">
          <div
            onClick={() => handleQuestionClick(question._id || "")}
            className="cursor-pointer p-4 bg-blue-50 rounded-md shadow hover:bg-blue-100"
          >
            <h2 className="text-lg font-medium">{question.question}</h2>
          </div>

          {expandedQuestionId === question._id && (
            <div className="mt-2 p-4 border border-gray-200 rounded-md">
              <div className="flex justify-end ">
                <button
                  onClick={() => handleDelete(question._id || "")}
                  
                >
                  <MdDeleteForever size={32} />
                </button>
              </div>
              {question.options.map((option, optIndex) => (
                <div key={optIndex} className="mb-2">
                  <strong>
                    {optIndex + 1}. {option.text}
                  </strong>
                  <ul className="ml-4 list-disc">
                    {option.scores.map((score, scoreIndex) => (
                      <li key={scoreIndex}>
                        {score.category}: {score.score}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PsychometricTest;
