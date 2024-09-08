import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useInView, motion } from "framer-motion";
import {
  getAllCategory,
  getAllSubCategory,
} from "../../../services/api/studentApi";
import { ICategory, ISubCategory } from "../../../@types/dashboard";
import Skeleton from "../../common/Loading/Skeleton";

const FindYourPath: React.FC = () => {
  const scrollRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>();
  const [categories, setCategory] = useState<ICategory[]>([]);
  const [subcategories, setSubcategories] = useState<ISubCategory[]>([]);
  const [loading, setLoading] = useState(true);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef);

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await getAllCategory(1, 10);

      setCategory(response.data.items);
      setSelectedCategory(response.data.items[0].catName);

      const fetSubcategory = async () => {
        const result = await getAllSubCategory(response.data.items[0].catName);

        setSubcategories(result.data.slice(0, 3));
        setLoading(false);
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
              className="flex space-x-8 md:space-x-6 overflow-x-hidden whitespace-nowrap items-center gap-2 "
              style={{ scrollBehavior: "smooth", width: "calc(100% + 300px)" }}
            >
              {categories.map((category) => (
                <li
                  key={category._id}
                  onClick={() => handleSelectCategory(category.catName)}
                  className={`p-2  cursor-pointer rounded-lg flex-shrink-0 md:w-auto transition-all   duration-300 ${
                    selectedCategory === category.catName
                      ? "text-blue-900 border-b-2 border-blue-900"
                      : "text-[#0B2149]"
                  }  hover:scale-95`}
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
      <motion.div
        ref={sectionRef}
        className="h-auto md:h-[70vh] bg-[#F0F8FF] p-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isInView ? 1 : 0,
          scale: isInView ? 1 : 0.8,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 h-auto md:h-[45vh] mt-8 w-11/12 md:w-10/12">
          {loading
            ? Array(3)
                .fill(null)
                .map((_, index) => (
                  <Skeleton
                    key={index}
                    width="100%"
                    height="45vh"
                    borderRadius="8px"
                  />
                ))
            : subcategories.map((subcat, index) => (
                <motion.div
                  key={subcat._id}
                  className="bg-white h-[45vh] p-4 rounded-lg shadow-md flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105"
                  onClick={() => handleSubCategory(subcat._id)}
                  initial={{ opacity: 0, translateY: 50 }}
                  animate={{
                    opacity: 1,
                    translateY: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.3, // Staggered animation for each item
                  }}
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {subcat.subCatName}
                  </h3>
                  <p className="text-center text-gray-700">
                    {subcat.description}
                  </p>
                  <div className="w-full flex justify-center overflow-hidden rounded-lg">
                    <img
                      src={subcat.subCatImage}
                      alt="subcatimage"
                      className="max-w-full h-auto object-contain"
                      
                    />
                  </div>
                </motion.div>
              ))}
        </div>
        <div className="flex justify-center mt-10">
          <button
            onClick={() => handleViewAllCategory(selectedCategory!)}
            className="border text-xl border-gray-300  shadow-lg  p-1 rounded-lg bg-gray-50 w-24 md:w-28 text-[#0B2149] font-semibold transition-transform transform hover:scale-105"
          >
            View All
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default FindYourPath;
