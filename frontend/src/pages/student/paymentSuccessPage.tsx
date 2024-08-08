import { useEffect } from "react";
import Footer from "../../components/common/footer/Footer";
import Navbar from "../../components/student/header/Header";
import PaymentSuccess from "../../components/student/payment/PaymentSuccess";

const PaymentSuccessPage = () => {
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Navbar />
      <PaymentSuccess />
      <Footer />
    </div>
  );
};

export default PaymentSuccessPage;
