import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../../components/common/footer/Footer";
import Navbar from "../../components/student/header/Header";
import PaymentSuccess from "../../components/student/payment/PaymentSuccess";

const PaymentSuccessPage = () => {
  const [sessionId, setSessionId] = useState<string>('');
  const location = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('session_id');
    setSessionId(id||'');
    window.scrollTo(0, 0);
  }, [location.search]);
  return (
    <div>
      <Navbar />
      <PaymentSuccess sessionId={sessionId} />
      <Footer />
    </div>
  );
};

export default PaymentSuccessPage;
