import React, { useState } from "react";
import { addPsychometricTest } from "../../../services/api/psychometricApi";

interface Score {
  category: string;
  score: number;
}

interface Option {
  text: string;
  scores: Score[];
}

const categories = [
  "arts_humanities",
  "media_communication",
  "education_teaching",
];

const AddPsychometricTest: React.FC = () => {
    const [question, setQuestion] = useState<string>("");
    const [options, setOptions] = useState<Option[]>([{ text: "", scores: [] }]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [categoryScore, setCategoryScore] = useState<number>(0);
  
    // Handle question text change
    const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setQuestion(e.target.value);
    };
  
    // Handle option text change
    const handleOptionTextChange = (index: number, value: string) => {
      setOptions((prevOptions) =>
        prevOptions.map((option, i) =>
          i === index ? { ...option, text: value } : option
        )
      );
    };
  
    // Handle score change for existing categories
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
  
    // Add a new option
    const addOption = () => {
      setOptions((prevOptions) => [...prevOptions, { text: "", scores: [] }]);
    };
  
    // Add a new category or update an existing one
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
                // Update existing category score
                const updatedScores = option.scores.map((scoreItem) =>
                  scoreItem.category === category
                    ? { ...scoreItem, score }
                    : scoreItem
                );
                return { ...option, scores: updatedScores };
              } else {
                // Add new category
                const updatedScores = [
                  ...option.scores,
                  { category, score },
                ];
                return { ...option, scores: updatedScores };
              }
            }
            return option;
          })
        );
        setSelectedCategory("");
        setCategoryScore(0);
      }
    };
  
    // Prepare data for saving
    const prepareDataForSave = () => ({
      question,
      options: options.map((option) => ({
        text: option.text,
        scores: option.scores,
      })),
    });
  
    // Handle save action
    const handleSave = async () => {
      const newTest = prepareDataForSave();
      console.log("Prepared Data for Save:", newTest);
      try {
        const response = await addPsychometricTest(newTest);
        console.log("Response from API:", response);
      } catch (error) {
        console.error("Error saving psychometric test:", error);
      }
    };
  

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg mt-10">
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
                      handleScoreChange(index, score.category, Number(e.target.value))
                    }
                    placeholder="Enter score"
                  />
                </div>
              ))}
              <div className="flex items-center mb-2">
                <select
                  className="w-1/2 p-2 border border-gray-300 rounded-md mr-2"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
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
                  onClick={() => addCategoryToOption(index, selectedCategory, categoryScore)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600"
                >
                  + Add Category
                </button>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={addOption}
          className="bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600"
        >
          + Add Another Option
        </button>
      </div>

      <button
        onClick={handleSave}
        className="bg-green-500 text-white py-2 px-6 rounded-md shadow hover:bg-green-600"
      >
        Save Question
      </button>
    </div>
  );
};

export default AddPsychometricTest;
