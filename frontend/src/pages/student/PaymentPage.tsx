import PaymentHistory from "../../components/student/payment/PaymentHistory";
import { useEffect } from "react";
const PaymentPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex justify-center md:w-8/12  w-full  mt-8 ms-10">
      <PaymentHistory />
    </div>
  );
};

export default PaymentPage;
