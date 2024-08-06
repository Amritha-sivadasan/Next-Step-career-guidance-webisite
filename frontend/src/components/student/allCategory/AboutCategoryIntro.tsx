import React from "react";
import { ISubCategory } from "../../../@types/dashboard";
interface SubcategoryProps {
  subCategory: ISubCategory;
}

const AboutCategoryIntro: React.FC<SubcategoryProps> = ({ subCategory }) => {
  return (
    <section className="bg-[#0B2149] lg:h-[55vh] sm:h-auto text-white py-20 md:py-20 flex flex-col md:flex-row items-center">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
      {/* Text Section */}
      <div className="md:w-3/4 w-full text-center md:text-left mb-8 md:mb-0">
        <h1 className="text-2xl md:text-4xl font-bold mb-6 md:mb-10">
          Introduction to {subCategory.subCatName}
        </h1>
        <p className="text-base md:text-lg mb-6 md:mb-8">
          {subCategory.description}
        </p>
      </div>
  
      {/* Image Section */}
      <div className="md:w-7/12 sm:w-2/12 lg:w-5/12 flex justify-center md:justify-end">
        <div className="w-full flex justify-center">
          <div className="w-full h-[300px] relative">
            <img
              src={subCategory.subCatImage}
              alt="Banner Image"
              className="w-full h-full object-cover rounded-lg absolute inset-0"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
  
  );
};

export default AboutCategoryIntro;
