import { useEffect, useState } from "react";
import { IBooking } from "../../../@types/booking";
import { ISlot } from "../../../@types/slot";
import { IExpert } from "../../../@types/expert";
import moment from "moment";
import { findAllvideoCallStudent } from "../../../services/api/videoCallApi";
import {
  submitReviewByStudent,
  findAllReviewsByStudent,
  deleteReviewByStudent,
} from "../../../services/api/reviewAndRatingApi";
import StarRatings from "react-star-ratings";
import { useAppSelector } from "../../../hooks/useTypeSelector";
import { IvidoeCall } from "../../../@types/videoCall";
import { IReviewAndRating } from "../../../@types/reviewAndRating";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

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
      const filterData = meetingsResult.data.filter((item: IvidoeCall) => {
        const bookingComplete = item.bookingId as IBooking;

        return bookingComplete.meetingStatus == "completed";
      });

      setMeetingDetails(filterData);
      console.log("filterData", filterData);

      const meetingIds = filterData.map((meeting: IvidoeCall) => meeting._id);

      const reviewsPromises = meetingIds.map((meetingId: string) =>
        findAllReviewsByStudent(meetingId)
      );

      const reviewsResults = await Promise.all(reviewsPromises);

      const reviewsMap = reviewsResults.reduce(
        (acc: Record<string, IReviewAndRating>, reviewResult) => {
          const { data } = reviewResult;

          if (data !== null) {
            acc[data.meetingId] = data;
          }
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

  const handleDeleteReview = async (meetingId: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete this review?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it",
      });

      if (result.isConfirmed) {
        const response = await deleteReviewByStudent(meetingId);
        console.log("Response for the delete", response);

        setReviewDetails((prev) => ({
          ...prev,
          [meetingId]: response.data,
        }));

        Swal.fire("Deleted!", "The review has been deleted.", "success");
      }
    } catch (error) {
      console.error("Failed to delete review:", error);
      Swal.fire(
        "Error!",
        "Failed to delete the review. Please try again later.",
        "error"
      );
    }
  };

  return (
    <div className="p-4 min-h-screen bg-white rounded-lg ms-2 md:w-10/12 lg:w-10/12 w-full">
      <div className="bg-blue-950 h-32 mb-9 rounded-xl flex items-center justify-center">
        <h1 className="text-2xl font-bold mb-4 text-white">Meeting Details</h1>
      </div>
      <div className="space-y-4">
        {meetingDetails.length === 0 ? (
          <p className="text-gray-600 text-center">No bookings here</p>
        ) : (
          meetingDetails.map((meeting: IvidoeCall) => {
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

                <div
                  className={`flex flex-col mt-4 p-4 bg-white shadow-md rounded-lg  ${
                    reviewDetails[meeting._id!]?.is_delete}`}
                >
                  {
                  reviewDetails[meeting._id!] &&
                  !reviewDetails[meetingId!].is_delete ? (
                    <div className="border p-4 rounded-lg bg-gray-100">
                      <div className="flex justify-between">
                        <p className="font-semibold text-lg">Your Review:</p>
                        <button
                          onClick={() => handleDeleteReview(meeting._id!)}
                        >
                          <MdDelete size={24} />
                        </button>
                      </div>
                      <p>{reviewDetails[meeting._id!].review}</p>
                      <StarRatings
                        rating={reviewDetails[meeting._id!].rating}
                        starRatedColor="gold"
                        numberOfStars={5}
                        starDimension="30px"
                        starSpacing="5px"
                        starEmptyColor="gray"
                      />
                    </div>
                  ) : (
                   
                    !reviewDetails[meeting._id!]?.is_delete && (
                      <>
                        <textarea
                          value={reviews[meeting._id!]?.review || ""}
                          onChange={(e) =>
                            handleReviewChange(meeting._id!, e.target.value)
                          }
                          placeholder="Write your review here..."
                          className="border rounded-lg p-2 w-full mb-4"
                        />
                        <StarRatings
                          rating={reviews[meeting._id!]?.rating || 0}
                          starRatedColor="gold"
                          changeRating={(rating: number) =>
                            handleRatingChange(meeting._id!, rating)
                          }
                          numberOfStars={5}
                          name="rating"
                          starDimension="30px"
                          starSpacing="5px"
                          starEmptyColor="gray"
                        />
                        <button
                          onClick={() => handleSubmitReview(meeting._id!)}
                          className="bg-blue-950 text-white p-2 rounded-lg mt-5 w-3/12"
                        >
                          Submit Review
                        </button>
                      </>
                    )
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
