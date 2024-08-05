import Footer from "../../components/common/footer/Footer";
import Navbar from "../../components/student/header/Header";
import PaymentSuccess from "../../components/student/payment/PaymentSuccess";

const PaymentSuccessPage = () => {
  return (
    <div>
      <Navbar />
      <PaymentSuccess />
      <Footer />
    </div>
  );
};

export default PaymentSuccessPage;
