import { useParams } from "react-router-dom";
import AboutCategory from "../../components/student/allCategory/AboutCategory";
import AboutCategoryIntro from "../../components/student/allCategory/AboutCategoryIntro";
import Navbar from "../../components/student/header/Header";
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
      <Navbar />
      <AboutCategoryIntro subCategory={subCategory} />
      <AboutCategory />
    </div>
  );
};

export default CategoryDetailsPage;
