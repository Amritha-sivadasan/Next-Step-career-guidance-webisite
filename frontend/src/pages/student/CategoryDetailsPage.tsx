import AboutCategory from "../../components/student/allCategory/AboutCategory"
import AboutCategoryIntro from "../../components/student/allCategory/AboutCategoryIntro"
import Navbar from "../../components/student/header/Header"


const CategoryDetailsPage = () => {
  return (
    <div>
        <Navbar/>
      <AboutCategoryIntro/>
      <AboutCategory/>
    </div>
  )
}

export default CategoryDetailsPage
