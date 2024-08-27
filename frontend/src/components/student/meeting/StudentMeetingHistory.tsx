import { useEffect, useState } from "react";
import { IBooking } from "../../../@types/booking";
import { ISlot } from "../../../@types/slot";
import { IExpert } from "../../../@types/expert";
import moment from "moment";
import { findAllvideoCallStudent } from "../../../services/api/videoCallApi";
import {
  submitReviewByStudent,
  findAllReviewsByStudent,
} from "../../../services/api/reviewAndRatingApi";
import StarRatings from "react-star-ratings";
import { useAppSelector } from "../../../hooks/useTypeSelector";
import { IvidoeCall } from "../../../@types/videoCall";
import { IReviewAndRating } from "../../../@types/reviewAndRating";

type Review = {
  review: string;
  rating: number;
};

type ReviewsAccumulator = {
  [key: string]: Review;
};

const formatDateToIST = (dateString: string) => {
  return moment(dateString).format("DD/MM/YYYY");
};

const formatTimeToIST = (timeString: string) => {
  return moment(timeString, "HH:mm:ss").format("hh:mm A");
};

const StudentMeetingHistory = () => {
  const { user } = useAppSelector((state) => state.student);
  const [meetingDetails, setMeetingDetails] = useState<IvidoeCall[]>([]);
  const [reviews, setReviews] = useState<ReviewsAccumulator>({});
  const [reviewDetails, setReviewDetails] = useState<
    Record<string, IReviewAndRating>
  >({});

  const fetchAllMeetings = async () => {
    try {
      const meetingsResult = await findAllvideoCallStudent();
      const meetings = meetingsResult.data;
      setMeetingDetails(meetings);

      const meetingIds = meetings.map((meeting: IvidoeCall) => meeting._id);

      const reviewsPromises = meetingIds.map((meetingId: string) =>
        findAllReviewsByStudent(meetingId)
      );

      const reviewsResults = await Promise.all(reviewsPromises);

      const reviewsMap = reviewsResults.reduce(
        (acc: Record<string, IReviewAndRating>, reviewResult) => {
          const { data } = reviewResult;

          acc[data.meetingId] = data;
          return acc;
        },
        {}
      );

      setReviewDetails(reviewsMap);
    } catch (error) {
      console.error("Failed to fetch meetings or reviews:", error);
    }
  };

  useEffect(() => {
    fetchAllMeetings();
  }, []);

  const handleReviewChange = (meetingId: string, value: string) => {
    setReviews((prev) => ({
      ...prev,
      [meetingId]: {
        ...prev[meetingId],
        review: value,
      },
    }));
  };
  //   console.log("meeting details", reviewDetails);

  const handleRatingChange = (meetingId: string, rating: number) => {
    setReviews((prev) => ({
      ...prev,
      [meetingId]: {
        ...prev[meetingId],
        rating,
      },
    }));
  };

  const handleSubmitReview = async (meetingId: string) => {
    const reviewData = reviews[meetingId];
    const data = {
      ...reviewData,
      meetingId,
      studentId: user?._id,
    };
    try {
      const response = await submitReviewByStudent(data);
      setReviewDetails((prev) => ({
        ...prev,
        [meetingId]: {
          ...response.data, 
        },
      }));
      console.log("Response for review and rating:", response);
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  return (
    <div className="p-4 min-h-screen bg-white rounded-lg w-10/12">
      <div className="bg-blue-950 h-32 mb-9 rounded-xl flex items-center justify-center">
        <h1 className="text-2xl font-bold mb-4 text-white">Meeting Details</h1>
      </div>
      <div className="space-y-4">
        {meetingDetails.length === 0 ? (
          <p className="text-gray-600 text-center">No bookings here</p>
        ) : (
          meetingDetails.map((meeting) => {
            const Expert = meeting.expertId as IExpert;
            const booking = meeting.bookingId as IBooking;
            const slot = booking.slotId as ISlot;
            const meetingId = meeting._id;

        

            return (
              <div key={meetingId} className="border p-4 shadow-md rounded-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={Expert?.profile_picture}
                    alt="Expert"
                    className="h-28 w-28 rounded-lg object-cover"
                  />
                  <div className="text-lg text-gray-800">
                    <div className="font-semibold">{Expert.user_name}</div>
                    <div className="text-sm text-gray-600">
                      <p>{Expert.subCatName}</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>{Expert.educationBackground}</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>₹{Expert.consultation_fee}</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>URL: {meeting.url}</strong>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap mb-4">
                  <div className="flex-1">
                    <div className="text-md text-gray-800 mb-2">
                      <div>
                        Date:{" "}
                        <strong className="text-gray-800">
                          {formatDateToIST(slot.consultationDate)}
                        </strong>
                      </div>
                      <div>
                        From:{" "}
                        <strong className="text-gray-800">
                          {formatTimeToIST(slot.consultationStartTime)}
                        </strong>
                      </div>
                      <div>
                        To:{" "}
                        <strong className="text-gray-800">
                          {formatTimeToIST(slot.consultationEndTime)}
                        </strong>
                      </div>
                      <div>
                        Meeting Status:{" "}
                        <strong className="text-gray-800">
                          {booking.meetingStatus}
                        </strong>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div
                      className={`border w-9/12 p-2 rounded-lg text-white ${
                        booking.bookingStatus === "confirmed"
                          ? "bg-green-600"
                          : booking.bookingStatus === "cancelled"
                          ? "bg-red-800"
                          : booking.bookingStatus === "rescheduled"
                          ? "bg-yellow-600"
                          : "bg-gray-600"
                      }`}
                    >
                      <p>
                        Booking Status: <span>{booking.bookingStatus}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full mt-4 flex flex-col">
                  {/* Check if a review already exists */}
                  {reviewDetails[meetingId!] ? (
                    <div className="border p-4 rounded-lg bg-gray-100">
                      <p className="font-semibold text-lg">Your Review:</p>
                      <p>{reviewDetails[meetingId!].review}</p>
                      <StarRatings
                        rating={reviewDetails[meetingId!].rating}
                        starRatedColor="gold"
                        numberOfStars={5}
                        starDimension="30px"
                        starSpacing="5px"
                        starEmptyColor="gray"
                      />
                    </div>
                  ) : (
                    <>
                      <textarea
                        value={reviews[meetingId!]?.review || ""}
                        onChange={(e) =>
                          handleReviewChange(meetingId!, e.target.value)
                        }
                        placeholder="Write your review here..."
                        className="border rounded-lg p-2 w-full mb-4"
                      />
                      <StarRatings
                        rating={reviews[meetingId!]?.rating || 0}
                        starRatedColor="gold"
                        changeRating={(rating: number) =>
                          handleRatingChange(meetingId!, rating)
                        }
                        numberOfStars={5}
                        name="rating"
                        starDimension="30px"
                        starSpacing="5px"
                        starEmptyColor="gray"
                      />
                      <button
                        onClick={() => handleSubmitReview(meetingId!)}
                        className="bg-blue-950 text-white rounded-lg p-2 w-44 mt-7"
                      >
                        Submit Review
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default StudentMeetingHistory;
