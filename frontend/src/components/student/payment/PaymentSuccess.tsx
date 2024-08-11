import { AiOutlineArrowRight } from "react-icons/ai"; // Import the arrow icon
import { useNavigate } from "react-router-dom";

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate("/schedule-session");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <img
        src="/payment.png"
        alt="Success"
        className="w-64  h-50 object-cover mb-6" 
      />
      <h1 className="text-3xl font-semibold text-green-600 mb-4">
        Payment Successful
      </h1>
      <p className="text-lg text-gray-700 text-center w-8/12">
        <span>
          {" "}
          Your mentorship session has been successfully booked. Details will be
          sent to the email address associated with your account shortly.
        </span>
      </p>

      <button
        onClick={handleBooking}
        className="border p-4 mt-10 rounded-lg bg-[#0B2149] text-white flex items-center"
      >
        View your Booking
        <AiOutlineArrowRight className="ml-2" /> {/* Arrow icon with margin */}
      </button>
    </div>
  );
};

export default PaymentSuccess;
