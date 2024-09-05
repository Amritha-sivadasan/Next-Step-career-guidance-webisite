import Testimonials from "../../components/common/expertlist/Testimonials";
import Footer from "../../components/common/footer/Footer";
import HowItWorks from "../../components/common/howdoes it work/HowItWork";
import ExpertNavbar from "../../components/expert/header/ExpertNavBar";
import ExpertBanner from "../../components/expert/landingpage/ExpertBanner";
import TrustedService from "../../components/expert/landingpage/TrustedService";
import RatingViewForExpert from "../../components/expert/review/RatingViewForExpert";

const HomePage = () => {
  return (
    <div>
      <ExpertNavbar />
      <ExpertBanner />
      <TrustedService />
      <div id="how_work">
        <HowItWorks />
      </div>

      <Testimonials />
      <RatingViewForExpert />
      <Footer />
    </div>
  );
};

export default HomePage;
