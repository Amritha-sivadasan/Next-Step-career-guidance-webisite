import React, { useEffect, useState } from "react";
import { addPsychometricTest } from "../../../services/api/psychometricApi";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import { fetchAllCategories } from "../../../services/api/categoryApi";
import { ICategory } from "../../../@types/dashboard";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface Score {
  category: string;
  score: number;
}

interface Option {
  text: string;
  scores: Score[];
}

const AddPsychometricTest: React.FC = () => {
  const [categories, setCategorie] = useState<ICategory[]>([]);
  const [question, setQuestion] = useState<string>("");
  const [options, setOptions] = useState<Option[]>([{ text: "", scores: [] }]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categoryScore, setCategoryScore] = useState<number>(0);
  const [showCategoryInput, setShowCategoryInput] = useState<number | null>(
    null
  );
  const [showOptionInput, setShowOptionInput] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetchAllCategories(1, 10);
      setCategorie(response.data.items);
    };
    fetchCategory();
  }, []);

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
  };

  const handleOptionTextChange = (index: number, value: string) => {
    setOptions((prevOptions) =>
      prevOptions.map((option, i) =>
        i === index ? { ...option, text: value } : option
      )
    );
  };

  const handleScoreChange = (
    optionIndex: number,
    category: string,
    value: number
  ) => {
    setOptions((prevOptions) =>
      prevOptions.map((option, i) => {
        if (i === optionIndex) {
          const updatedScores = option.scores.map((score) =>
            score.category === category ? { ...score, score: value } : score
          );
          return { ...option, scores: updatedScores };
        }
        return option;
      })
    );
  };

  const addOption = () => {
    setOptions((prevOptions) => [...prevOptions, { text: "", scores: [] }]);
    setShowOptionInput(options.length); // Show input for the new option
  };

  const addCategoryToOption = (
    index: number,
    category: string,
    score: number
  ) => {
    if (category && score >= 0) {
      setOptions((prevOptions) =>
        prevOptions.map((option, i) => {
          if (i === index) {
            const existingCategory = option.scores.find(
              (scoreItem) => scoreItem.category === category
            );
            if (existingCategory) {
              const updatedScores = option.scores.map((scoreItem) =>
                scoreItem.category === category
                  ? { ...scoreItem, score }
                  : scoreItem
              );
              return { ...option, scores: updatedScores };
            } else {
              const updatedScores = [...option.scores, { category, score }];
              return { ...option, scores: updatedScores };
            }
          }
          return option;
        })
      );
      setSelectedCategory("");
      setCategoryScore(0);
      setShowCategoryInput(null);
    }
  };

  const deleteCategoryFromOption = async (
    optionIndex: number,
    categoryToDelete: string
  ) => {
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
      setOptions((prevOptions) =>
        prevOptions.map((option, i) => {
          if (i === optionIndex) {
            const updatedScores = option.scores.filter(
              (scoreItem) => scoreItem.category !== categoryToDelete
            );
            return { ...option, scores: updatedScores };
          }
          return option;
        })
      );
    }
  };
  const validateOptions = () => {
    return options.every(
      (option) =>
        option.text.trim() !== "" &&
        option.scores.length > 0 &&
        option.scores.every(
          (score) =>
            categories.some((obj) => obj.catName === score.category) &&
            score.score >= 0
        )
    );
  };

  const handleCancelCategory = () => {
    setShowCategoryInput(null);
    setSelectedCategory("");
    setCategoryScore(0);
  };

  const handleCancelOption = (index: number) => {
    setShowOptionInput(null);
    setOptions((prevOptions) => prevOptions.filter((_, i) => i !== index));
  };

  const prepareDataForSave = () => ({
    question,
    options: options.map((option) => ({
      text: option.text,
      scores: option.scores,
    })),
  });

  const handleSave = async () => {
    if (!question.trim()) {
      toast.warn("Question is required.");

      return;
    }

    if (!validateOptions()) {
      toast.warn("Please ensure all options have valid categories and scores.");

      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save this test? You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
    });

    if (result.isConfirmed) {
      const newTest = prepareDataForSave();
      console.log("Prepared Data for Save:", newTest);
      try {
        const response = await addPsychometricTest(newTest);
        if (response.success) {
          navigate("/admin/psychometric-test");
        }
        console.log("Response from API:", response);
      } catch (error) {
        console.error("Error saving psychometric test:", error);
      }
    }
  };

  return (
    <div className="max-w-screen-md mx-auto p-8 bg-white shadow-md rounded-lg mt-10 border mb-10">
      <h1 className="text-2xl font-bold mb-6">
        Add Psychometric Test Question
      </h1>

      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">Question</label>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={question}
          onChange={handleQuestionChange}
          placeholder="Enter the psychometric question..."
          rows={3}
        />
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-medium mb-4">Answer Options</h2>
        {options.map((option, index) => (
          <div key={index} className="mb-4 p-4 border rounded-md bg-gray-50">
            <input
              className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={option.text}
              onChange={(e) => handleOptionTextChange(index, e.target.value)}
              placeholder="Enter answer option..."
            />
            <div className="mb-4">
              <h3 className="text-md font-medium mb-2">Category Scores</h3>
              {option.scores.map((score, catIndex) => (
                <div key={catIndex} className="flex items-center mb-2">
                  <input
                    type="text"
                    className="w-1/2 p-2 border border-gray-300 rounded-md mr-2"
                    value={score.category}
                    readOnly
                  />
                  <input
                    type="number"
                    className="w-1/2 p-2 border border-gray-300 rounded-md"
                    value={score.score}
                    onChange={(e) =>
                      handleScoreChange(
                        index,
                        score.category,
                        Number(e.target.value)
                      )
                    }
                    placeholder="Enter score"
                  />
                  <button
                    onClick={() =>
                      deleteCategoryFromOption(index, score.category)
                    }
                    className="cursor-pointer h-26"
                  >
                    <MdDeleteForever size={32} />
                  </button>
                </div>
              ))}
              {showCategoryInput === index ? (
                <div className="flex items-center mb-2">
                  <select
                    className="w-1/2 p-2 border border-gray-300 rounded-md mr-2"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category.catName}>
                        {category.catName}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    className="w-1/4 p-2 border border-gray-300 rounded-md mx-2"
                    value={categoryScore}
                    onChange={(e) => setCategoryScore(Number(e.target.value))}
                    placeholder="Score"
                  />
                  <button
                    onClick={() =>
                      addCategoryToOption(
                        index,
                        selectedCategory,
                        categoryScore
                      )
                    }
                    className="bg-blue-950 text-white py-2 px-4 rounded-md shadow"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleCancelCategory()}
                    className="ml-2 bg-gray-500 text-white py-2 px-4 rounded-md shadow hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowCategoryInput(index)}
                    className="bg-blue-950 text-white py-2 px-4 rounded-md shadow hover:bg-blue-950"
                  >
                    + Add Category
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {showOptionInput !== null && (
          <button
            onClick={() => handleCancelOption(showOptionInput)}
            className="bg-gray-500 text-white py-2 px-4 rounded-md shadow hover:bg-gray-600 me-4"
          >
            Cancel Option
          </button>
        )}
        <button
          onClick={addOption}
          className="bg-blue-950 text-white py-2 px-4 rounded-md shadow hover:bg-blue-950"
        >
          + Add Option
        </button>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-green-500 text-white py-2 px-4 rounded-md shadow hover:bg-green-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddPsychometricTest;
