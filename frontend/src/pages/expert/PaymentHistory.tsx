import Sidebar from "../../components/expert/sidebar/ExpertSidebar";
import ExpertNavbar from "../../components/expert/header/ExpertNavBar";
import PaymentDetails from "../../components/expert/payment/PaymentDetails";

const PaymentHistory = () => {
  return (
    <>
      <ExpertNavbar />
      <div className="min-h-screen flex bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-6">
          <PaymentDetails />
        </main>
      </div>
    </>
  );
};

export default PaymentHistory;
