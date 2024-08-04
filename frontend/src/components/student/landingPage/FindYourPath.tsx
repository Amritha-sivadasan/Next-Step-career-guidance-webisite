import React, { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const FindYourPath: React.FC = () => {
  // Reference for the scrollable container
  const scrollRef = useRef<HTMLUListElement>(null);

  // State to track the selected category
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const subcategories = [
    {
      name: "Subcategory 1",
      description: "Short description of subcategory 1.",
      image: "/path/to/image1.png",
    },
    {
      name: "Subcategory 2",
      description: "Short description of subcategory 2.",
      image: "/path/to/image2.png",
    },
    {
      name: "Subcategory 3",
      description: "Short description of subcategory 3.",
      image: "/path/to/image3.png",
    },
  ];

  // Categories to display
  const categories = [
    "Medical",
    "Engineering",
    "Arts",
    "Science",
    "Business",
    "Law",
    "Education",
    "Technology",
  ];

  // Scroll to the left
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  // Scroll to the right
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="mt-10 h-auto md:h-[100vh]">
      <div className="flex justify-center text-[#0B2149] ">
        <h1 className="font-bold text-3xl">Find Your Path</h1>
      </div>

      {/* Category Section */}
      <div className="py-10">
        <div className="container mx-auto px-4 flex items-center justify-center">
          {/* Scroll Left Button */}
          <button
            onClick={scrollLeft}
            className="bg-white text-blue-900 px-2 md:px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition duration-300 mr-2 md:mr-4 flex items-center justify-center"
          >
            <FaChevronLeft className="text-xl" />
          </button>

          {/* Scrollable Container */}
          <div className="relative flex overflow-hidden w-11/12 md:w-5/12">
            <ul
              ref={scrollRef}
              className="flex space-x-4 md:space-x-6 overflow-x-hidden whitespace-nowrap items-center "
              style={{ scrollBehavior: "smooth", width: "calc(100% + 200px)" }}
            >
              {categories.map((category) => (
                <li
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`p-2 md:p-4 cursor-pointer rounded-lg flex-shrink-0 w-1/3 md:w-1/4 transition-all text-center duration-300 ${
                    selectedCategory === category
                      ? "text-blue-900 border-b-2 border-blue-900"
                      : "text-[#0B2149]"
                  }`}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>

          {/* Scroll Right Button */}
          <button
            onClick={scrollRight}
            className="bg-white text-blue-900 px-2 md:px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition duration-300 ml-2 md:ml-4 flex items-center justify-center"
          >
            <FaChevronRight className="text-xl" />
          </button>
        </div>
      </div>

      {/* Subcategory Section */}
      <div className="h-auto md:h-[70vh] bg-[#F0F8FF] p-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 h-auto md:h-[45vh] mt-8 w-11/12 md:w-10/12 shadow-sm">
          {subcategories.map((subcat) => (
            <div
              key={subcat.name}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center"
            >
              {/* <img src={subcat.image} alt={subcat.name} className="w-24 h-24 object-cover mb-4 rounded-full" /> */}
              <h3 className="text-xl font-semibold mb-2">{subcat.name}</h3>
              <p className="text-center text-gray-700">{subcat.description}</p>
              <img src="" alt="subcatimage" />
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10 ">
          <button className="border text-xl  border-gray-600 p-3 rounded-lg bg-gray-50 w-48 md:w-64 text-[#0B2149] font-semibold">
            View All
          </button>
        </div>
      </div>
    </section>
  );
};

export default FindYourPath;
