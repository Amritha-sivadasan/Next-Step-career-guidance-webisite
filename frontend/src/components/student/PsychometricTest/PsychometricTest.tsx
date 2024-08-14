// src/components/PsychometricTest.js

import  { useState } from 'react';

const questions = [
  {
    question: "How often do you feel stressed?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"]
  },
  {
    question: "How do you usually handle conflicts?",
    options: ["Avoid them", "Face them", "Seek mediation", "Give in", "Compromise"]
  },

];

const PsychometricTest = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleAnswerChange = (index:number, option:string) => {
    const newAnswers = [...answers];
    newAnswers[index] = option;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    console.log("Submitted Answers:", answers);
    // Add further logic to handle form submission
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Psychometric Test</h1>
      {questions.map((question, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-lg font-semibold">{question.question}</h2>
          <div className="mt-2">
            {question.options.map((option, optionIndex) => (
              <label key={optionIndex} className="block mb-1">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  checked={answers[index] === option}
                  onChange={() => handleAnswerChange(index, option)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700"
      >
        Submit
      </button>
    </div>
  );
};

export default PsychometricTest;
