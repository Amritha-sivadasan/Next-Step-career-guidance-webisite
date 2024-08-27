import { useEffect, useState } from "react";
import { IvidoeCall } from "../../../@types/videoCall";
import { useAppSelector } from "../../../hooks/useTypeSelector";
import { findAllvideoCallByExpert } from "../../../services/api/videoCallApi";
import { IBooking } from "../../../@types/booking";
import { ISlot } from "../../../@types/slot";
import { IStudent } from "../../../@types/user";
// import { formatDate, formatTime } from "../../../utils/generalFuncions";
import moment from "moment";

const formatDateToIST = (dateString: string) => {
  return moment(dateString).format("DD/MM/YYYY");
};

const formatTimeToIST = (timeString: string) => {
  return moment(timeString, "HH:mm:ss").format("hh:mm A");
};

const ExpertMeetingHistory = () => {
  const { expert } = useAppSelector((state) => state.expert);
  const [meetingDetails, setMeetingDetails] = useState<IvidoeCall[]>([]);

  useEffect(() => {
    const fetDetails = async () => {
      if (expert) {
        const response = await findAllvideoCallByExpert();
        console.log("response for meeting details ", response);
        if (response.success) {
          setMeetingDetails(response.data);
        }
      }
    };
    fetDetails();
  }, [expert]);

  return (
    <div className="p-4 min-h-screen bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Booking Details</h1>
      <div className="space-y-4">
        {meetingDetails.length === 0 ? (
          <p className="text-gray-600 text-center">No bookings here</p>
        ) : (
          meetingDetails.map((meeting) => {
            const student = meeting.studentId as IStudent;
            const booking = meeting.bookingId as IBooking;
            const slot = booking.slotId as ISlot;

            return (
              <div
                key={meeting._id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-[#F2F2F2] shadow-md rounded-lg h-auto"
              >
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <img
                    src={student?.profile_picture}
                    alt="Student"
                    className="h-28 w-28 rounded-lg object-cover"
                  />
                  <div className="text-lg text-gray-800">
                    <div className="font-semibold"> {student.user_name}</div>
                    <div className="text-sm text-gray-600">
                      Current Status: <strong>{student.user_type}</strong>
                    </div>
                    <div className="text-sm text-gray-600">
                      Education Level:{" "}
                      <strong>{student.education_level}</strong>
                    </div>
                    <div className="text-sm text-gray-600">
                      Education Background:{" "}
                      <strong>{student.education_background}</strong>
                    </div>
                    <div className="text-sm text-gray-600">
                      Meeting url:{" "}
                      <strong className="text-blue-500">{meeting.url}</strong>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-col items-start md:items-center justify-between space-y-2 md:space-y-5">
                  <div className="text-md text-gray-800 mb-2 md:mb-0">
                    <div>
                      Date:{" "}
                      <strong className="text-gray-800">
                        {formatDateToIST(slot.consultationDate)}
                      </strong>
                    </div>
                    <div>
                      From:
                      <strong className="text-gray-800">
                        {" "}
                        {formatTimeToIST(slot.consultationStartTime)}
                      </strong>
                    </div>
                    <div>
                      To:{" "}
                      <strong className="text-gray-800">
                        {" "}
                        {formatTimeToIST(slot.consultationEndTime)}
                      </strong>
                    </div>
                    <div>
                      Meeting Status:{" "}
                      <strong className="text-gray-800">
                        {" "}
                        {booking.meetingStatus}
                      </strong>
                    </div>
                  </div>
                  <div>
                    <p>
                      Booking Status:{" "}
                      <span
                        className={`border p-2 rounded-lg text-white ${
                          booking.bookingStatus === "completed"
                            ? "bg-green-600"
                            : booking.bookingStatus === "confirmed"
                            ? "bg-green-600"
                            : "bg-yellow-600"
                        }`}
                      >
                        {" "}
                        {booking.bookingStatus}{" "}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ExpertMeetingHistory;
