import React, { useEffect, useState } from "react";
import { IExpert } from "../../../@types/expert";
import { getAllSlotsByStudent } from "../../../services/api/slotApi";
import { bookSlot } from "../../../services/api/bookingApi";
import { ISlot } from "../../../@types/slot";
import { useAppSelector } from "../../../hooks/useTypeSelector";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const stripePromise = loadStripe(process.env.VITE_STRIPE_PUBLISHABLE_KEY!);

interface ExpertsListProps {
  expets: IExpert[];
}

const ExpertsList: React.FC<ExpertsListProps> = ({ expets }) => {
  const [activeExpert, setActiveExpert] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [expertsData, setExpertsData] = useState<IExpert[]>([]);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [slots, setSlots] = useState<ISlot[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const { user } = useAppSelector((state) => state.student);
  const navigate = useNavigate();

  useEffect(() => {
    setExpertsData(expets.slice(0, 3));

    setTotalPages(Math.ceil(expets.length / 3));
  }, [expets]);

  const handleSelectExpert = async (expertId: string) => {
    try {
      if (user) {
        const response = await getAllSlotsByStudent(expertId);
        if (response.success) {
          setSlots(response.data);
          setActiveExpert(activeExpert === expertId ? null : expertId);
          setSelectedSlot(null);
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Failed to fetch slots:", error);
    }
  };

  const handleSlotSelect = (slotId: string, consultationFee: number) => {
    setSelectedSlot(slotId);
    setPaymentAmount(consultationFee);
    setPaymentMethod("card");
  };

  const handleBooking = async () => {
    if (selectedSlot && activeExpert && user) {
      try {
        setLoading(true);
        const stripe = await stripePromise;
        const response = await bookSlot(
          user._id,
          selectedSlot,
          activeExpert,
          paymentAmount,
          paymentMethod
        );

        const result = await stripe?.redirectToCheckout({
          sessionId: response.data.sessionId,
        });

        if (result?.error) {
          toast.error(
            result.error.message ||
              "An error occurred while redirecting to Stripe"
          );
        }
      } catch (error) {
        console.error("Booking failed:", error);
        toast.error("An error occurred while booking. Please try again.");
      }finally {
        setLoading(false); 
      }
    }
  };

  const handleViewMore = () => {
    const nextPage = currentPage + 1;
    if (nextPage <= totalPages) {
      setCurrentPage(nextPage);
      setExpertsData(expets.slice(0, nextPage * 3));
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 mt-8">
      <div className="flex justify-center mb-24">
        <h1 className="text-3xl font-semibold text-[#0B2149]">Experts List</h1>
      </div>
      <div className="space-y-6">
        {expertsData.map((expert) => (
          <div
            key={expert._id}
            className="relative border bg-white rounded-lg shadow-xl p-4 w-10/12 mx-auto "
          >
            <div className="flex flex-col justify-between md:flex-row items-start">
              <img
                src={
                  typeof expert.profile_picture === "string"
                    ? expert.profile_picture
                    : URL.createObjectURL(expert.profile_picture)
                }
                alt={expert.user_name}
                className="w-40 h-40 object-cover rounded-lg mr-4"
              />

              <div className="flex-1 ms-4">
                <h2 className="text-xl font-semibold mb-2">
                  {expert.user_name}
                </h2>
                <p className="text-gray-600 mb-3">{expert.personal_bio}</p>
                <p className="text-gray-600 mb-3">
                  <span className="text-gray-800 font-semibold ">
                    Education Background:
                  </span>{" "}
                  {expert.educationBackground}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="text-gray-800 font-semibold">
                    Specialized in :
                  </span>{" "}
                  {expert.subCatName}
                </p>
              </div>
              <div className="flex flex-col  me-18 ms-4 ">
                <p className="text-gray-600 font-semibold  mb-10">
                  Consultation Fee :{" "}
                  <span className="text-gray-800">
                    ₹{expert.consultation_fee}
                  </span>
                </p>

                <button
                  onClick={() => handleSelectExpert(expert._id)}
                  className="bg-[#0B2149] text-white p-2 rounded-lg "
                >
                  {activeExpert === expert._id ? "Hide Slots" : "Select Slot"}
                </button>
              </div>
            </div>
            {activeExpert === expert._id && (
              <div className="flex justify-end">
                <div className="flex flex-col justify-end mt-4 bg-white rounded-lg shadow-lg z-10 w-8/12 p-3 border">
                  <h3 className="text-lg font-semibold mb-2">Select a Slot</h3>
                  {slots.map((slot) => (
                    <button
                      key={slot._id}
                      onClick={() =>
                        slot?._id &&
                        handleSlotSelect(slot._id, expert.consultation_fee)
                      }
                      className={`flex justify-between items-center block w-full text-left p-2 rounded-lg mb-4 ${
                        selectedSlot === slot._id
                          ? "bg-green-500 text-white"
                          : "bg-gray-200"
                      } hover:bg-gray-300 transition-colors duration-300`}
                    >
                      {/* Display the date and time, aligned correctly */}
                      <span>
                        {new Date(slot.consultationDate).toLocaleDateString()}
                      </span>
                      <span>
                        {slot.consultationStartTime} -{" "}
                        {slot.consultationEndTime}
                      </span>
                    </button>
                  ))}
                  {selectedSlot && (
                    <button
                      onClick={handleBooking}
                      className="bg-[#0B2149] text-white p-2 rounded-lg w-full mt-2 flex justify-center items-center"
                      disabled={loading}
                    >
                      {loading ? (
                        <ClipLoader size={20} color="#fff" />
                      ) : (
                        "Book Now"
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={handleViewMore}
          className="border p-3 rounded-full bg-[#0B2149] text-white w-34"
        >
          {currentPage < totalPages ? "View More" : "No more items"}
        </button>
      </div>
    </div>
  );
};

export default ExpertsList;
