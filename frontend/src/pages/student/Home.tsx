import Footer from "../../components/student/footer/Footer";
import Navbar from "../../components/student/header/Header";
import Banner from "../../components/student/landingPage/Banner";
import Faq from "../../components/student/landingPage/FAQ";
import FindYourPath from "../../components/student/landingPage/FindYourPath";
import HowItWorks from "../../components/student/landingPage/HowItWork";
import Testimonials from "../../components/student/landingPage/Testimonials";

const Home = () => {


  return (
    <div>
      <Navbar />
      <Banner />
      <FindYourPath />
      <HowItWorks />
      <Testimonials />
      <Faq />
      <Footer />
    </div>
  );
};

export default Home;
