import ExpertIntro from "../../components/student/ExpertListing/ExpertIntro";
import ExpertsList from "../../components/student/ExpertListing/ExpertsList";
import Footer from "../../components/student/footer/Footer";
import Navbar from "../../components/student/header/Header";

const ExpertListing = () => {
  return (
    <div>
      <Navbar />
      <ExpertIntro />
      <ExpertsList />
      <Footer />
    </div>
  );
};

export default ExpertListing;
