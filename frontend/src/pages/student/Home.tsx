
import Banner from "../../components/student/landingPage/Banner";
import Faq from "../../components/student/landingPage/FAQ";
import FindYourPath from "../../components/student/landingPage/FindYourPath";
import HowItWorks from "../../components/common/howdoes it work/HowItWork";
import Testimonials from "../../components/common/expertlist/Testimonials";
import { useEffect } from "react";
import ReviewListForStudent from "../../components/student/reviews/ReviewListForStudent";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Banner />
      <div id="find_path">
        <FindYourPath />
      </div>
      <div id="how_work">
        <HowItWorks />
      </div>
      <Testimonials />
      <ReviewListForStudent/>
      <Faq />

    </div>
  );
};

export default Home;
