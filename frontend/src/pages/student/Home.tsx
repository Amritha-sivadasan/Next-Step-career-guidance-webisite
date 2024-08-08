import Footer from "../../components/common/footer/Footer";
import Navbar from "../../components/student/header/Header";
import Banner from "../../components/student/landingPage/Banner";
import Faq from "../../components/student/landingPage/FAQ";
import FindYourPath from "../../components/student/landingPage/FindYourPath";
import HowItWorks from "../../components/common/howdoes it work/HowItWork";
import Testimonials from "../../components/common/expertlist/Testimonials";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
