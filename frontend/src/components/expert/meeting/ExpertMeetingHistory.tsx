import { useEffect, useState } from "react";
import { IvidoeCall } from "../../../@types/videoCall";
import { useAppSelector } from "../../../hooks/useTypeSelector";
import { findAllvideoCallByExpert } from "../../../services/api/videoCallApi";
import { IBooking } from "../../../@types/booking";
import { ISlot } from "../../../@types/slot";
import { IStudent } from "../../../@types/user";
import moment from "moment";
import { IReviewAndRating } from "../../../@types/reviewAndRating";
import {
  findAllReviewsByExpert,
  submitReviewByExpert,
} from "../../../services/api/reviewAndRatingApi";
import StarRatings from "react-star-ratings";

const formatDateToIST = (dateString: string) => {
  return moment(dateString).format("DD/MM/YYYY");
};

const formatTimeToIST = (timeString: string) => {
  return moment(timeString, "HH:mm:ss").format("hh:mm A");
};

type Review = {
  review: string;
  rating: number;
};

type ReviewsAccumulator = {
  [key: string]: Review;
};

const ExpertMeetingHistory = () => {
  const { expert } = useAppSelector((state) => state.expert);
  const [meetingDetails, setMeetingDetails] = useState<IvidoeCall[]>([]);
  const [reviews, setReviews] = useState<ReviewsAccumulator>({});
  const [reviewDetails, setReviewDetails] = useState<
    Record<string, IReviewAndRating>
  >({});

  useEffect(() => {
    const fetDetails = async () => {
      if (expert) {
        const response = await findAllvideoCallByExpert();
        const meetings = response.data;
        if (response.success) {
          setMeetingDetails(response.data);
          const meetingIds = meetings.map((meeting: IvidoeCall) => meeting._id);

          const reviewsPromises = meetingIds.map((meetingId: string) =>
            findAllReviewsByExpert(meetingId)
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
        }
      }
    };
    fetDetails();
  }, [expert]);

  const handleReviewChange = (meetingId: string, value: string) => {
    setReviews((prev) => ({
      ...prev,
      [meetingId]: {
        ...prev[meetingId],
        review: value,
      },
    }));
  };

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
      expertId: expert?._id,
    };
    try {
      const response = await submitReviewByExpert(data);
      setReviewDetails((prev) => ({
        ...prev,
        [meetingId]: {
          ...response.data,
        },
      }));
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  return (
    <div className="p-4 min-h-screen bg-white rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Meeting Details</h1>
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

      {meetingDetails.length > 0 && (
        <div className="w-full mt-4">
          {meetingDetails.map((meeting) => {
            const meetingId = meeting._id;
            return (
              <div
                key={meetingId}
                className="flex flex-col mt-4 p-4 bg-white shadow-md rounded-lg"
              >
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
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ExpertMeetingHistory;
