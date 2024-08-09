import { useParams } from "react-router-dom";
import AboutCategory from "../../components/student/allCategory/AboutCategory";
import AboutCategoryIntro from "../../components/student/allCategory/AboutCategoryIntro";

import { useEffect, useState } from "react";
import { ISubCategory } from "../../@types/dashboard";
import { subCategoryById } from "../../services/api/studentApi";


const initialSubCategory: ISubCategory = {
  _id: '',
  catName: '',
  subCatName: '',
  description: '',
  subCatImage:''
};

const CategoryDetailsPage = () => {
  const { id } = useParams();
  const [subCategory, setSubCategory] = useState<ISubCategory>(initialSubCategory);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchSubCategory = async () => {
      if (id) {
        const response = await subCategoryById(id);
        setSubCategory(response.data);
      }
    };

    fetchSubCategory();
  }, [id]);
  return (
    <div>
 
      <AboutCategoryIntro subCategory={subCategory} />
      <AboutCategory subCategory={subCategory} />
   
    </div>
  );
};

export default CategoryDetailsPage;
