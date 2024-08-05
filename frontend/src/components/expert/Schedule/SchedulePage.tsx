import React, { useState } from "react";
import Modal from "./Modal";

const SchedulePage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const handleClose = () => setIsModalVisible(false);

  return (
    <div className="flex flex-col items-center p-6">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <div className="flex">
          <h2 className="text-2xl text-[#2B3E61] font-semibold mb-4">
            Available Schedule
          </h2>
        </div>
        <div className="flex justify-end mb-8">
          <button
            onClick={showModal}
            className="mt-6 bg-[#2B3E61] text-white p-3 rounded-lg"
          >
            Add New Schedule
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border-b">No.</th>
                <th className="p-2 border-b">Date</th>
                <th className="p-2 border-b">Time</th>
                <th className="p-2 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border-b">1</td>
                <td className="p-2 border-b">2024-08-05</td>
                <td className="p-2 border-b">10:00 AM - 11:00 AM</td>
                <td className="p-2 border-b text-green-600">Available</td>
              </tr>
              <tr>
                <td className="p-2 border-b">2</td>
                <td className="p-2 border-b">2024-08-06</td>
                <td className="p-2 border-b">1:00 PM - 2:00 PM</td>
                <td className="p-2 border-b text-red-600">Booked</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isVisible={isModalVisible}
        onClose={handleClose}
        title="Add New Schedule"
      >
        <form className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              id="date"
              className="border p-2 w-full rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="time">
              Time From
            </label>
            <input
              type="time"
              id="time"
              className="border p-2 w-full rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="time-to">
              Time To
            </label>
            <input
              type="time"
              id="time-to"
              className="border p-2 w-full rounded-md"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleClose}
              className="bg-gray-300 text-white p-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default SchedulePage;
