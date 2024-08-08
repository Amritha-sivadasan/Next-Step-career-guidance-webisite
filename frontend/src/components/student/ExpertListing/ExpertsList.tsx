import React, { useEffect, useState } from "react";
import { IExpert } from "../../../@types/expert";
import { getAllSlotsByStudent, } from "../../../services/api/slotApi";
import { bookSlot } from "../../../services/api/bookingApi";
import { ISlot } from "../../../@types/slot";
import { useAppSelector } from "../../../hooks/useTypeSelector";
import { toast } from "react-toastify";

interface ExpertsListProps {
  expets: IExpert[];
}

const ExpertsList: React.FC<ExpertsListProps> = ({ expets }) => {
  const [activeExpert, setActiveExpert] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [expertsData, setExpertsData] = useState<IExpert[]>([]);
  const [slots, setSlots] = useState<ISlot[]>([]);
  const {user}= useAppSelector(state=>state.student)

  useEffect(() => {
    setExpertsData(expets);
  }, [expets]);

  const handleSelectExpert = async (expertId: string) => {
    try {
      const response = await getAllSlotsByStudent(expertId);
      if (response.success) {
        setSlots(response.data);
        setActiveExpert(activeExpert === expertId ? null : expertId);
        setSelectedSlot(null); // Reset the selected slot when a new expert is selected
      }
    } catch (error) {
      console.error("Failed to fetch slots:", error);
    }
  };

  const handleSlotSelect = (slotId: string) => {
    setSelectedSlot(slotId);
  };

  const handleBooking = async () => {
    if (selectedSlot && activeExpert && user) {
      try {
        const response = await bookSlot(
          user._id,
          selectedSlot,
           activeExpert,
        );

        if (response.success) {
          toast.success("Booking successful!");
          // Optionally, reset the state or perform other actions
          setActiveExpert(null);
          setSelectedSlot(null);
        } else {
          toast.error("Booking failed. Please try again.");
        }
      } catch (error) {
        console.error("Booking failed:", error);
        toast.error("An error occurred while booking. Please try again.");
      }
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
            className="relative border bg-white rounded-lg shadow-md p-4 w-10/12 mx-auto"
          >
            <div className="flex flex-col md:flex-row items-start">
              <img
                src={
                  typeof expert.profile_picture === "string"
                    ? expert.profile_picture
                    : URL.createObjectURL(expert.profile_picture)
                }
                alt={expert.user_name}
                className="w-40 h-32 object-cover rounded-lg mr-4"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">
                  {expert.user_name}
                </h2>
                <p className="text-gray-600 mb-4">{expert.personal_bio}</p>
              </div>
              <button
                onClick={() => handleSelectExpert(expert._id)}
                className="bg-blue-500 text-white p-2 rounded-lg m-8"
              >
                {activeExpert === expert._id ? "Hide Slots" : "Select Slot"}
              </button>
            </div>
            {activeExpert === expert._id && (
              <div className="flex justify-end">
                <div className="flex flex-col justify-end mt-4 bg-white rounded-lg shadow-lg z-10 w-8/12 p-3 border">
                  <h3 className="text-lg font-semibold mb-2">Select a Slot</h3>
                  {slots.map((slot) => (
                    <button
                      key={slot._id}
                      onClick={() => slot?._id && handleSlotSelect(slot._id)}
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
                      className="bg-blue-500 text-white p-2 rounded-lg w-full mt-2"
                    >
                      Book Now
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button className="border p-3 rounded-full bg-[#0B2149] text-white w-32">
          View More
        </button>
      </div>
    </div>
  );
};

export default ExpertsList;
