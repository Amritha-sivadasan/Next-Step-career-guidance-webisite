import React from "react";
import { FaLaptopCode, FaUserGraduate } from "react-icons/fa"; // Importing FontAwesome icons

const AboutCategory: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-center mb-14 ">
        <h1 className=" text-3xl font-semibold text-[#0B2149] ">About</h1>
      </div>
      {/* Overview Section */}
      <div className="mb-8 p-6 rounded-lg shadow-lg flex items-start gap-4 transition-transform transform hover:scale-105">
        <div>
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <p className="text-gray-700">
            Software development involves the creation of programs and systems
            that mimic human actions and behaviors. It is a rapidly growing
            field with high demand for skilled professionals. The goal of
            software development is to design applications and tools that
            automate tasks, enhance productivity, and solve complex problems.
            This field encompasses various technologies and methodologies to
            create software for diverse purposes, including web and mobile
            applications, enterprise systems, and embedded software. It plays a
            crucial role in advancing technology and improving efficiency across
            industries.
          </p>
        </div>
      </div>
      {/* Skills and Personality Section */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Required Skills */}
        <div className="flex-1 p-6 rounded-lg shadow-lg flex items-start gap-4 transition-transform transform hover:scale-105">
          <div className="text-4xl text-[#0B2149]">
            <FaLaptopCode /> {/* Skills Icon */}
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Required Skills</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>
                Programming Fundamentals: Start with learning a programming
                language like Python or JavaScript. Understand basic syntax,
                variables, loops, and functions.
              </li>
              <li>
                Problem-Solving Skills: Practice solving problems logically.
                Start with simple algorithms and gradually move to more complex
                challenges.
              </li>
              <li>
                Mathematics: A strong foundation in math, including algebra and
                logic, is essential for understanding algorithms and data
                structures.
              </li>
              <li>
                Computer Science Basics: Learn about data structures (arrays,
                linked lists, stacks, queues) and algorithms (sorting,
                searching) through online resources or introductory courses.
              </li>
              <li>
                Curiosity and Self-Learning: Stay curious about new technologies
                and programming languages. Explore projects.
              </li>
            </ul>
          </div>
        </div>

        {/* Required Personality */}
        <div className="flex-1 p-6 rounded-lg shadow-lg flex items-start gap-4 transition-transform transform hover:scale-105">
          <FaUserGraduate className="text-4xl text-[#0B2149]" />{" "}
          {/* Personality Icon */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Required Personality</h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>Dedication</li>
              <li>Patience</li>
              <li>Detail-Oriented</li>
              <li>Flexibility and adaptability</li>
              <li>Good oral communication</li>
              <li>Good written communication</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-12  mb-10">
        <button className="border rounded-lg w-56 text-white p-3 bg-[#0B2149] transition-transform duration-300 transform hover:scale-105 hover:bg-[#0A1E3F] focus:outline-none focus:ring-2 focus:ring-[#0A1E3F] focus:ring-offset-2">
          Psychometric Test
        </button>
      </div>
      <div className=" py-8 px-4 bg-[#F0F8FF] rounded-lg">
        <div className=" flex items-center justify-between">
          {/* Image Section */}
          <div className="flex-1 flex justify-center">
            <img
              src="/mentor.png" // Replace with your image path
              alt="Mentor"
              className="object-cover w-full h-full max-w-xs rounded-lg "
            />
          </div>

          {/* Text Section */}
          <div className="flex-1 px-4 mt-10">
            <h3 className="text-2xl font-bold mb-4">
              Why Mentor is Important?{" "}
            </h3>
            <p className="text-gray-700">
              Mentors play a crucial role in personal and professional
              development. They provide guidance, support, and feedback, helping
              individuals navigate their career paths and make informed
              decisions. A mentor shares their experience, offers valuable
              insights, and helps mentees build skills and confidence. This
              relationship fosters growth, encourages learning, and often leads
              to better opportunities and successful outcomes.
            </p>
            <div className="flex justify-center mt-7 ">
              <button className="border p-3 w-52 rounded-lg bg-[#0B2149] text-white transition-transform duration-300 transform hover:scale-105 hover:bg-[#0A1E3F] focus:outline-none focus:ring-2 focus:ring-[#0A1E3F] focus:ring-offset-2">
                Book Your Mentor{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* category listing */}
      <div className="py-8">
        <h2 className="text-2xl font-bold text-center mb-14">
          You May Also Be Interested In
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 ">
          {/* Category Item 1 */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center border">
            <img
              src="/path/to/category1.jpg" // Replace with your category image path
              alt="Category 1"
              className="w-24 h-24 object-cover rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Category 1</h3>
            <p className="text-gray-600">Brief description of Category 1.</p>
          </div>

          {/* Category Item 2 */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center border">
            <img
              src="/path/to/category2.jpg" // Replace with your category image path
              alt="Category 2"
              className="w-24 h-24 object-cover rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Category 2</h3>
            <p className="text-gray-600">Brief description of Category 2.</p>
          </div>

          {/* Category Item 3 */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center border">
            <img
              src="/path/to/category3.jpg" // Replace with your category image path
              alt="Category 3"
              className="w-24 h-24 object-cover rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Category 3</h3>
            <p className="text-gray-600">Brief description of Category 3.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCategory;
