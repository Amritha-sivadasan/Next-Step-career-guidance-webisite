// src/pages/CareerOptionsPage.tsx
import React from "react";

const careerOptions = [
  {
    title: "Software Developer",
    description: "Design, develop, and maintain software applications.",
    image: "software-developer-image-url",
  },
  {
    title: "Data Scientist",
    description:
      "Analyze and interpret complex data to help organizations make decisions.",
    image: "data-scientist-image-url",
  },
  {
    title: "Cybersecurity",
    description: "Protect systems and networks from digital attacks.",
    image: "cybersecurity-image-url",
  },
  {
    title: "Cloud Computing Engineer",
    description: "Design and manage cloud-based systems and services.",
    image: "cloud-computing-engineer-image-url",
  },
  {
    title: "AI/Machine Learning Engineer",
    description: "Develop intelligent algorithms and systems.",
    image: "ai-engineer-image-url",
  },
  {
    title: "DevOps Engineer",
    description: "Bridge the gap between development and operations.",
    image: "devops-engineer-image-url",
  },
];

const CareerOptionsPage: React.FC = () => {
  return (
    <div className="min-h-screen  flex flex-col items-center">
      <h1 className="text-3xl font-bold my-8">All Career Options</h1>
      <div className="flex flex-wrap justify-center gap-8 ">
        {careerOptions.map((option, index) => (
          <CareerOptionCard
            key={index}
            title={option.title}
            description={option.description}
            image={option.image}
          />
        ))}
      </div>
      <button className="mt-8 px-4 py-2 bg-[#0B2149] text-white rounded-lg">
        View More
      </button>
    </div>
  );
};

export default CareerOptionsPage;

interface CareerOptionCardProps {
  title: string;
  description: string;
  image: string;
}

const CareerOptionCard: React.FC<CareerOptionCardProps> = ({
  title,
  description,
  image,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 m-4 w-80 border ">
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

CareerOptionCard;
