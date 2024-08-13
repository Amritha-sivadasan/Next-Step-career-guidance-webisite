import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { useAppSelector } from "../../../hooks/useTypeSelector";
import {
  addNewSlot,
  deleteSlot,
  getAllSlots,
} from "../../../services/api/slotApi";
import { ISlot } from "../../../@types/slot";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

interface IFormInput {
  date: string;
  timeFrom: string;
  timeTo: string;
}

const SchedulePage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [slots, setSlots] = useState<ISlot[]>([]);
  const { expert } = useAppSelector((state) => state.expert);

  useEffect(() => {
    const fetchAllSlots = async () => {
      if (expert) {
        const response = await getAllSlots(expert._id);
        setSlots(response.data);
      }
    };
    fetchAllSlots();
  }, [expert]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      timeFrom: "",
      timeTo: "",
    },
  });

  const showModal = () => setIsModalVisible(true);
  const handleClose = () => {
    setIsModalVisible(false);
    reset();
  };

  const handleAddSlot = async (data: IFormInput) => {
    if (expert) {
      if (data.timeFrom > data.timeTo) {
        toast.warn("Please add Valid Time");
        return;
      }
      const selectedDate = new Date(data.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        toast.warn("Date cannot be in the past");
        return ;
      }

      const newSlot: ISlot = {
        expertId: expert._id,
        consultationDate: data.date,
        consultationStartTime: data.timeFrom,
        consultationEndTime: data.timeTo,
        slotStatus: "Available",
      };

      try {
        const response = await addNewSlot(newSlot);
        setSlots((prevSlots) => [...prevSlots, response.data]);
        setIsModalVisible(false);
        reset();
      } catch (error) {
        console.error("Error adding slot:", error);
      }
    }
  };

  const handleSlotDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this slot? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteSlot(id);
        setSlots((prevSlots) => prevSlots.filter((slot) => slot._id !== id));
        Swal.fire("Deleted!", "The slot has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting slot:", error);
        Swal.fire(
          "Error!",
          "An error occurred while deleting the slot.",
          "error"
        );
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const day = date.getDate();
    const monthName = date.toLocaleDateString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${dayName}, ${day} ${monthName} ${year}`;
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

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
                <th className="p-2 border-b"></th>
              </tr>
            </thead>
            <tbody>
              {slots.map((slot, index) => (
                <tr key={slot._id}>
                  <td className="p-3 border-b">{index + 1}</td>
                  <td className="p-3 border-b">
                    {formatDate(slot.consultationDate)}
                  </td>
                  <td className="p-3 border-b">
                    {`${formatTime(slot.consultationStartTime)} - ${formatTime(
                      slot.consultationEndTime
                    )}`}
                  </td>
                  <td className="p-2 border-b text-green-600">
                    {slot.slotStatus}
                  </td>
                  <td className="p-3 border-b">
                    <button
                      onClick={() => slot._id && handleSlotDelete(slot._id)}
                      className="border rounded-lg p-1 w-16 bg-red-800 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isVisible={isModalVisible}
        onClose={handleClose}
        title="Add New Schedule"
      >
        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit(handleAddSlot)}
        >
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              id="date"
              className="border p-2 w-full rounded-md"
              {...register("date", {
                required: "Date is required",
                validate: (value) => {
                  if (value.trim() === "") {
                    return "Date cannot be only spaces";
                  }
                 
                  return true;
                },
              })}
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="time">
              Time From
            </label>
            <input
              type="time"
              id="time"
              className="border p-2 w-full rounded-md"
              {...register("timeFrom", {
                required: "Start time is required",
                validate: (value) => {
                  if (value.trim() == "") {
                    return "Start time cannot be only spaces";
                  }
                  return true;
                },
              })}
            />
            {errors.timeFrom && (
              <p className="text-red-500 text-sm">{errors.timeFrom.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="time-to">
              Time To
            </label>
            <input
              type="time"
              id="time-to"
              className="border p-2 w-full rounded-md"
              {...register("timeTo", {
                required: "End time is required",
                validate: (value) =>
                  value.trim() !== "" || "End time cannot be only spaces",
              })}
            />
            {errors.timeTo && (
              <p className="text-red-500 text-sm">{errors.timeTo.message}</p>
            )}
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
