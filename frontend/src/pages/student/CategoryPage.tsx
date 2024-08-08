import CategoryIntro from "../../components/student/allCategory/categoryIntro";
import CareerOptionsPage from "../../components/student/allCategory/CategoryList";
import Footer from "../../components/common/footer/Footer";
import Navbar from "../../components/student/header/Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllSubCategory, getCategoryByName } from "../../services/api/studentApi";
import { ICategory, ISubCategory } from "../../@types/dashboard";
const initialCategory: ICategory = {
  _id: '',
  catName: '',
  catImage: '',
  description: ''
};

const AllCategoryPage = () => {
  const { catName } = useParams<{ catName: string }>();
  const [subcategories,setSubcategories]=useState<ISubCategory[]>([])
  const [category, setCategory] = useState<ICategory >(initialCategory);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(()=>{
    const fetchAllSubCategory=async()=>{
      if(catName){
        const response= await getAllSubCategory(catName)
        setSubcategories(response.data)
      }
    }
    fetchAllSubCategory()

  },[catName])

  useEffect(()=>{
    const fetchCategory= async()=>{
      if(catName){
        const response= await getCategoryByName(catName)
        setCategory(response.data)
      }
    }
    fetchCategory()

  },[catName])


  return (
    <div>
      <Navbar />
      <CategoryIntro category={category} />
      <CareerOptionsPage  subcategory={subcategories} />
      <Footer />
    </div>
  );
};

export default AllCategoryPage;
