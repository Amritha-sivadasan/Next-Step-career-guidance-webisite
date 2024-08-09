import { useEffect } from "react";

import Footer from "../../components/common/footer/Footer";
import Navbar from "../../components/student/header/Header";
import PaymentSuccess from "../../components/student/payment/PaymentSuccess";
import { useLocation } from "react-router-dom";
import { updatePaymentStatus } from "../../services/api/bookingApi";

const PaymentSuccessPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const sessionId = query.get("session_id");
  const status = "completed";
  useEffect(() => {
    window.scrollTo(0, 0);
    if (sessionId) {
      const updateStatus = async () => {
        try {
          console.log('sessionId',sessionId)
          await updatePaymentStatus(sessionId,status);
        } catch (error) {
          console.error("Error updating payment status:", error);
        }
      };
      updateStatus();
    }
  }, [sessionId]);
  return (
    <div>
      <Navbar />
      <PaymentSuccess />
      <Footer />
    </div>
  );
};

export default PaymentSuccessPage;
