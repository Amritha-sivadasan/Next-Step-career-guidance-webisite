import React, { useState } from "react";

const expertsData = [
  {
    id: 1,
    name: "Expert 1",
    image: "/path/to/expert1.jpg",
    description: "Description for Expert 1.",
    slots: [
      { id: 1, time: "10:00 AM" },
      { id: 2, time: "11:00 AM" },
      { id: 3, time: "01:00 PM" },
    ],
  },
  {
    id: 2,
    name: "Expert 2",
    image: "/path/to/expert2.jpg",
    description: "Description for Expert 2.",
    slots: [
      { id: 1, time: "09:00 AM" },
      { id: 2, time: "12:00 PM" },
      { id: 3, time: "03:00 PM" },
    ],
  },
  // Add more experts as needed
];

const ExpertsList = () => {
  const [activeExpert, setActiveExpert] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSelectExpert = (expertId) => {
    setActiveExpert(activeExpert === expertId ? null : expertId);
    if (activeExpert === expertId) setSelectedSlot(null); // Clear slot selection if same expert is selected
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  return (
    <div className="container mx-auto py-8 px-4 mt-8">
      <div className="flex justify-center mb-24">
        <h1 className="text-3xl font-semibold text-[#0B2149]">Experts List</h1>
      </div>
      <div className="space-y-6 ">
        {expertsData.map((expert) => (
          <div
            key={expert.id}
            className="relative border bg-white rounded-lg shadow-md p-4  w-10/12 mx-auto"
          >
            <div className="flex flex-col md:flex-row items-start">
              <img
                src={expert.image}
                alt={expert.name}
                className="w-40 h-32 object-cover rounded-lg mr-4"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">{expert.name}</h2>
                <p className="text-gray-600 mb-4">{expert.description}</p>
              </div>
              <button
                onClick={() => handleSelectExpert(expert.id)}
                className="bg-blue-500 text-white p-2 rounded-lg m-8"
              >
                {activeExpert === expert.id ? "Hide Slots" : "Select Slot"}
              </button>
            </div>
            {activeExpert === expert.id && (
              <div className="mt-4 bg-white rounded-lg shadow-lg z-10 w-full p-3 border">
                <h3 className="text-lg font-semibold mb-2">Select a Slot</h3>
                {expert.slots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => handleSlotSelect(slot)}
                    className={`block w-full text-left p-2 rounded-full mb-4 ${
                      selectedSlot === slot
                        ? "bg-green-500 text-white"
                        : "bg-gray-200"
                    } hover:bg-gray-300 transition-colors duration-300`}
                  >
                    {slot.time}
                  </button>
                ))}
                {selectedSlot && (
                  <button
                    onClick={() => setActiveExpert(null)}
                    className="bg-blue-500 text-white p-2 rounded-lg w-full mt-2"
                  >
                    Book Now
                  </button>
                )}
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
