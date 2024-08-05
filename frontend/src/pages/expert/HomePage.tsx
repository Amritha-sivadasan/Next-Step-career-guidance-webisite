import Testimonials from "../../components/common/expertlist/Testimonials"
import Footer from "../../components/common/footer/Footer"
import HowItWorks from "../../components/common/howdoes it work/HowItWork"
import ExpertNavbar from "../../components/expert/header/ExpertNavBar"
import ExpertBanner from "../../components/expert/landingpage/ExpertBanner"
import TrustedService from "../../components/expert/landingpage/TrustedService"

const HomePage = () => {
  return (
    <div>
      <ExpertNavbar/>
      <ExpertBanner/>
      <TrustedService/>
      <HowItWorks />
      <Testimonials />
      <Footer/>
    </div>
  )
}

export default HomePage
