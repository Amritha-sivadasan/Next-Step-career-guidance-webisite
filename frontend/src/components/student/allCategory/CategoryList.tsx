import React, { useEffect, useState } from "react";
import { ISubCategory } from "../../../@types/dashboard";
import { useNavigate } from "react-router-dom";

interface CareerOptionsPageProps {
  subcategory: ISubCategory[];
}

const ITEMS_PER_PAGE = 6;

const CareerOptionsPage: React.FC<CareerOptionsPageProps> = ({
  subcategory,
}) => {
  const [displayedItems, setDisplayedItems] = useState<ISubCategory[]>([]);
  const [nextIndex, setNextIndex] = useState<number>(0);

  useEffect(() => {

    setDisplayedItems(subcategory.slice(0, ITEMS_PER_PAGE));
    setNextIndex(ITEMS_PER_PAGE);
  }, [subcategory]);

  const loadMoreItems = () => {
    const newIndex = Math.min(nextIndex + ITEMS_PER_PAGE, subcategory.length);
    setDisplayedItems(subcategory.slice(0, newIndex));
    setNextIndex(newIndex);
  };




  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold my-8">All Career Options</h1>
      <div className="flex flex-wrap justify-center gap-8">
        {displayedItems.map((option) => (
          <CareerOptionCard
            key={option._id}
            id={option._id}
            title={option.subCatName}
            description={option.description}
            image={option.subCatImage}
          />
        ))}
      </div>
      <button
        onClick={loadMoreItems}
        disabled={nextIndex >= subcategory.length}
        className="mt-8 px-4 py-2 bg-[#0B2149] text-white rounded-lg"
      >
        {nextIndex >= subcategory.length ? "No More Items" : "View More"}
      </button>
    </div>
  );
};

export default CareerOptionsPage;

interface CareerOptionCardProps {
  id:string;
  title: string;
  description: string;
  image: string;
}

const CareerOptionCard: React.FC<CareerOptionCardProps> = ({
  id,
  title,
  description,
  image,
}) => {
  const navigate= useNavigate()
  const handleSubcategory=(id:string)=>{
    navigate(`/categoryDetails/${id}`)
 
  }
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 m-4 w-80 border cursor-pointer" onClick={()=>handleSubcategory(id)}>
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
