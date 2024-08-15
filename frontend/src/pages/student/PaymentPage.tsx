import PaymentHistory from "../../components/student/payment/PaymentHistory";
import { useEffect } from "react";
const PaymentPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex justify-center w-8/12   mt-8 ms-10">
      <PaymentHistory />
    </div>
  );
};

export default PaymentPage;
