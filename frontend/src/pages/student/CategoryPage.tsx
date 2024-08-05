import CategoryIntro from "../../components/student/allCategory/categoryIntro";
import CareerOptionsPage from "../../components/student/allCategory/CategoryList";
import Footer from "../../components/common/footer/Footer";
import Navbar from "../../components/student/header/Header";

const AllCategoryPage = () => {
  return (
    <div>
      <Navbar />
      <CategoryIntro />
      <CareerOptionsPage />
      <Footer />
    </div>
  );
};

export default AllCategoryPage;
