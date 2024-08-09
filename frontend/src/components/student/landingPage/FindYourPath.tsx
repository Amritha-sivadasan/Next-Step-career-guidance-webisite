import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  getAllCategory,
  getAllSubCategory,
} from "../../../services/api/studentApi";
import { ICategory, ISubCategory } from "../../../@types/dashboard";

const FindYourPath: React.FC = () => {
  const scrollRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>();
  const [categories, setCategory] = useState<ICategory[]>([]);
  const [subcategories, setSubcategories] = useState<ISubCategory[]>([]);
  useEffect(() => {
    const fetchCategory = async () => {
      const response = await getAllCategory(1, 10);

      setCategory(response.data.items);
      setSelectedCategory(response.data.items[0].catName);

      const fetSubcategory = async () => {
        const result = await getAllSubCategory(response.data.items[0].catName);

        setSubcategories(result.data.slice(0, 3));
      };
      fetSubcategory();
    };
    fetchCategory();
  }, []);

  const handleSelectCategory = async (catName: string) => {
    setSelectedCategory(catName);
    const result = await getAllSubCategory(catName);
    setSubcategories(result.data.slice(0, 3));
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleViewAllCategory = (catName: string) => {
    navigate(`/allcategory/${catName}`);
  };

  const handleSubCategory = (id: string) => {
    navigate(`/categoryDetails/${id}`);
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
                  key={category._id}
                  onClick={() => handleSelectCategory(category.catName)}
                  className={`p-2 md:p-4 cursor-pointer rounded-lg flex-shrink-0 w-1/3 md:w-1/4 transition-all text-center duration-300 ${
                    selectedCategory === category.catName
                      ? "text-blue-900 border-b-2 border-blue-900"
                      : "text-[#0B2149]"
                  }`}
                >
                  {category.catName}
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
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 h-auto md:h-[45vh] mt-8 w-11/12 md:w-10/12">
          {subcategories.map((subcat) => (
            <div
              key={subcat._id}
              className="bg-white h-[45vh] p-4 rounded-lg shadow-md flex flex-col items-center cursor-pointer"
              onClick={() => handleSubCategory(subcat._id)}
            >
              <h3 className="text-xl font-semibold mb-2">
                {subcat.subCatName}
              </h3>
              <p className="text-center text-gray-700">{subcat.description}</p>
              <div className="w-full flex justify-center overflow-hidden rounded-lg">
                <img
                  src={subcat.subCatImage}
                  alt="subcatimage"
                  className="max-w-full h-auto object-contain"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <button
            onClick={() => handleViewAllCategory(subcategories[0]?.catName)}
            className="border text-xl border-gray-600 p-3 rounded-lg bg-gray-50 w-48 md:w-64 text-[#0B2149] font-semibold"
          >
            View All
          </button>
        </div>
      </div>
    </section>
  );
};

export default FindYourPath;
