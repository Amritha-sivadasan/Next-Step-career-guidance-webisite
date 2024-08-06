import React from "react";
import { ICategory } from "../../../@types/dashboard";

interface CategoryProps{
  category :ICategory
}

const CategoryIntro: React.FC<CategoryProps> = ({category}) => {

  return (
    <section className="bg-[#0B2149] lg:h-[50vh] sm:h-auto text-white py-20 md:py-20  flex flex-col md:flex-row items-center">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* Text Section */}
        <div className="md:w-3/4 w-full text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-xl md:text-4xl font-semibold mb-6 md:mb-10">
            Explore your career opportunities with {category.catName}; the world is full of
            possibilities waiting for you.
            
          </h1>
        </div>

        {/* Image Section */}
        <div className="md:w-7/12 sm:w-2/12 lg:w-5/12 flex justify-center md:justify-end">
          <div className="w-full md:w-2/4 lg:w-3/5 flex justify-center">
            <img
              src={category.catImage}
              alt="Banner Image"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryIntro;
